// Theme Controller - Single Source of Truth
class ThemeController {
  constructor() {
    this.STORAGE_KEY = 'lifelink-theme';
    this.THEMES = { LIGHT: 'light', DARK: 'dark' };
    this.currentTheme = this.getStoredTheme() || this.THEMES.LIGHT;
  }

  init() {
    this.applyTheme(this.currentTheme, false);
    this.setupToggleListeners();
  }

  getStoredTheme() {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  setStoredTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  applyTheme(theme, animate = true) {
    const html = document.documentElement;
    
    if (!animate) {
      html.classList.add('theme-transition-disabled');
    }

    if (theme === this.THEMES.DARK) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    this.currentTheme = theme;
    this.setStoredTheme(theme);
    this.updateToggleButtons();

    if (!animate) {
      setTimeout(() => html.classList.remove('theme-transition-disabled'), 0);
    }
  }

  toggle() {
    const newTheme = this.currentTheme === this.THEMES.LIGHT ? this.THEMES.DARK : this.THEMES.LIGHT;
    this.applyTheme(newTheme);
  }

  setupToggleListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme-toggle]')) {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  updateToggleButtons() {
    const buttons = document.querySelectorAll('[data-theme-toggle]');
    buttons.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = this.currentTheme === this.THEMES.DARK ? 'light_mode' : 'dark_mode';
      }
    });
  }
}

export const themeController = new ThemeController();
