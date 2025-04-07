// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Force English as default language on first load
    let currentLanguage = 'en';
    
    // Only use saved language if it's not the first load
    if (localStorage.getItem('hasVisited')) {
        currentLanguage = localStorage.getItem('language') || 'en';
    } else {
        localStorage.setItem('hasVisited', 'true');
        localStorage.setItem('language', 'en');
    }

    // Initialize the page with the language
    setLanguage(currentLanguage);

    // Add event listeners to language switcher buttons
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Check if the clicked element is a language button
        if (target.classList.contains('language-btn')) {
            const lang = target.getAttribute('data-lang');
            if (lang && lang !== getCurrentLanguage()) {
                setLanguage(lang);
                
                // Dispatch a custom event for language change
                document.dispatchEvent(new CustomEvent('languageChanged', { 
                    detail: { language: lang } 
                }));

                // Reload the page after a short delay to ensure all translations are applied
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        }
    });
});

// Function to set the language
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not supported`);
        return;
    }
    
    // Save the selected language to localStorage
    localStorage.setItem('language', lang);
    
    // Set the active class on the language button
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update all placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Function to translate dynamic content (e.g., for content loaded after page load)
function translateElement(element, lang) {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
        element.textContent = translations[lang][key];
    }
    
    // Process children elements
    element.querySelectorAll('[data-i18n]').forEach(child => {
        translateElement(child, lang);
    });
    
    // Process placeholder attributes
    element.querySelectorAll('[data-i18n-placeholder]').forEach(child => {
        const placeholderKey = child.getAttribute('data-i18n-placeholder');
        if (translations[lang][placeholderKey]) {
            child.placeholder = translations[lang][placeholderKey];
        }
    });
}

// Function to get current language
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
} 