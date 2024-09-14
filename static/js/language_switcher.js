function changeLanguage(selectElement) {
    const selectedValue = selectElement.value;
    const currentUrl = window.location.href;

    let newUrl;

    if (selectedValue === 'ne') {
        // Redirect to Nepali version by adding '/Nepali/' before the last part of the URL
        newUrl = currentUrl.replace(/(\/ICT203_Group_Project\/)([^\/]+)$/, '$1Nepali/$2');
    } else {
        // Redirect to English version by removing '/Nepali/'
        newUrl = currentUrl.replace(/\/ICT203_Group_Project\/Nepali\//, '/ICT203_Group_Project/');
    }

    window.location.href = newUrl;
}