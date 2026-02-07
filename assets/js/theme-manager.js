/**
 * Unified Theme Manager for LifeLink
 * Handles System/Light/Dark theme switching with single source of truth
 */

(function() {
    const html = document.documentElement;
    const STORAGE_KEY = 'lifelink_theme';
    
    class ThemeController {
        constructor() {
            this.theme = localStorage.getItem(STORAGE_KEY) || 'system';
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.init();
        }

        init() {
            this.applyTheme();
            this.mediaQuery.addEventListener('change', () => {
                if (this.theme === 'system') {
                    this.applyTheme();
                }
            });
            requestAnimationFrame(() => html.classList.remove('theme-preload'));
        }

        applyTheme() {
            html.classList.remove('dark', 'light');
            
            if (this.theme === 'system') {
                const prefersDark = this.mediaQuery.matches;
                html.classList.add(prefersDark ? 'dark' : 'light');
            } else {
                html.classList.add(this.theme);
            }
        }

        setTheme(newTheme) {
            if (!['system', 'light', 'dark'].includes(newTheme)) return;
            this.theme = newTheme;
            localStorage.setItem(STORAGE_KEY, newTheme);
            this.applyTheme();
            document.dispatchEvent(new CustomEvent('lifelink-theme-change', { 
                detail: { theme: newTheme } 
            }));
        }

        getTheme() {
            return this.theme;
        }

        getCurrentMode() {
            return html.classList.contains('dark') ? 'dark' : 'light';
        }
    }

    window.themeManager = new ThemeController();
    window.setTheme = (theme) => window.themeManager.setTheme(theme);
    window.getTheme = () => window.themeManager.getTheme();
})();
