// public/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Ensure viewport is correctly set for mobile
    refreshViewport();
    
    // Check if browser supports required features
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('visible');
        });
        document.querySelectorAll('.skill-level').forEach(skill => {
            const level = skill.dataset.level;
            skill.style.setProperty('--level', `${level}%`);
        });
    }

    // Typewriter effect
    const initTypewriter = () => {
        try {
            // Define phrases based on selected language
            const phrases = [
                getCurrentLanguage() === 'fr' ? "Étudiant en Ingénierie Informatique" : "Computer Science Engineering Student",
                getCurrentLanguage() === 'fr' ? "Ingénieur en Machine Learning" : "Machine Learning Engineer"
            ];
            
            let currentPhraseIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function typeWriter() {
                const currentPhrase = phrases[currentPhraseIndex];
                const typewriter = document.querySelector('.typewriter');
                
                if (!typewriter) return;
                
                if (isDeleting) {
                    typewriter.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typingSpeed = 50;
                } else {
                    typewriter.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && currentCharIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingSpeed = 1500; // Pause at the end
                } else if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    typingSpeed = 500; // Pause before starting new phrase
                }
                
                setTimeout(typeWriter, typingSpeed);
            }
            
            // Start the typewriter effect
            if (document.querySelector('.typewriter')) {
                typeWriter();
            }
        } catch (error) {
            console.error('Typewriter effect failed:', error);
            // Fallback: Just show the first phrase
            const typewriter = document.querySelector('.typewriter');
            if (typewriter) {
                typewriter.textContent = getCurrentLanguage() === 'fr' ? 
                    "Étudiant en Ingénierie Informatique" : 
                    "Computer Science Engineering Student";
            }
        }
    };
    
    // Initialize the typewriter
    initTypewriter();
    
    // When language changes, reset the typewriter
    document.addEventListener('languageChanged', function(e) {
        initTypewriter();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize skill levels
function initializeSkillLevels() {
    try {
        document.querySelectorAll('.skill-level').forEach(skill => {
            const level = skill.dataset.level;
            skill.style.setProperty('--level', `${level}%`);
        });
    } catch (error) {
        console.error('Skill levels initialization failed:', error);
    }
}

// Animate skills when they come into view
function handleSkillsAnimation() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'skillFill 1s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-level').forEach(skill => {
            observer.observe(skill);
        });
    }
}

// Call these functions when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.skill-level')) {
        initializeSkillLevels();
        handleSkillsAnimation();
    }
});

// Projects filtering and animation
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        // Filtering functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                try {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');

                    const filterValue = button.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';

                        setTimeout(() => {
                            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                                card.style.display = 'block';
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'scale(1)';
                                }, 50);
                            } else {
                                card.style.display = 'none';
                            }
                        }, 300);
                    });
                } catch (error) {
                    console.error('Project filtering failed:', error);
                }
            });
        });

        // Intersection Observer for fade-in animation
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.2
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            projectCards.forEach(card => {
                card.classList.add('fade-in');
                observer.observe(card);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            projectCards.forEach(card => {
                card.classList.add('fade-in', 'visible');
            });
        }
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll to top button
try {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.classList.add('scroll-top');
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} catch (error) {
    console.error('Scroll to top button initialization failed:', error);
}

// EmailJS configuration
try {
    const btn = document.getElementById('button');
    const form = document.getElementById('form');

    if (btn && form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            btn.value = 'Sending...';

            const serviceID = 'default_service';
            const templateID = 'template_sk700jb';

            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        btn.value = 'Send Email';
                        alert('Sent!');
                    }, (err) => {
                        btn.value = 'Send Email';
                        alert(JSON.stringify(err));
                    });
            } else {
                console.error('EmailJS not loaded');
                btn.value = 'Send Email';
                alert('Email service not available. Please try again later.');
            }
        });
    }
} catch (error) {
    console.error('Email form initialization failed:', error);
}

// Refresh viewport for mobile devices
function refreshViewport() {
    // Set the viewport meta tag to ensure proper scaling on mobile devices
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        // Force the browser to re-evaluate the viewport meta tag
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
}

// Add event listeners to all navigation links to refresh viewport on navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href$=".html"]');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Store the href
            const href = this.getAttribute('href');
            
            // Only handle internal navigation
            if (href && href.endsWith('.html')) {
                // Store the URL to navigate to
                const url = this.href;
                
                // Prevent default navigation
                e.preventDefault();
                
                // Refresh the viewport
                refreshViewport();
                
                // Add transition class to body
                document.body.classList.add('page-transitioning');
                
                // Navigate to the URL after the transition animation
                setTimeout(function() {
                    window.location.href = url;
                }, 500);
            }
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log("Setting up mobile menu");
    const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    if (mobileMenuToggle && navLinks) {
        console.log("Mobile menu elements found");
        
        // Directly add click event to the mobile toggle button
        mobileMenuToggle.onclick = function(e) {
            console.log("Mobile toggle clicked");
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle aria-expanded attribute
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            body.classList.toggle('menu-open');
            
            // Log the toggle state for debugging
            console.log("Menu is now:", navLinks.classList.contains('active') ? "open" : "closed");
            
            return false;
        };
        
        // Keep track of focused element before opening menu
        let lastFocusedElement;
        
        // Get current page URL to highlight/hide active link
        let currentPage = window.location.pathname.split('/').pop();
        
        // Handle empty paths or root URLs
        if (!currentPage || currentPage === "") {
            currentPage = "index.html";
        }
        
        // Find and mark the link for the current page
        navItems.forEach(item => {
            const itemPage = item.getAttribute('href');
            // Compare current page with the link's href
            if (itemPage === currentPage || 
                (currentPage === "index.html" && itemPage === "") ||
                (currentPage === "index.html" && itemPage === "#") ||
                (currentPage === "index.html" && itemPage === "/")) {
                // Mark the current page and hide it in mobile menu
                item.parentElement.classList.add('current-page');
                item.setAttribute('aria-current', 'page');
            }
        });
        
        // Close menu when clicking on a navigation link
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    // Only run on mobile and only if menu is open
                    console.log("Navigation link clicked, closing menu");
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active')) {
                const isClickInsideNav = navLinks.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnToggle) {
                    console.log("Clicked outside menu, closing it");
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            }
        });
        
        // Add escape key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                console.log("Escape key pressed, closing menu");
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Resize handler to reset menu state when window is resized
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                // Reset menu when resizing up to desktop
                console.log("Window resized, resetting menu");
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    } else {
        console.warn("Mobile menu elements not found");
    }
});
