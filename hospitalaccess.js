// Mock databases for citizens and hospitals
const mockCitizenDatabase = {
    "CIT001": { name: "Rakesh Kumar", phoneNumber: "1234567890", age: 34, healthReports: "All reports accessible.", fullDetails: "aLL DEATILS ARE AVAIABLER" , BP:430 , SUGAR_LEVEL:500, BLLOD_OXYGEN:230 },
    "CIT002": { name: "Manoj Kumar", phoneNumber: "0987654321", age: 29, healthReports: "No significant issues reported.", fullDetails: "Detailed report for Manoj Kumar including previous treatments, diagnostics, and suggested follow-ups." },
    "CIT003": { name: "Sanketh Singh", phoneNumber: "1234567890", age: 21, healthReports: "All reports accessible.", fullDetails: "Detailed report for Sanketh Singh including medical history, diagnostics, treatment plans, and more." },
    "CIT004": { name: "kamala Kumari", phoneNumber: "1234567890", age: 52, healthReports: "All reports accessible.", fullDetails: "Detailed report for kamala kumari including medical history, diagnostics, treatment plans, and more." },
    "CIT005": { name: "Rajesh", phoneNumber: "1234567890", age: 43, healthReports: "All reports accessible.", fullDetails: "Detailed report for Rajesh including medical history, diagnostics, treatment plans, and more." }
};

const mockHospitalDatabase = {
    'HOSP123': { name: 'Sato Hospital' },
    'HOSP134': { name: 'NexGen Gov Hospital'},
    'HOSP145': { name: 'General Clinic'},
    'HOSP156': { name: 'Alpha Hospital'},
    'HOSP167': { name: 'City Hospital'},
    'HOSP178': { name: 'Government Hospital 1'},
    'HOSP189': { name: 'Government Hospital 2'},
    'HOSP191': { name: 'Government Hospital 3'},
    'HOSP195': { name: 'Government Hospital 4'}
};

const hospitalLogs = JSON.parse(localStorage.getItem('hospitalLogs')) || []; // Retrieve logs from local storage

function accessCitizenData() {
    const hospitalId = document.getElementById('hospitalId').value.trim();
    const citizenId = document.getElementById('citizenId').value.trim();
    const resultDiv = document.getElementById('hospitalResult');
    
    // Validate hospital ID
    if (!mockHospitalDatabase[hospitalId]) {
        resultDiv.innerHTML = `<p>Invalid Hospital ID. Access denied.</p>`;
        resultDiv.style.display = 'block';
        return;
    }

    // Check if citizen exists
    if (mockCitizenDatabase[citizenId]) {
        const citizenData = mockCitizenDatabase[citizenId];
        resultDiv.innerHTML = `
            <h3>Information for ${citizenData.name}</h3>
            <p><strong>Phone Number:</strong> ${citizenData.phoneNumber}</p>
            <p><strong>Age:</strong> ${citizenData.age}</p>
            <p><strong>Health Reports:</strong> ${citizenData.healthReports}</p>
            <button onclick="viewFullReport('${citizenId}')">Full Report</button>
        `;
        resultDiv.style.display = 'block';

        // Log the access
        logHospitalAccess(hospitalId, citizenId);
    } else {
        resultDiv.innerHTML = `<p>Citizen not found. Please check the Citizen ID and try again.</p>`;
        resultDiv.style.display = 'block';
    }
}

function viewFullReport(citizenId) {
    window.location.href = `fullReport.html?citizenId=${citizenId}`;
}

function logHospitalAccess(hospitalId, citizenId) {
    const timestamp = new Date().toLocaleString();
    hospitalLogs.push({ hospitalId, citizenId, timestamp });
    localStorage.setItem('hospitalLogs', JSON.stringify(hospitalLogs)); // Store logs in local storage
}
