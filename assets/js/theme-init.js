// Theme initialization - Must run BEFORE page renders
(function() {
    const theme = localStorage.getItem('lifelink_theme') || 'system';
    const html = document.documentElement;
    
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.classList.toggle('dark', prefersDark);
        html.classList.toggle('light', !prefersDark);
    } else if (theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
    } else {
        html.classList.add('light');
        html.classList.remove('dark');
    }
})();
