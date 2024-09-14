function changeLanguage(selectElement) {
    const selectedValue = selectElement.value;
    const currentUrl = window.location.href;
    let newUrl;

    if (currentUrl.includes('ICT203_Group_Project')) {
        // Local environment handling with 'ICT203_Group_Project' in the URL
        if (selectedValue === 'ne') {
            // Add '/Nepali/' in the local environment
            newUrl = currentUrl.replace(/(ICT203_Group_Project\/)([^\/]+\.html)$/, '$1Nepali/$2');
        } else {
            // Remove '/Nepali/' in the local environment
            newUrl = currentUrl.replace(/\/Nepali\//, '/');
        }
    } else {
        // Production environment handling
        if (selectedValue === 'ne') {
            // Add '/Nepali/' in production environment
            newUrl = currentUrl.replace(/(shash\.win\/)([^\/]+\.html)$/, '$1Nepali/$2');
        } else {
            // Remove '/Nepali/' in production environment
            newUrl = currentUrl.replace(/\/Nepali\//, '/');
        }
    }

    // Redirect to the new URL
    window.location.href = newUrl;
}