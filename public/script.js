// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-item');

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Handle navigation
            switch(index) {
                case 0:
                    console.log('Navigate to Garage');
                    // Add your navigation logic here
                    break;
                case 1:
                    console.log('Navigate to Home');
                    // Add your navigation logic here
                    break;
                case 2:
                    console.log('Create new post');
                    // Add your post creation logic here
                    break;
                case 3:
                    console.log('Navigate to News');
                    // Add your navigation logic here
                    break;
                case 4:
                    console.log('Navigate to Chat');
                    // Add your navigation logic here
                    break;
            }
        });
    });

    // Add smooth scroll behavior
    document.querySelector('.content').style.scrollBehavior = 'smooth';

    // Optional: Add click animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Only if not clicking a button or link
            if (!e.target.closest('button') && !e.target.closest('a')) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
});

// Optional: Add loading state for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s';
});

// Optional: Add pull-to-refresh functionality
let touchStartY = 0;
let touchEndY = 0;

const content = document.querySelector('.content');

content.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

content.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchEndY - touchStartY;

    // If swiped down and at top of scroll
    if (swipeDistance > 100 && content.scrollTop === 0) {
        console.log('Refresh content');
        // Add your refresh logic here
        // For example: location.reload();
    }
}
