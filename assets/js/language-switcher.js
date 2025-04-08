// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'language-switcher-loading';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text" data-i18n="switching-language">Switching Language</div>
    `;
    document.body.appendChild(loadingIndicator);

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
                // Show loading indicator
                loadingIndicator.classList.add('active');
                
                // Set language and handle errors
                try {
                    setLanguage(lang);
                    
                    // Dispatch a custom event for language change
                    document.dispatchEvent(new CustomEvent('languageChanged', { 
                        detail: { language: lang } 
                    }));

                    // Reload the page after a short delay to ensure all translations are applied
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                } catch (error) {
                    console.error('Error switching language:', error);
                    // Hide loading indicator on error
                    loadingIndicator.classList.remove('active');
                    // Show a more user-friendly error message
                    showNotification('error', 'Unable to switch language. Please try again later.');
                }
            }
        }
    });
});

// Function to show notification
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Function to set the language
function setLanguage(lang) {
    if (!translations[lang]) {
        throw new Error(`Language "${lang}" is not supported.`);
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
    
    // Update all translatable elements with improved fallback behavior
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        } else {
            console.warn(`Translation missing for "${key}" in ${lang}.`);
            // Try fallback languages in order: current language -> English -> key
            const fallbackLanguages = [lang, 'en'];
            let translationFound = false;
            
            for (const fallbackLang of fallbackLanguages) {
                if (translations[fallbackLang]?.[key]) {
                    element.textContent = translations[fallbackLang][key];
                    translationFound = true;
                    break;
                }
            }
            
            if (!translationFound) {
                element.textContent = `[${key}]`;
                console.error(`No translation found for "${key}" in any supported language.`);
            }
        }
    });
    
    // Update all placeholder attributes with improved fallback behavior
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        } else {
            console.warn(`Placeholder translation missing for "${key}" in ${lang}.`);
            // Try fallback languages in order: current language -> English -> key
            const fallbackLanguages = [lang, 'en'];
            let translationFound = false;
            
            for (const fallbackLang of fallbackLanguages) {
                if (translations[fallbackLang]?.[key]) {
                    element.placeholder = translations[fallbackLang][key];
                    translationFound = true;
                    break;
                }
            }
            
            if (!translationFound) {
                element.placeholder = `[${key}]`;
                console.error(`No placeholder translation found for "${key}" in any supported language.`);
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Function to translate dynamic content
function translateElement(element, lang) {
    if (!translations[lang]) {
        throw new Error(`Language "${lang}" is not supported.`);
    }

    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
        element.textContent = translations[lang][key];
    } else {
        console.warn(`Translation missing for "${key}" in ${lang}.`);
        // Try fallback languages in order: current language -> English -> key
        const fallbackLanguages = [lang, 'en'];
        let translationFound = false;
        
        for (const fallbackLang of fallbackLanguages) {
            if (translations[fallbackLang]?.[key]) {
                element.textContent = translations[fallbackLang][key];
                translationFound = true;
                break;
            }
        }
        
        if (!translationFound) {
            element.textContent = `[${key}]`;
            console.error(`No translation found for "${key}" in any supported language.`);
        }
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
        } else {
            console.warn(`Placeholder translation missing for "${placeholderKey}" in ${lang}.`);
            // Try fallback languages in order: current language -> English -> key
            const fallbackLanguages = [lang, 'en'];
            let translationFound = false;
            
            for (const fallbackLang of fallbackLanguages) {
                if (translations[fallbackLang]?.[placeholderKey]) {
                    child.placeholder = translations[fallbackLang][placeholderKey];
                    translationFound = true;
                    break;
                }
            }
            
            if (!translationFound) {
                child.placeholder = `[${placeholderKey}]`;
                console.error(`No placeholder translation found for "${placeholderKey}" in any supported language.`);
            }
        }
    });
}

// Function to get current language
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
} 