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

// Calcolatore Preventivo
let calcState = {
    service: 'condominio',
    basePrice: 8,
    maxPrice: 12,
    area: 150,
    frequency: 'settimanale',
    multiplier: 0.7,
    extras: []
};

function updateCalculator() {
    // Calculate base price
    const minPrice = calcState.basePrice * calcState.area * calcState.multiplier;
    const maxPrice = calcState.maxPrice * calcState.area * calcState.multiplier;

    // Add extras
    let extrasTotal = 0;
    calcState.extras.forEach(extra => {
        extrasTotal += parseFloat(extra.cost);
    });

    const finalMinPrice = minPrice + extrasTotal;
    const finalMaxPrice = maxPrice + extrasTotal;

    // Update display
    document.getElementById('priceMin').textContent = `€${Math.round(finalMinPrice).toLocaleString('it-IT')}`;
    document.getElementById('priceMax').textContent = `€${Math.round(finalMaxPrice).toLocaleString('it-IT')}`;

    // Update details
    const serviceNames = {
        'condominio': 'Condominio',
        'azienda': 'Azienda',
        'ufficio': 'Ufficio',
        'straordinaria': 'Straordinaria'
    };

    const freqNames = {
        'una-tantum': 'Una Tantum',
        'settimanale': 'Settimanale',
        'bisettimanale': 'Bisettimanale',
        'mensile': 'Mensile'
    };

    document.getElementById('detailService').textContent = serviceNames[calcState.service];
    document.getElementById('detailArea').textContent = `${calcState.area} mq`;
    document.getElementById('detailFreq').textContent = freqNames[calcState.frequency];

    // Update extras display
    const extrasRow = document.getElementById('extrasRow');
    const detailExtras = document.getElementById('detailExtras');

    if (calcState.extras.length > 0) {
        extrasRow.style.display = 'flex';
        const extraNames = calcState.extras.map(e => e.name).join(', ');
        detailExtras.textContent = `${extraNames} (+€${extrasTotal})`;
    } else {
        extrasRow.style.display = 'none';
    }

    // Update slider gradient
    const percent = ((calcState.area - 50) / (1000 - 50)) * 100;
    document.getElementById('metratura').style.background =
        `linear-gradient(to right, #0066cc 0%, #0066cc ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
}

// Service type buttons
document.querySelectorAll('.calc-option[data-service]').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.calc-option[data-service]').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        calcState.service = this.dataset.service;
        calcState.basePrice = parseFloat(this.dataset.price);
        calcState.maxPrice = calcState.basePrice + 4;

        updateCalculator();
    });
});

// Frequency buttons
document.querySelectorAll('.freq-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.freq-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        calcState.frequency = this.dataset.frequency;
        calcState.multiplier = parseFloat(this.dataset.multiplier);

        updateCalculator();
    });
});

// Area slider
const metraturaSlider = document.getElementById('metratura');
const metraturaValue = document.getElementById('metraturaValue');

metraturaSlider.addEventListener('input', function() {
    calcState.area = parseInt(this.value);
    metraturaValue.textContent = calcState.area;
    updateCalculator();
});

// Extra services checkboxes
document.querySelectorAll('.extra-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const extraName = this.dataset.extra;
        const extraCost = parseFloat(this.dataset.cost);

        if (this.checked) {
            calcState.extras.push({
                name: this.parentElement.querySelector('.checkbox-title').textContent,
                cost: extraCost
            });
        } else {
            calcState.extras = calcState.extras.filter(e => e.name !== this.parentElement.querySelector('.checkbox-title').textContent);
        }

        updateCalculator();
    });
});

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    updateCalculator();
});

// Loading optimization - lazy load heavy content
document.addEventListener('DOMContentLoaded', () => {
    console.log('AB Pulizie Treviso website loaded successfully!');
});

// Stats Horizontal Scroll Animation
const statsContainer = document.querySelector('.stats-container');
const statsTrack = document.querySelector('.stats-track');

if (statsContainer && statsTrack) {
    let ticking = false;

    function updateStatsScroll() {
        const containerRect = statsContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if stats container is in viewport
        if (containerRect.top < windowHeight && containerRect.bottom > 0) {
            // Calculate scroll progress through the stats section
            const scrollProgress = (windowHeight - containerRect.top) / (windowHeight + containerRect.height);

            // Scroll horizontally based on scroll progress
            const horizontalScroll = -scrollProgress * 600;

            statsTrack.style.transform = `translateX(${horizontalScroll}px)`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateStatsScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Initial call
    updateStatsScroll();
}
