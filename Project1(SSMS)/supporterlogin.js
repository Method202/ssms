// In your systemlogin.js or within the <script> tags:

document.addEventListener('DOMContentLoaded', function () {
    // Your existing form toggle code...

    // Login form submission
    const loginForm = document.getElementById('login-form');
    const successModal = document.getElementById('success-modal');
    const successUsername = document.getElementById('success-username');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simple validation
        if (email && password) {
            // Extract username from email (or use email if no @)
            const username = email.split('@')[0] || email;
            successUsername.textContent = username;

            // Show success modal
            successModal.classList.add('active');

            // Redirect after 3 seconds
            setTimeout(function () {
                window.location.href = 'supporterhome.html';
            }, 3000);

            // Optional: Show countdown
            const redirectMsg = document.querySelector('.redirect-message');
            let seconds = 3;
            const countdown = setInterval(function () {
                seconds--;
                redirectMsg.textContent = `Redirecting to supporter home in ${seconds} seconds...`;
                if (seconds <= 0) {
                    clearInterval(countdown);
                }
            }, 1000);
        } else {
            alert('Please fill in all fields');
        }
    });

    // Signup form submission
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;

        // Validation
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (username && email && password) {
            successUsername.textContent = username;
            successModal.classList.add('active');

            // Redirect after 3 seconds
            setTimeout(function () {
                window.location.href = 'supporterhome.html';
            }, 3000);

            // Optional: Show countdown
            const redirectMsg = document.querySelector('.redirect-message');
            let seconds = 3;
            const countdown = setInterval(function () {
                seconds--;
                redirectMsg.textContent = `Redirecting to supporter home in ${seconds} seconds...`;
                if (seconds <= 0) {
                    clearInterval(countdown);
                }
            }, 1000);
        } else {
            alert('Please fill in all fields');
        }
    });
});