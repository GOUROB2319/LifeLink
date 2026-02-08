// Force Light Mode
document.documentElement.classList.remove('dark');
document.documentElement.classList.add('light');
localStorage.removeItem('color-theme');

// Header Scroll Logic - Optional: Add 'scrolled' class if needed for specific overrides
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });
}
