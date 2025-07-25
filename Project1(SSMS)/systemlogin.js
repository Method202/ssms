document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const successModal = document.getElementById('success-modal');
    const successUsername = document.getElementById('success-username');

    // Password visibility toggle
    const showLoginPassword = document.getElementById('show-login-password');
    const showSignupPassword = document.getElementById('show-signup-password');
    const loginPassword = document.getElementById('login-password');
    const signupPassword = document.getElementById('signup-password');

    // Toggle between login and signup forms
    showSignup.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.classList.remove('active-form');
        loginForm.classList.add('hidden-form');
        signupForm.classList.remove('hidden-form');
        signupForm.classList.add('active-form');
    });

    showLogin.addEventListener('click', function (e) {
        e.preventDefault();
        signupForm.classList.remove('active-form');
        signupForm.classList.add('hidden-form');
        loginForm.classList.remove('hidden-form');
        loginForm.classList.add('active-form');
    });

    // Toggle password visibility
    function togglePasswordVisibility(button, input) {
        button.addEventListener('click', function () {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            button.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
        });
    }

    togglePasswordVisibility(showLoginPassword, loginPassword);
    togglePasswordVisibility(showSignupPassword, signupPassword);

    // Form validation and submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            // Simulate successful login
            const username = email.split('@')[0] || email;
            successUsername.textContent = username;
            successModal.classList.add('active');

            // Auto-redirect after 3 seconds
            setTimeout(function () {
                window.location.href = `systemhome.html?username=${encodeURIComponent(username)}`;
            }, 3000);

        } else {
            alert('Please fill in all fields');
        }
    });

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('signup-firstname').value;
        const lastName = document.getElementById('signup-lastname').value;
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        const agreeTerms = document.getElementById('agree-terms').checked;

        if (firstName && lastName && email && username && password && confirmPassword && agreeTerms) {
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Simulate successful signup
            successUsername.textContent = username;
            successModal.classList.add('active');

            // Auto-redirect after 3 seconds
            setTimeout(function () {
                window.location.href = `systemhome.html?username=${encodeURIComponent(username)}`;
            }, 3000);

        } else {
            alert('Please fill in all fields and agree to the terms');
        }
    });

    // Add animation to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.transitionDelay = `${index * 0.05}s`;
        group.classList.add('animate-in');
    });
});