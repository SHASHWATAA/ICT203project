fetch('nav_bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

// Function to load a script dynamically
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.defer = true; // Ensures it doesn't block page rendering
    document.head.appendChild(script);
}

// Load the notification.js script
loadScript('static/js/notification.js');
loadScript('static/js/language_switcher.js');