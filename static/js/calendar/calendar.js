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
    const sydneyTime = new Date();
    const sydneyDate = new Date(sydneyTime);

    return {
        year: sydneyDate.getFullYear(),
        month: sydneyDate.getMonth() + 1, // getMonth() is zero-indexed
        day: sydneyDate.getDate()
    };
}

const todaySydney = getSydneyDate();

// Function to highlight the task in the task list by checking both title and date
function highlightTask(taskTitle, taskDate) {
    const taskListItems = document.querySelectorAll('#task-list li');
    taskListItems.forEach(item => {
        // Check if the task title and date in the list match the hovered task
        if (item.textContent.includes(taskTitle) && item.textContent.includes(taskDate)) {
            item.classList.add('highlight');
        } else {
            item.classList.remove('highlight');
        }
    });
}

// Remove the highlight when hover ends
function removeHighlight() {
    const taskListItems = document.querySelectorAll('#task-list li');
    taskListItems.forEach(item => {
        item.classList.remove('highlight');
    });
}

// Update your generateCalendar function to add hover event listeners
function generateCalendar() {
    const year = 2024;
    const month = 9;  // September 2024
    const daysInMonth = 30;
    const startDay = 0;  // Starts on a Sunday

    const calendarDates = document.getElementById('calendar-dates');
    calendarDates.innerHTML = ''; // Clear the previous content if regenerating the calendar

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

        // Check if there's an appointment on this date
        const currentDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const appointment = appointments.find(app => app.date === currentDate);
        if (appointment) {
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment');
            const appointmentText = document.createElement('span');
            appointmentText.textContent = appointment.title;
            appointmentElement.appendChild(appointmentText);
            dateCell.appendChild(appointmentElement);

            // Add hover event to the appointment (pass both title and date)
            appointmentElement.addEventListener('mouseover', () => highlightTask(appointment.title, currentDate));
            appointmentElement.addEventListener('mouseout', removeHighlight);
        }

        calendarDates.appendChild(dateCell);
    }
}


// Function to render the task list with remove buttons
function renderTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    appointments.forEach((appointment, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${appointment.date}: ${appointment.title}`;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTask(index));

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    });
}

// Function to add a new task
function addNewTask() {
    const newTaskDate = document.getElementById('newTaskDate').value;
    const newTaskTitle = document.getElementById('newTaskTitle').value;

    if (newTaskDate && newTaskTitle) {
        // Add new appointment to the appointments array
        appointments.push({ date: newTaskDate, title: newTaskTitle });

        // Regenerate the calendar and task list to reflect the new task
        generateCalendar();
        renderTaskList();

        // Show notification
        showNotification(`Task added: ${newTaskTitle}`);
    } else {
        alert('Please enter both a date and a task title.');
    }
}

// Function to remove a task by index
function removeTask(index) {
    const removedTask = appointments[index];  // Get the task being removed

    // Remove the task from the appointments array
    appointments.splice(index, 1);

    // Regenerate the calendar and task list to reflect the change
    generateCalendar();
    renderTaskList();

    // Show notification
    showNotification(`Task removed: ${removedTask.title}`);
}

// Initialize the calendar and task list
generateCalendar();
renderTaskList();

// Add event listener to the "Add Task" button
document.getElementById('addTaskButton').addEventListener('click', addNewTask);
