// Theme initialization - Must run BEFORE page renders
(function() {
    const html = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
        const theme = localStorage.getItem('lifelink_theme') || 'system';
        html.classList.remove('dark', 'light');
        if (theme === 'system') {
            const prefersDark = media.matches;
            html.classList.toggle('dark', prefersDark);
            html.classList.toggle('light', !prefersDark);
        } else if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.add('light');
        }
    };

    applyTheme();
    media.addEventListener('change', applyTheme);

    // Remove preload class after initial paint
    requestAnimationFrame(() => {
        html.classList.remove('theme-preload');
    });
})();
