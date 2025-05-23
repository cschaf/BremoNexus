document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('errorMessage');

    if (loginForm && usernameInput && passwordInput && errorMessageDiv) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === "demo" && password === "demo") {
                // Correct credentials
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html'; // Redirect to index.html
            } else {
                // Incorrect credentials
                errorMessageDiv.textContent = "Invalid username or password.";
                passwordInput.value = ''; // Clear the password field
                usernameInput.focus(); // Optional: focus back on username
            }
        });
    } else {
        console.error('Login form elements not found. Ensure IDs are correct: loginForm, username, password, errorMessage');
    }
});
