// Main Application Entry Point
import { themeController } from './core/theme.js';
import { i18n } from './core/i18n.js';
import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';
import { registerServiceWorker } from './core/pwa.js';

class App {
  constructor() {
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    // Initialize core systems
    themeController.init();
    i18n.init();

    // Initialize components
    initNavbar();
    initFooter();

    // Register service worker
    registerServiceWorker();

    // Setup global error handler
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });

    // Setup unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });

    this.initialized = true;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}

export default App;
