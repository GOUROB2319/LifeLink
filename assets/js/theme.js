/**
 * Theme Manager for LifeLink
 * Handles System/Light/Dark theme switching
 */

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('lifelink_theme') || 'system';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupMediaQueryListener();
    }

    applyTheme() {
        const html = document.documentElement;
        
        if (this.theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.classList.toggle('dark', prefersDark);
            html.classList.toggle('light', !prefersDark);
        } else if (this.theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.add('light');
            html.classList.remove('dark');
        }
    }

    setupMediaQueryListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => {
            if (this.theme === 'system') {
                this.applyTheme();
            }
        });
    }

    setTheme(newTheme) {
        this.theme = newTheme;
        localStorage.setItem('lifelink_theme', newTheme);
        this.applyTheme();
        document.dispatchEvent(new CustomEvent('lifelink-theme-change', { detail: { theme: newTheme } }));
    }

    getTheme() {
        return this.theme;
    }

    getCurrentMode() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
}

// Initialize theme manager
window.themeManager = new ThemeManager();

// Global function for quick access
window.setTheme = (theme) => window.themeManager.setTheme(theme);
