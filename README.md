# BremoNexus Immobilien Website

## Live Demo
[View Live Demo](https://cschaf.github.io/BremoNexus/)

## About This Project
This project is a showcase website for BremoNexus Immobilien, a fictional real estate agency. It's designed for educational purposes to demonstrate various web development techniques, including dynamic content loading and a basic login system. The site aims to present property listings and company information in a clean, user-friendly interface.

## Features
*   **Dynamic Property Listings:** Properties are loaded from an external JavaScript file (`properties.js`), allowing for easier management.
*   **User Authentication:** A simple login page (`login.html`) restricts access to the main content. Users must log in with credentials "demo" (username) and "demo" (password).
*   **Dark Mode:** A toggle allows users to switch between light and dark themes.
*   **Responsive Design:** The website incorporates responsive elements for navigation, calls to action, and overall layout to adapt to different screen sizes.
*   **Interactive UI Elements:** Includes features like a scroll-to-top button, mobile-friendly navigation, and dismissible education/CTA bars.
*   **Footer Accordions:** Sections like "Impressum," "Datenschutz," and "AGB" in the footer are implemented as accordions (currently with placeholder content).
*   **Mock Contact Form:** A contact form that simulates submission with an alert message.

## Technical Implementation
*   **Property Loading:**
    *   Property data is stored in `properties.js` as an array of JavaScript objects.
    *   `script.js` dynamically creates HTML elements for each property and injects them into the `index.html` page when the DOM is loaded.
*   **Login System:**
    *   `login.html` provides the login form.
    *   `login.js` handles form submission, validates credentials ("demo"/"demo").
    *   On successful login, `sessionStorage.setItem('isLoggedIn', 'true');` is used to store the login state.
    *   `script.js` (on `index.html`) checks for this `sessionStorage` item. If not present or not `'true'`, it redirects the user to `login.html`.
    *   The main content in `index.html` is initially hidden via `style="display: none;"` and is shown by `script.js` only after a successful login check.
*   **Styling:** Primarily done via `styles.css`, with some inline styles for initial states (e.g., hiding main content) and dynamic changes (e.g., property images).

## Key Files
*   `index.html`: The main page displaying property listings and company information (requires login).
*   `login.html`: The login page.
*   `styles.css`: Main stylesheet for the entire website.
*   `script.js`: Handles dynamic property loading, dark mode, UI interactions, and login protection for `index.html`.
*   `login.js`: Handles the logic for the login form on `login.html`.
*   `properties.js`: Contains the data for property listings.
*   `images/`: Directory containing images used throughout the site.

## How to Run / View
*   **Live Demo:** The easiest way is to visit the [Live Demo Link](https://cschaf.github.io/BremoNexus/).
*   **Local Files:**
    *   Clone or download the repository.
    *   Open `login.html` in your web browser to start.
    *   Alternatively, opening `index.html` will automatically redirect you to `login.html` if you are not logged in.
