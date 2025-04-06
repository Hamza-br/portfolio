# Portfolio Website - Hamza Bourou

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- Multi-page layout with dedicated sections for different content
- Responsive design that works on all devices
- Interactive UI elements including typewriter effect, project filtering, and smooth scrolling
- Contact form with EmailJS integration for sending messages directly to email
- Modern aesthetic with animations and transitions

## Pages

- **Home**: Introduction with animated typewriter effect
- **About**: Personal bio, education history, technical skills, and certifications
- **Projects**: Showcase of technical projects with category filtering
- **Experience**: Work experience, technical projects, and extracurricular activities
- **Contact**: Contact form with EmailJS integration

## Technologies Used

- HTML5
- CSS3 (Custom styling without frameworks)
- JavaScript (Vanilla JS)
- EmailJS for form submissions
- Font Awesome for icons

## Installation & Setup

1. Clone the repository
   ```
   git clone https://github.com/Hamza-br/portfolio.git
   cd portfolio
   ```

2. EmailJS Setup
   - Create a free account at [EmailJS](https://www.emailjs.com/)
   - Create an email service and template
   - Copy `assets/js/config.example.js` to `assets/js/config.js`
   - Update the config.js file with your actual EmailJS credentials:
     ```javascript
     const CONFIG = {
         emailjs: {
             publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
             serviceId: 'YOUR_EMAILJS_SERVICE_ID',
             templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
         }
     };
     ```

3. Open the website
   - Open `index.html` in your browser, or
   - Use a local development server (like Live Server in VS Code)

## Customization

- **Colors**: Update the CSS variables in `assets/css/styles.css`
- **Content**: Modify the HTML files to update personal information
- **Images**: Replace images in the `public/images` directory
- **Projects**: Add or remove project cards in `projects.html`

## Deployment

This is a static website that can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## License

[MIT License](LICENSE)

## Connect with Me

- GitHub: [Hamza-br](https://github.com/Hamza-br)
- LinkedIn: [Hamza Bourou](https://www.linkedin.com/in/hamza-bourou-64689322b/)
- Email: bourou.hamza@aiac.ma
