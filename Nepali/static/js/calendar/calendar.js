// नियुक्तिहरूको डेटा
const appointments = [
    { date: '2024-09-03', title: 'डाक्टरको नियुक्ति' },
    { date: '2024-09-05', title: 'डाक्टरको नियुक्ति' },
    { date: '2024-09-10', title: 'दन्त चिकित्सकको नियुक्ति' },
    { date: '2024-09-15', title: 'प्रेस्क्रिप्शन रिफिल' },
    { date: '2024-09-22', title: 'मेरो जन्मदिन' }
];

// आजको मिति पाउने फंक्शन (Australia/Sydney समय क्षेत्र)
function getSydneyDate() {
    const sydneyTime = new Date();
    const sydneyDate = new Date(sydneyTime);

    return {
        year: sydneyDate.getFullYear(),
        month: sydneyDate.getMonth() + 1, // getMonth() शून्य-इन्डेक्स गरिएको हुन्छ
        day: sydneyDate.getDate()
    };
}

const todaySydney = getSydneyDate();

// कार्य सूचीमा कार्यलाई उज्यालो बनाउनको लागि फंक्शन
function highlightTask(taskTitle, taskDate) {
    const taskListItems = document.querySelectorAll('#task-list li');
    taskListItems.forEach(item => {
        // जाँच गर्नुहोस् कि कार्यको शीर्षक र मिति सूचीमा सँगै मेल खान्छ कि छैन
        if (item.textContent.includes(taskTitle) && item.textContent.includes(taskDate)) {
            item.classList.add('highlight');
        } else {
            item.classList.remove('highlight');
        }
    });
}

// होभर अन्त्य हुँदा उज्यालो हटाउने फंक्शन
function removeHighlight() {
    const taskListItems = document.querySelectorAll('#task-list li');
    taskListItems.forEach(item => {
        item.classList.remove('highlight');
    });
}

// तपाइँको generateCalendar फंक्शनलाई होभर इभेन्ट लिस्नरहरू थप्न अपडेट गर्नुहोस्
function generateCalendar() {
    const year = 2024;
    const month = 9;  // सेप्टेम्बर 2024
    const daysInMonth = 30;
    const startDay = 0;

    const calendarDates = document.getElementById('calendar-dates');
    calendarDates.innerHTML = ''; // पुन: जनरेट गर्दा पहिलाको सामग्री हटाउनुहोस्

    // महिना को पहिलो दिन भन्दा पहिलेको दिनहरूको लागि खाली कोष्ठकहरू थप्नुहोस्
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date');
        calendarDates.appendChild(emptyCell);
    }

    // वास्तविक मिति थप्नुहोस्
    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        if (day === todaySydney.day){
            dateCell.classList.add('today');
        }
        dateCell.innerHTML = `<span>${day}</span>`;

        // के यस मितिमा कुनै नियुक्ति छ भनेर जाँच गर्नुहोस्
        const currentDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const appointment = appointments.find(app => app.date === currentDate);
        if (appointment) {
            const appointmentElement = document.createElement('div');
            appointmentElement.classList.add('appointment');
            const appointmentText = document.createElement('span');
            appointmentText.textContent = appointment.title;
            appointmentElement.appendChild(appointmentText);
            dateCell.appendChild(appointmentElement);

            // नियुक्तिमा होभर इभेन्ट थप्नुहोस् (दुबै शीर्षक र मिति पास गर्नुहोस्)
            appointmentElement.addEventListener('mouseover', () => highlightTask(appointment.title, currentDate));
            appointmentElement.addEventListener('mouseout', removeHighlight);
        }

        calendarDates.appendChild(dateCell);
    }
}

// कार्य सूचीलाई हटाउने बटनहरू सहित रेंडर गर्ने फंक्शन
function renderTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // हालको सूची हटाउनुहोस्

    appointments.forEach((appointment, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${appointment.date}: ${appointment.title}`;

        // हटाउने बटन बनाउनुहोस्
        const removeButton = document.createElement('button');
        removeButton.textContent = 'हटाउनुहोस्';
        removeButton.addEventListener('click', () => removeTask(index));

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    });
}

// नयाँ कार्य थप्ने फंक्शन
function addNewTask() {
    const newTaskDate = document.getElementById('newTaskDate').value;
    const newTaskTitle = document.getElementById('newTaskTitle').value;

    if (newTaskDate && newTaskTitle) {
        // नयाँ नियुक्ति नियुक्तिहरूको सूचीमा थप्नुहोस्
        appointments.push({ date: newTaskDate, title: newTaskTitle });

        // नयाँ कार्यको प्रतिबिम्ब गर्न क्यालेन्डर र कार्य सूची पुन: जनरेट गर्नुहोस्
        generateCalendar();
        renderTaskList();

        // सूचना देखाउनुहोस्
        showNotification(`कार्य थपियो: ${newTaskTitle}`);
    } else {
        alert('कृपया मिति र कार्यको शीर्षक दुवै प्रविष्ट गर्नुहोस्।');
    }
}

// कार्यलाई इन्डेक्स द्वारा हटाउने फंक्शन
function removeTask(index) {
    const removedTask = appointments[index];  // हटाइँदै गरेको कार्यलाई पाउनुहोस्

    // नियुक्तिहरूको सूचीबाट कार्य हटाउनुहोस्
    appointments.splice(index, 1);

    // परिवर्तनको प्रतिबिम्ब गर्न क्यालेन्डर र कार्य सूची पुन: जनरेट गर्नुहोस्
    generateCalendar();
    renderTaskList();

    // सूचना देखाउनुहोस्
    showNotification(`कार्य हटाइयो: ${removedTask.title}`);
}

// क्यालेन्डर र कार्य सूचीलाई आरम्भ गर्नुहोस्
generateCalendar();
renderTaskList();

// "कार्य थप्नुहोस्" बटनमा इभेन्ट लिस्नर थप्नुहोस्
document.getElementById('addTaskButton').addEventListener('click', addNewTask);
