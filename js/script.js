// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance carousel every 5 seconds
let carouselInterval = setInterval(nextSlide, 5000);

// Click on indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        // Reset interval when user clicks
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    });
});

// Pause carousel on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

heroSection.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handler with Web3Forms
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';

    try {
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (result.success) {
            // Success
            formStatus.innerHTML = '<div style="background: #00cc66; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">✓ Grazie! Abbiamo ricevuto la tua richiesta. Ti contatteremo entro 24 ore.</div>';
            contactForm.reset();

            // Reset button after 5 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Richiedi Preventivo';
                formStatus.innerHTML = '';
            }, 5000);
        } else {
            throw new Error(result.message || 'Errore nell\'invio');
        }
    } catch (error) {
        // Error
        formStatus.innerHTML = '<div style="background: #ff4444; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">Si è verificato un errore. Riprova o chiamaci direttamente al 123-456-7890</div>';

        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Richiedi Preventivo';

        // Clear error message after 5 seconds
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and advantage items
document.querySelectorAll('.servizio-card, .vantaggio, .zona').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add phone call tracking (optional - for analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated');
        // Here you could send an event to Google Analytics or other analytics platform
    });
});

// Add email click tracking (optional - for analytics)
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email link clicked');
        // Here you could send an event to Google Analytics or other analytics platform
    });
});

// Form validation enhancement
const requiredFields = contactForm.querySelectorAll('[required]');

requiredFields.forEach(field => {
    field.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });

    field.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#00cc66';
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('telefono');
phoneInput.addEventListener('input', function(e) {
    // Remove all non-numeric characters except +
    let value = e.target.value.replace(/[^\d+]/g, '');
    e.target.value = value;
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item (if it wasn't already active)
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Loading optimization - lazy load heavy content
document.addEventListener('DOMContentLoaded', () => {
    console.log('AB Pulizie Treviso website loaded successfully!');
});
