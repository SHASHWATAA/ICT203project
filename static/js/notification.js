// Event listener for the notify button
document.getElementById('notifyButton').addEventListener('click', function() {
    const message = this.getAttribute('data-message'); // Retrieve the message from data attribute
    showNotification(message);
});

function showNotification(message) {
    const notificationContainer = document.getElementById('notificationContainer');

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<p>${message}</p>`; // Insert the custom message

    // Create close button
    const closeButton = document.createElement('span');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = 'X'; // Close symbol

    // Create timer bar
    const timerBar = document.createElement('div');
    timerBar.className = 'timer-bar';

    // Append close button and timer bar to notification
    notification.appendChild(closeButton);
    notification.appendChild(timerBar);
    notificationContainer.appendChild(notification);

    // Set up timeout for automatic dismissal
    const timeoutId = setTimeout(() => {
        if (notificationContainer.contains(notification)) {
            notificationContainer.removeChild(notification);
        }
    }, 3000); // Dismiss after 3 seconds

    // Handle manual close by clicking "X"
    closeButton.onclick = () => {
        closeNotification(notification);
        clearTimeout(timeoutId); // Clear the timeout to prevent double removal
    };

    // Start the timer bar animation
    setTimeout(() => {
        timerBar.style.width = '100%';
    }, 0);

    // Handle closing notification on Esc key press
    const handleEscKey = (event) => {
        if (event.key === 'Escape') {
            closeNotification(notification);
            clearTimeout(timeoutId); // Clear the timeout to prevent double removal
            document.removeEventListener('keydown', handleEscKey); // Remove the event listener
        }
    };

    document.addEventListener('keydown', handleEscKey); // Add event listener
}

// Function to close notification
function closeNotification(notification) {
    const notificationContainer = document.getElementById('notificationContainer');
    if (notificationContainer.contains(notification)) {
        notificationContainer.removeChild(notification);
    }
}
