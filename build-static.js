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
    .filters {
      margin-bottom: 20px;
      padding: 15px;
      background: #f8f8f8;
      border-radius: 8px;
    }
    .filters select, .filters input {
      margin-right: 10px;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .filters button {
      padding: 8px 16px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .filters button:hover {
      background: #45a049;
    }
  </style>
</head>
<body>
  <h1>Doctor Directory</h1>
  
  <div class="filters">
    <input type="text" id="search" placeholder="Search by name...">
    <select id="specialty-filter">
      <option value="">All Specialties</option>
    </select>
    <select id="sort-by">
      <option value="">Sort By</option>
      <option value="fees-asc">Fees: Low to High</option>
      <option value="fees-desc">Fees: High to Low</option>
      <option value="exp-asc">Experience: Low to High</option>
      <option value="exp-desc">Experience: High to Low</option>
    </select>
    <button id="apply-filters">Apply Filters</button>
  </div>
  
  <div class="doctors-grid" id="doctors-container"></div>
  
  <script src="/data.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const doctorsContainer = document.getElementById('doctors-container');
      const searchInput = document.getElementById('search');
      const specialtyFilter = document.getElementById('specialty-filter');
      const sortBySelect = document.getElementById('sort-by');
      const applyFiltersButton = document.getElementById('apply-filters');
      
      // Use the pre-fetched data
      const doctors = window.DOCTOR_DATA || [];
      let filteredDoctors = [...doctors];
      
      // Populate specialties dropdown
      const specialties = new Set();
      doctors.forEach(doctor => {
        if (doctor.speciality) {
          specialties.add(doctor.speciality);
        }
      });
      
      specialties.forEach(specialty => {
        const option = document.createElement('option');
        option.value = specialty;
        option.textContent = specialty;
        specialtyFilter.appendChild(option);
      });
      
      // Display all doctors initially
      renderDoctors(doctors);
      
      // Add event listener for filters
      applyFiltersButton.addEventListener('click', applyFilters);
      
      function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSpecialty = specialtyFilter.value;
        const sortOption = sortBySelect.value;
        
        // Filter by search term and specialty
        filteredDoctors = doctors.filter(doctor => {
          const nameMatch = doctor.name && doctor.name.toLowerCase().includes(searchTerm);
          const specialtyMatch = !selectedSpecialty || doctor.speciality === selectedSpecialty;
          return nameMatch && specialtyMatch;
        });
        
        // Sort results
        if (sortOption) {
          filteredDoctors.sort((a, b) => {
            if (sortOption === 'fees-asc') {
              return (a.fees || 0) - (b.fees || 0);
            } else if (sortOption === 'fees-desc') {
              return (b.fees || 0) - (a.fees || 0);
            } else if (sortOption === 'exp-asc') {
              return (a.experience || 0) - (b.experience || 0);
            } else if (sortOption === 'exp-desc') {
              return (b.experience || 0) - (a.experience || 0);
            }
            return 0;
          });
        }
        
        renderDoctors(filteredDoctors);
      }
      
      function renderDoctors(doctorsList) {
        doctorsContainer.innerHTML = '';
        
        if (doctorsList && doctorsList.length) {
          doctorsList.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            
            doctorCard.innerHTML = \`
              <div class="doctor-name">Dr. \${doctor.name || 'Unknown'}</div>
              <div class="doctor-specialty">\${doctor.speciality || 'General Practitioner'}</div>
              <div class="doctor-details">
                <p>Experience: \${doctor.experience || '0'} Years of experience years</p>
                <p>Consultation Fee: ₹\${doctor.fees || 'N/A'}</p>
                <p>Location: \${doctor.location || 'Location not specified'}</p>
              </div>
            \`;
            
            doctorsContainer.appendChild(doctorCard);
          });
        } else {
          doctorsContainer.innerHTML = '<p>No doctors found matching your criteria.</p>';
        }
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