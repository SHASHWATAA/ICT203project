// Appointments data
const appointments = [
    { date: '2024-09-03', title: 'Doctor Appointment' },
    { date: '2024-09-05', title: 'Doctor Appointment' },
    { date: '2024-09-10', title: 'Dentist Appointment' },
    { date: '2024-09-15', title: 'Prescription Refill' },
    { date: '2024-09-22', title: 'My Birthday' }
];

// Get today's date in Australia/Sydney timezone
function getSydneyDate() {
    const sydneyTime = new Date()
    const sydneyDate = new Date(sydneyTime);

    return {
        year: sydneyDate.getFullYear(),
        month: sydneyDate.getMonth() + 1, // getMonth() is zero-indexed
        day: sydneyDate.getDate()
    };
}

const todaySydney = getSydneyDate();

// Generate calendar dates
function generateCalendar() {
    const year = 2024;  // You can dynamically fetch the current year for a full calendar system
    const month = 9;    // September 2024, change it dynamically based on the need
    const daysInMonth = 30;  // September 2024 has 30 days
    const startDay = 0;  // September 1, 2024 is a Sunday
    const calendarDates = document.getElementById('calendar-dates');

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date');
        calendarDates.appendChild(emptyCell);
    }

    // Add actual dates
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        dateCell.innerHTML = `<span>${day}</span>`;

        // Check if today (based on Sydney timezone) dynamically
        const isToday = (todaySydney.year === year && todaySydney.month === month && todaySydney.day === day);
        if (isToday) {
            dateCell.classList.add('today');
        }

        // Check if there's an appointment on this date
        const currentDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const appointment = appointments.find(app => app.date === currentDate);
        if (appointment) {
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment');
            appointmentElement.textContent = appointment.title;
            dateCell.appendChild(appointmentElement);
        }

        calendarDates.appendChild(dateCell);
    }
}

// Initialize the calendar
generateCalendar();
