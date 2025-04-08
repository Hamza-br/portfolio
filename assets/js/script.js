// public/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    function initMobileNav() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });

            // Close mobile menu when clicking a link
            const navItems = navLinks.querySelectorAll('a');
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    // Initialize mobile navigation
    initMobileNav();

    // Typewriter effect
    const initTypewriter = () => {
        
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
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Initialize skill levels
function initializeSkillLevels() {
    document.querySelectorAll('.skill-level').forEach(skill => {
        const level = skill.dataset.level;
        skill.style.setProperty('--level', `${level}%`);
    });
}

// Animate skills when they come into view
function handleSkillsAnimation() {
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
            });
        });

        // Intersection Observer for fade-in animation
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
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll to top button
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

// EmailJS configuration
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_sk700jb';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});