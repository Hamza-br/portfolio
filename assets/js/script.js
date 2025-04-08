// public/js/script.js
document.addEventListener('DOMContentLoaded', function() {
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

    // Mobile Navigation
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active') && 
                !navToggle.contains(event.target) && 
                !navLinks.contains(event.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
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