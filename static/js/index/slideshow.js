let currentSlideIndex = 0;
let slides = [];
let slideInterval;

function loadImages() {
    const imageContainer = document.querySelector('.slides');
    const dotsContainer = document.querySelector('.dots');

    // Assume images are in a directory named 'images'
    const imageNames = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Add your image filenames here

    imageNames.forEach((imageName, index) => {
        const img = document.createElement('img');
        img.src = `static/images/index/slideshow/${imageName}`;
        img.alt = `Slide ${index + 1}`;
        slides.push(img);
        imageContainer.appendChild(img);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => showSlide(index);
        dotsContainer.appendChild(dot);
    });

    showSlide(currentSlideIndex);
    startAutoSlide(); // Start the auto-slide functionality
}

function showSlide(index) {
    const slideContainer = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');

    // Ensure index is within bounds
    currentSlideIndex = (index + slides.length) % slides.length;

    // Update the transform property to show the current slide
    slideContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Update dot active state
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetAutoSlide(); // Reset the auto slide timer on manual change
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000); // Change slide every 3 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval); // Stop the current interval
    startAutoSlide(); // Restart the interval
}

// Load images when the document is fully loaded
document.addEventListener('DOMContentLoaded', loadImages);
