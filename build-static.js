// Build script to create a fully static version with embedded data
// Version: 1.0.1 - Enhanced UI with doctor images and interactive filters
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
    await fs.mkdir(path.join(__dirname, 'dist', 'images'), { recursive: true });
    
    // Write data file
    await fs.writeFile(
      path.join(__dirname, 'dist', 'data.js'),
      dataFileContent
    );
    
    // Copy a default doctor image
    const defaultImageContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#e0e0e0"/>
      <text x="100" y="100" font-family="Arial" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="#666">Doctor Image</text>
    </svg>`;
    
    await fs.writeFile(
      path.join(__dirname, 'dist', 'images', 'default-doctor.svg'),
      defaultImageContent
    );
    
    // Create index.html with embedded script
    console.log('Creating static index.html...');
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Doctor Directory</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Roboto', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      line-height: 1.6;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
    
    h1 {
      font-size: 32px;
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #7f8c8d;
      font-size: 16px;
    }
    
    .filter-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;
    }
    
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    
    .filter-label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #34495e;
    }
    
    .filter-input, .filter-select {
      width: 100%;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .filter-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
      flex: 0 0 auto;
      align-self: flex-end;
    }
    
    .filter-button:hover {
      background: #2980b9;
    }
    
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
    }
    
    .doctor-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    }
    
    .doctor-image-container {
      height: 150px;
      overflow: hidden;
      background: #f0f0f0;
      position: relative;
    }
    
    .doctor-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .doctor-info {
      padding: 20px;
    }
    
    .doctor-name {
      font-size: 18px;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 5px;
    }
    
    .doctor-specialty {
      color: #3498db;
      font-weight: 500;
      margin-bottom: 15px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .doctor-details {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px 15px;
      font-size: 14px;
    }
    
    .detail-label {
      font-weight: 500;
      color: #7f8c8d;
    }
    
    .detail-value {
      color: #34495e;
    }
    
    .fee-badge {
      background: #e8f5e9;
      color: #388e3c;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 50px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    }
    
    .no-results h3 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .no-results p {
      color: #7f8c8d;
    }
    
    @media (max-width: 768px) {
      .filter-container {
        flex-direction: column;
        gap: 15px;
      }
      
      .filter-group {
        width: 100%;
      }
      
      .filter-button {
        width: 100%;
      }
      
      .doctors-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Doctor Directory</h1>
      <p class="subtitle">Find and connect with the best doctors</p>
    </header>
    
    <div class="filter-container">
      <div class="filter-group">
        <label class="filter-label" for="search">Search by name</label>
        <input type="text" id="search" class="filter-input" placeholder="Enter doctor name...">
      </div>
      
      <div class="filter-group">
        <label class="filter-label" for="specialty-filter">Specialty</label>
        <select id="specialty-filter" class="filter-select">
          <option value="">All Specialties</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="filter-label" for="sort-by">Sort By</label>
        <select id="sort-by" class="filter-select">
          <option value="">Default</option>
          <option value="fees-asc">Fees: Low to High</option>
          <option value="fees-desc">Fees: High to Low</option>
          <option value="exp-asc">Experience: Low to High</option>
          <option value="exp-desc">Experience: High to Low</option>
        </select>
      </div>
      
      <button id="apply-filters" class="filter-button">Apply Filters</button>
    </div>
    
    <div class="doctors-grid" id="doctors-container"></div>
  </div>
  
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
      
      // Convert set to array and sort
      Array.from(specialties).sort().forEach(specialty => {
        const option = document.createElement('option');
        option.value = specialty;
        option.textContent = specialty;
        specialtyFilter.appendChild(option);
      });
      
      // Display all doctors initially
      renderDoctors(doctors);
      
      // Add event listener for filters
      applyFiltersButton.addEventListener('click', applyFilters);
      
      // Add event listeners for immediate filtering
      searchInput.addEventListener('input', debounce(applyFilters, 300));
      specialtyFilter.addEventListener('change', applyFilters);
      sortBySelect.addEventListener('change', applyFilters);
      
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
              return (parseInt(a.fees) || 0) - (parseInt(b.fees) || 0);
            } else if (sortOption === 'fees-desc') {
              return (parseInt(b.fees) || 0) - (parseInt(a.fees) || 0);
            } else if (sortOption === 'exp-asc') {
              return (parseInt(a.experience) || 0) - (parseInt(b.experience) || 0);
            } else if (sortOption === 'exp-desc') {
              return (parseInt(b.experience) || 0) - (parseInt(a.experience) || 0);
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
            
            // Fix doctor name to avoid duplicate "Dr." prefix
            const displayName = doctor.name || 'Unknown Doctor';
            const doctorName = displayName.startsWith('Dr.') ? displayName : 'Dr. ' + displayName;
            
            doctorCard.innerHTML = \`
              <div class="doctor-image-container">
                <img src="/images/default-doctor.svg" alt="\${doctorName}" class="doctor-image">
              </div>
              <div class="doctor-info">
                <h3 class="doctor-name">\${doctorName}</h3>
                <div class="doctor-specialty">\${doctor.speciality || 'General Practitioner'}</div>
                <div class="doctor-details">
                  <span class="detail-label">Experience:</span>
                  <span class="detail-value">\${doctor.experience || '0'} Years</span>
                  
                  <span class="detail-label">Consultation Fee:</span>
                  <span class="detail-value">
                    <span class="fee-badge">₹\${doctor.fees || 'N/A'}</span>
                  </span>
                  
                  <span class="detail-label">Location:</span>
                  <span class="detail-value">\${doctor.location || 'Location not specified'}</span>
                </div>
              </div>
            \`;
            
            doctorsContainer.appendChild(doctorCard);
          });
        } else {
          doctorsContainer.innerHTML = \`
            <div class="no-results">
              <h3>No Doctors Found</h3>
              <p>Try adjusting your search criteria or explore all doctors.</p>
            </div>
          \`;
        }
      }
      
      // Utility function to prevent excessive filter calls
      function debounce(func, delay) {
        let timeout;
        return function() {
          const context = this;
          const args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), delay);
        };
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