document.addEventListener('DOMContentLoaded', function () {
    // Counter animation for stickers
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 1, counter, target, increment);
        } else {
            counter.innerText = target;
        }
    });

    function updateCounter(counter, target, increment) {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 1, counter, target, increment);
        } else {
            counter.innerText = target;
        }
    }

    // Add animations to stickers
    const stickers = document.querySelectorAll('.sticker');

    stickers[0].classList.add('float');
    stickers[1].classList.add('float');
    stickers[2].classList.add('float');
    stickers[3].classList.add('float');

    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('#regions-table tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.01)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        row.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Color alternating rows
    tableRows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.style.backgroundColor = 'rgba(67, 97, 238, 0.03)';
        }
    });
});