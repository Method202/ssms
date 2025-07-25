document.addEventListener('DOMContentLoaded', function () {
    // Get username from URL parameter or use default
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username') || 'Supporter';

    // Set username in the greeting
    document.getElementById('username-display').textContent = username;
    document.getElementById('greeting-name').textContent = username;

    // Set last login time
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('last-login').textContent = now.toLocaleDateString('en-US', options);

    // Logout button functionality
    document.getElementById('logout-btn').addEventListener('click', function () {
        if (confirm('Are you sure you want to logout?')) {
            // In a real app, you would handle the logout process here
            alert('You have been logged out successfully!');
            window.location.href = 'home.html'; // Redirect to login page
        }
    });

    // Quick action buttons

    document.getElementById('view-reports-btn').addEventListener('click', function () {
        window.location.href = 'supporterdashboard.html';
    });

    document.getElementById('system-settings-btn').addEventListener('click', function () {
        alert('System settings will be available in the next update!');
    });

    // Animation for navigation cards
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });

    // Add hover effect to activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(5px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
        });
    });

    // Simulate loading animation
    setTimeout(() => {
        document.querySelector('.welcome-card').classList.add('loaded');
    }, 500);
});

// Animation for elements
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('.nav-card, .btn-action, .activity-item').forEach(el => {
    animateOnScroll.observe(el);
});