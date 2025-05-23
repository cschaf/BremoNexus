// JavaScript-Code wie in der vorherigen korrekten Version
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('i');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }

        // Close mobile menu if it's open
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    });

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
            void scrollTopBtn.offsetWidth; 
            scrollTopBtn.style.opacity = "1";
        } else {
            scrollTopBtn.style.opacity = "0";
            setTimeout(() => { 
                if (!(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)) {
                   scrollTopBtn.style.display = "none";
                }
            }, 300); 
        }
    };

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('href').startsWith('#')) {
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht! Ihr Anliegen wurde an BremoNexus Immobilien übermittelt. Ich werde mich schnellstmöglich bei Ihnen melden.');
            contactForm.reset();
        });
    }

    window.toggleAccordion = function(toggleId, contentId) {
        const toggle = document.getElementById(toggleId);
        const content = document.getElementById(contentId);

        if (!toggle || !content) return;
        
        const parentContainer = toggle.closest('.accordion-container');
        if (parentContainer) {
            parentContainer.querySelectorAll('.accordion-toggle.active').forEach(otherToggle => {
                if (otherToggle.id !== toggleId) {
                    otherToggle.classList.remove('active');
                    const otherContentId = otherToggle.id.replace('-toggle-footer', '-content-footer');
                    const otherContent = document.getElementById(otherContentId);
                    if (otherContent) {
                        otherContent.classList.remove('active');
                        otherContent.style.maxHeight = null;
                        otherContent.style.paddingTop = "0";
                        otherContent.style.paddingBottom = "0";
                    }
                }
            });
        }
        
        toggle.classList.toggle('active');
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            content.style.paddingTop = "15px"; 
            content.style.paddingBottom = "25px"; // Increased from 15px
            content.style.maxHeight = content.scrollHeight + "px"; 
        } else {
            content.style.maxHeight = null; 
             setTimeout(() => {
                if (!content.classList.contains('active')) { 
                   content.style.paddingTop = "0";
                   content.style.paddingBottom = "0";
                }
            }, 300);
        }
        
        if (toggle.classList.contains('active')) {
             setTimeout(() => { 
                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = toggle.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                });
            }, 310);
        }
    }

    document.querySelectorAll('.accordion-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); 
            const contentId = this.id.replace('-toggle-footer', '-content-footer');
            window.toggleAccordion(this.id, contentId);
        });
    });

    // Mobile CTA Bar Script
    const ctaBar = document.getElementById('mobileCtaBar');
    const closeCtaButton = document.getElementById('closeCtaBar');
    const ctaBarClosedSessionKey = 'ctaBarClosed_BremoNexus'; // Made key more specific

    function showCtaBar() {
        // Check if screen width is mobile (e.g., less than 768px)
        // AND if the bar hasn't been closed in the current session
        if (ctaBar && window.innerWidth < 768 && sessionStorage.getItem(ctaBarClosedSessionKey) !== 'true') {
            ctaBar.classList.add('visible');
            document.body.classList.add('cta-bar-is-active');
        } else if (ctaBar) { // Ensure it's hidden if conditions are not met
            ctaBar.classList.remove('visible');
            document.body.classList.remove('cta-bar-is-active');
        }
    }

    function hideCtaBar() {
        if (ctaBar) {
            ctaBar.classList.remove('visible');
            document.body.classList.remove('cta-bar-is-active');
        }
    }

    // Initial check on page load
    showCtaBar();

    if (closeCtaButton) {
        closeCtaButton.addEventListener('click', function() {
            hideCtaBar(); // This will also remove the body class
            sessionStorage.setItem(ctaBarClosedSessionKey, 'true');
        });
    }

    // Optional: Re-check on resize.
    // Debounce resize function to avoid performance issues
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(showCtaBar, 250); // Adjust timeout as needed
    });

    // Education Badge Dismiss Logic
    const educationBadge = document.getElementById('educationBadge');
    const closeEducationBadgeButton = document.getElementById('closeEducationBadge');
    const educationBadgeClosedKey = 'educationBadgeClosed_v1'; // Added a version

    if (educationBadge && closeEducationBadgeButton) {
        // Check on page load if badge was previously closed
        if (sessionStorage.getItem(educationBadgeClosedKey) === 'true') {
            educationBadge.style.display = 'none';
        }

        // Event listener for the close button
        closeEducationBadgeButton.addEventListener('click', function() {
            educationBadge.style.display = 'none';
            sessionStorage.setItem(educationBadgeClosedKey, 'true');
        });
    }
});
