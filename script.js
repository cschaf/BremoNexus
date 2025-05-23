// Login check
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// JavaScript-Code wie in der vorherigen korrekten Version
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainPageContent');
    if (mainContent) {
        mainContent.style.display = 'block';
    }

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

    // Function to display properties
    function displayProperties() {
        if (typeof propertyData === 'undefined' || !Array.isArray(propertyData)) {
            console.error('Error: propertyData is not defined or not an array.');
            return;
        }

        const propertiesListContainer = document.querySelector('.properties-list');
        if (!propertiesListContainer) {
            console.error('Error: Could not find the ".properties-list" container.');
            return;
        }

        propertiesListContainer.innerHTML = ''; // Clear existing content

        propertyData.forEach(property => {
            // Create property-item div
            const propertyItem = document.createElement('div');
            propertyItem.classList.add('property-item');

            // Create property-img div
            const propertyImg = document.createElement('div');
            propertyImg.classList.add('property-img');
            propertyImg.style.backgroundImage = `url('${property.image}')`;

            // Create property-content div
            const propertyContent = document.createElement('div');
            propertyContent.classList.add('property-content');

            // Create and append h3 for name
            const nameH3 = document.createElement('h3');
            nameH3.textContent = property.name;
            propertyContent.appendChild(nameH3);

            // Create and append div for price
            const priceDiv = document.createElement('div');
            priceDiv.classList.add('property-price');
            priceDiv.textContent = property.price;
            propertyContent.appendChild(priceDiv);

            // Create and append p for description
            const descriptionP = document.createElement('p');
            descriptionP.textContent = property.description;
            propertyContent.appendChild(descriptionP);

            // Create property-features div
            const propertyFeaturesDiv = document.createElement('div');
            propertyFeaturesDiv.classList.add('property-features');

            property.features.forEach(feature => {
                const featureDiv = document.createElement('div');
                featureDiv.classList.add('property-feature');

                const iconI = document.createElement('i');
                iconI.className = feature.icon; // Assigns all classes from feature.icon

                const textSpan = document.createElement('span');
                textSpan.textContent = ` ${feature.text}`; // Add space for separation

                featureDiv.appendChild(iconI);
                featureDiv.appendChild(textSpan);
                propertyFeaturesDiv.appendChild(featureDiv);
            });
            propertyContent.appendChild(propertyFeaturesDiv);

            // Create and append 'Anfragen' button
            const anfragenBtn = document.createElement('a');
            anfragenBtn.classList.add('btn');
            anfragenBtn.href = '#contact';
            anfragenBtn.textContent = 'Anfragen';
            propertyContent.appendChild(anfragenBtn);

            // Append property-img and property-content to property-item
            propertyItem.appendChild(propertyImg);
            propertyItem.appendChild(propertyContent);

            // Append property-item to the main container
            propertiesListContainer.appendChild(propertyItem);
        });
    }

    // Call displayProperties to render the listings
    displayProperties(); 
});
