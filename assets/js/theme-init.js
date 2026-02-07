// Theme initialization - Must run BEFORE page renders
(function() {
    const html = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
        const theme = localStorage.getItem('lifelink_theme') || 'system';
        if (theme === 'system') {
            const prefersDark = media.matches;
            html.classList.toggle('dark', prefersDark);
            html.classList.toggle('light', !prefersDark);
        } else if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.add('light');
            html.classList.remove('dark');
        }
    };

    applyTheme();
    media.addEventListener('change', applyTheme);
})();
