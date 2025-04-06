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
            })
            .catch(error => {
                console.error(`Error including HTML file ${file}:`, error);
            });
    });
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', includeHTML); 