// Function to include HTML files
function includeHTML() {
    const includeElements = document.querySelectorAll('[data-include]');
    
    includeElements.forEach(element => {
        const file = element.getAttribute('data-include');
        
        fetch(file)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('File not found');
            })
            .then(html => {
                element.innerHTML = html;
                
                // Execute scripts if there are any in the included HTML
                const scripts = element.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.head.appendChild(newScript);
                });
                
                // Apply current language to included elements
                if (typeof getCurrentLanguage === 'function' && typeof setLanguage === 'function') {
                    const currentLang = getCurrentLanguage();
                    const translatableElements = element.querySelectorAll('[data-i18n]');
                    
                    translatableElements.forEach(el => {
                        const key = el.getAttribute('data-i18n');
                        if (translations[currentLang] && translations[currentLang][key]) {
                            el.textContent = translations[currentLang][key];
                        }
                    });
                    
                    // Process placeholder attributes
                    const placeholderElements = element.querySelectorAll('[data-i18n-placeholder]');
                    placeholderElements.forEach(el => {
                        const key = el.getAttribute('data-i18n-placeholder');
                        if (translations[currentLang] && translations[currentLang][key]) {
                            el.placeholder = translations[currentLang][key];
                        }
                    });
                    
                    // Set active class on language buttons
                    const langButtons = element.querySelectorAll('.language-btn');
                    langButtons.forEach(btn => {
                        if (btn.getAttribute('data-lang') === currentLang) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }
            })
            .catch(error => {
                console.error(`Error including HTML file ${file}:`, error);
            });
    });
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', includeHTML); 