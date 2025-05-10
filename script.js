// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = mobileNavToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Create placeholder for images until real ones are added
    const createPlaceholderBg = () => {
        // For hero background
        const hero = document.querySelector('.hero');
        if (hero && !hero.style.backgroundImage.includes('url')) {
            hero.style.background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #1d3557';
        }
        
        // For dish images
        const dishImages = document.querySelectorAll('.dish-image');
        dishImages.forEach(img => {
            if (!img.style.backgroundImage.includes('url')) {
                img.style.backgroundColor = '#e63946';
                img.style.opacity = '0.8';
            }
        });
        
        // For reservation background
        const reservation = document.querySelector('.reservation');
        if (reservation && !reservation.style.backgroundImage.includes('url')) {
            reservation.style.background = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #457b9d';
        }
    };
    
    // Call the function to create placeholders
    createPlaceholderBg();
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .dish, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const initAnimations = () => {
        const elements = document.querySelectorAll('.feature, .dish, .testimonial');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
        });
    };
    
    // Initialize animations
    initAnimations();
    
    // Run animation on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});