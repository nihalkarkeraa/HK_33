//Citizens Database
const registeredCitizens = [
    { name: 'Nihal Karkera', citizenId: 'CIT123' },
    { name: 'Sanjay Moolya', citizenId: 'CIT124' },
    { name: 'Rithvik', citizenId: 'CIT125' },
    { name: 'Shivanandu', citizenId: 'CIT126' }
];

// Hospital Details, ID, Name, and Specializations
const hospitalDetails = {
    'HOSP123': { name: 'Sato Hospital', specialization: 'General Physician' },
    'HOSP134': { name: 'NexGen Gov Hospital', specialization: 'General Physician' },
    'HOSP145': { name: 'General Clinic', specialization: 'Orthopedic' },
    'HOSP156': { name: 'Alpha Hospital', specialization: 'Cardiologist' },
    'HOSP167': { name: 'City Hospital', specialization: 'Ear-otolaryngologist' },
    'HOSP178': { name: 'Government Hospital 1', specialization: 'ophthalmologist' },
    'HOSP189': { name: 'Government Hospital 2', specialization: 'Neurologist' },
    'HOSP191': { name: 'Government Hospital 3', specialization: 'Dermatologist' },
    'HOSP195': { name: 'Government Hospital 4', specialization: 'Endocrinologist' }
};

// Hospital Specializations linked to specific ids
const hospitalSpecializations = {
    "General Physician": ['HOSP123', 'HOSP134'],
    "Orthopedic": ['HOSP145'],
    "Cardiologist": ['HOSP156'],
    "Dermatologist": ['HOSP191'],
    "Neurologist": ['HOSP189'],
    "Ear-otolaryngologist": ['HOSP167'],
    "ophthalmologist": ['HOSP178'],
    "Endocrinologist": ['HOSP195'],


};

// appointments gets stored here
const appointments = [];

// function to handle appointment booking
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const citizenId = document.getElementById('citizenId').value;
    const date = document.getElementById('date').value;
    const doctorType = document.getElementById('doctorType').value;

    // Check if citizen is registered
    const citizen = registeredCitizens.find(citizen => citizen.name === name && citizen.citizenId === citizenId);

    if (!citizen) {
        alert('Citizen not registered. Please check your details.');
        return;
    }

    // Randomly assign a hospital that specializes in the selected doctor type
    const hospitals = hospitalSpecializations[doctorType];
    const randomHospitalId = hospitals[Math.floor(Math.random() * hospitals.length)];
    const hospitalName = hospitalDetails[randomHospitalId].name;
    const appointmentTime = '10:00 AM'; // Dummy time for now

    const appointment = {
        name,
        citizenId,
        date,
        doctorType,
        appointmentTime,
        hospitalId: randomHospitalId,
        hospitalName
    };

    appointments.push(appointment);

    alert(`Appointment booked successfully for ${name} at ${randomHospitalId} (${hospitalName})!`);

    // Clear the form
    document.getElementById('appointmentForm').reset();
});

// Function to view appointments by Hospital ID
function viewAppointments() {
    const hospitalIdInput = document.getElementById('hospitalId').value;
    const appointmentsContainer = document.getElementById('appointmentsContainer');

    // Clear previous results
    appointmentsContainer.innerHTML = '';

    // Filter appointments for the entered Hospital ID
    const hospitalAppointments = appointments.filter(
        appointment => appointment.hospitalId === hospitalIdInput
    );

    if (hospitalAppointments.length === 0) {
        appointmentsContainer.innerHTML = '<p>No appointments found for this hospital.</p>';
        return;
    }

    // Display the appointments
    hospitalAppointments.forEach(appointment => {
        const appointmentDiv = document.createElement('div');
        appointmentDiv.innerHTML = `
            <p><strong>Citizen Name:</strong> ${appointment.name}</p>
            <p><strong>Citizen ID:</strong> ${appointment.citizenId}</p>
            <p><strong>Appointment Date:</strong> ${appointment.date}</p>
            <p><strong>Doctor Type:</strong> ${appointment.doctorType}</p>
            <p><strong>Appointment Time:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Hospital:</strong> ${appointment.hospitalId} (${appointment.hospitalName})</p>
            <hr>
        `;
        appointmentsContainer.appendChild(appointmentDiv);
    });
}
