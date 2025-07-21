// FFO Gym Landing Page - Vanilla JavaScript

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const aboutModalTriggers = document.querySelectorAll('.about-modal-trigger'); // Not present in HTML, but kept for script integrity
const aboutModal = document.getElementById('about-modal'); // Not present in HTML, but kept for script integrity
const modalClose = document.getElementById('modal-close'); // Not present in HTML, but kept for script integrity
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('gallery-modal'); // Not present in HTML, but kept for script integrity
const galleryModalClose = document.getElementById('gallery-modal-close'); // Not present in HTML, but kept for script integrity
const galleryModalImg = document.getElementById('gallery-modal-img'); // Not present in HTML, but kept for script integrity
const galleryModalTitle = document.getElementById('gallery-modal-title'); // Not present in HTML, but kept for script integrity
const galleryPrev = document.getElementById('gallery-prev'); // Not present in HTML, but kept for script integrity
const galleryNext = document.getElementById('gallery-next'); // Not present in HTML, but kept for script integrity
const navLinks = document.querySelectorAll('a[href^="#"]');

// Gallery data (used by the script, but the modal elements are not in the HTML)
const galleryData = [
    {
        src: 'public/placeholder.svg',
        alt: 'Área de cardio moderna con equipos de última generación',
        title: 'Área de Cardio'
    },
    {
        src: 'public/placeholder.svg',
        alt: 'Zona de peso libre completamente equipada',
        title: 'Zona de Peso Libre'
    },
    {
        src: 'public/placeholder.svg',
        alt: 'Sala de entrenamiento funcional espaciosa',
        title: 'Entrenamiento Funcional'
    },
    {
        src: 'public/placeholder.svg',
        alt: 'Área de fisioterapia y rehabilitación',
        title: 'Área de Fisioterapia'
    },
    {
        src: 'public/placeholder.svg',
        alt: 'Nuestro equipo de entrenadores profesionales',
        title: 'Equipo de Entrenadores'
    },
    {
        src: 'public/placeholder.svg',
        alt: 'Vista general de nuestras instalaciones',
        title: 'Instalaciones Generales'
    }
];

// State
let currentGalleryIndex = 0;
let isMobileMenuOpen = false;

// Mobile Menu Toggle
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// About Modal Functions (kept for script integrity, but modal elements are not in HTML)
function openAboutModal() {
    if (aboutModal) { // Check if element exists
        aboutModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Focus trap
        const focusableElements = aboutModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

function closeAboutModal() {
    if (aboutModal) { // Check if element exists
        aboutModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Gallery Modal Functions (kept for script integrity, but modal elements are not in HTML)
function openGalleryModal(index) {
    if (galleryModal) { // Check if element exists
        currentGalleryIndex = index;
        updateGalleryModal();
        galleryModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeGalleryModal() {
    if (galleryModal) { // Check if element exists
        galleryModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function updateGalleryModal() {
    if (galleryModalImg && galleryModalTitle) { // Check if elements exist
        const currentImage = galleryData[currentGalleryIndex];
        galleryModalImg.src = currentImage.src;
        galleryModalImg.alt = currentImage.alt;
        galleryModalTitle.textContent = currentImage.title;
    }
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateGalleryModal();
}

function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateGalleryModal();
}

// Smooth Scrolling
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.animate-fade-in, .animate-slide-up, .animate-scale-in'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    animatedElements.forEach((el) => {
        // Set initial state
        el.style.opacity = '0';
        if (el.classList.contains('animate-slide-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('animate-scale-in')) {
            el.style.transform = 'scale(0.95)';
        } else {
            el.style.transform = 'translateY(20px)';
        }
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        observer.observe(el);
    });
}

// Navigation Active State
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelectorAll('.nav-link-mobile').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section link
            const activeLinkDesktop = document.querySelector(`.nav-links-desktop a[href="#${sectionId}"]`);
            if (activeLinkDesktop) {
                activeLinkDesktop.classList.add('active');
            }
            const activeLinkMobile = document.querySelector(`.mobile-nav-links a[href="#${sectionId}"]`);
            if (activeLinkMobile) {
                activeLinkMobile.classList.add('active');
            }
        }
    });
}

// Navbar Background on Scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.main-navigation');
    if (navbar) { // Ensure navbar exists
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)'; // Use background-color
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.8)'; // Use background-color
            navbar.style.backdropFilter = 'blur(12px)';
        }
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(event) {
    // Escape key closes modals
    if (event.key === 'Escape') {
        if (aboutModal && !aboutModal.classList.contains('hidden')) {
            closeAboutModal();
        }
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            closeGalleryModal();
        }
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }

    // Arrow keys for gallery navigation
    if (galleryModal && !galleryModal.classList.contains('hidden')) {
        if (event.key === 'ArrowLeft') {
            prevGalleryImage();
        } else if (event.key === 'ArrowRight') {
            nextGalleryImage();
        }
    }
}

// Form Validation (if needed for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy Loading for Images (assuming data-src is used in HTML)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy'); // Remove a 'lazy' class if you add one for initial styling
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute('href'));
            closeMobileMenu(); // Close mobile menu after clicking a link
        });
    });

    // Gallery item click to open modal (if modal elements were present)
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openGalleryModal(index));
    });

    // Gallery modal close button (if modal elements were present)
    if (galleryModalClose) {
        galleryModalClose.addEventListener('click', closeGalleryModal);
    }
    if (galleryPrev) {
        galleryPrev.addEventListener('click', prevGalleryImage);
    }
    if (galleryNext) {
        galleryNext.addEventListener('click', nextGalleryImage);
    }

    // About modal triggers (if modal elements were present)
    aboutModalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openAboutModal);
    });
    if (modalClose) {
        modalClose.addEventListener('click', closeAboutModal);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateNavbarBackground();
    });

    // Initial calls  
    updateActiveNavLink();
    updateNavbarBackground();
    setupScrollAnimations();
    setupLazyLoading(); // Call lazy loading setup
});
