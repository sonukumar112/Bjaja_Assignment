// Build script to create a fully static version with embedded data
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildStaticSite() {
  console.log('Building static site with embedded data...');
  
  try {
    // Fetch the doctor data
    console.log('Fetching doctor data...');
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Create a static data.js file
    console.log('Creating static data file...');
    const dataFileContent = `// Auto-generated file with pre-fetched data
window.DOCTOR_DATA = ${JSON.stringify(data, null, 2)};`;
    
    // Ensure dist directory exists
    await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
    
    // Write data file
    await fs.writeFile(
      path.join(__dirname, 'dist', 'data.js'),
      dataFileContent
    );
    
    // Create index.html with embedded script
    console.log('Creating static index.html...');
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Doctor Directory</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .doctor-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .doctor-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .doctor-specialty {
      color: #666;
      margin-bottom: 10px;
    }
    .doctor-details {
      font-size: 14px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <h1>Doctor Directory</h1>
  <div class="doctors-grid" id="doctors-container"></div>
  
  <script src="/data.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const doctorsContainer = document.getElementById('doctors-container');
      
      // Use the pre-fetched data
      const doctors = window.DOCTOR_DATA;
      
      if (doctors && doctors.length) {
        doctors.forEach(doctor => {
          const doctorCard = document.createElement('div');
          doctorCard.className = 'doctor-card';
          
          doctorCard.innerHTML = \`
            <div class="doctor-name">\${doctor.name}</div>
            <div class="doctor-specialty">\${doctor.specialty}</div>
            <div class="doctor-details">
              <p>Experience: \${doctor.experience} years</p>
              <p>Consultation Fee: ₹\${doctor.fees}</p>
              <p>Location: \${doctor.location}</p>
            </div>
          \`;
          
          doctorsContainer.appendChild(doctorCard);
        });
      } else {
        doctorsContainer.innerHTML = '<p>No doctors found.</p>';
      }
    });
  </script>
</body>
</html>`;
    
    // Write index.html
    await fs.writeFile(
      path.join(__dirname, 'dist', 'index.html'),
      indexHtml
    );
    
    console.log('Static site built successfully!');
  } catch (error) {
    console.error('Error building static site:', error);
    process.exit(1);
  }
}

// Run the build
buildStaticSite(); 