// Navbar Component
export function createNavbar(isAuthenticated = false, userRole = null) {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a href="/public/index.html" class="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
            <span class="material-symbols-outlined text-primary text-3xl">favorite</span>
            <span>LifeLink</span>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-6">
            <a href="/public/index.html" class="text-slate-700 dark:text-slate-300 hover:text-primary transition" data-i18n="nav.home">Home</a>
            <a href="/public/info/about.html" class="text-slate-700 dark:text-slate-300 hover:text-primary transition" data-i18n="nav.about">About</a>
            <a href="/public/info/services.html" class="text-slate-700 dark:text-slate-300 hover:text-primary transition" data-i18n="nav.services">Services</a>
            <a href="/public/dashboard/emergency.html" class="text-red-600 dark:text-red-400 hover:text-red-700 font-semibold transition" data-i18n="nav.emergency">Emergency</a>
            <a href="/public/dashboard/directory.html" class="text-slate-700 dark:text-slate-300 hover:text-primary transition" data-i18n="nav.directory">Directory</a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Language Toggle -->
            <button data-lang-toggle class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <span class="lang-text text-sm font-medium text-slate-700 dark:text-slate-300">বাংলা</span>
            </button>

            <!-- Theme Toggle -->
            <button data-theme-toggle class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <span class="material-symbols-outlined text-slate-700 dark:text-slate-300">dark_mode</span>
            </button>

            ${isAuthenticated ? `
              <a href="/public/dashboard/${userRole || 'patient'}.html" class="btn-primary" data-i18n="nav.dashboard">Dashboard</a>
              <button data-logout class="btn-secondary" data-i18n="nav.logout">Logout</button>
            ` : `
              <a href="/public/auth/login.html" class="btn-secondary" data-i18n="nav.login">Login</a>
              <a href="/public/auth/register.html" class="btn-primary" data-i18n="nav.register">Register</a>
            `}

            <!-- Mobile Menu Toggle -->
            <button data-mobile-menu-toggle class="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <span class="material-symbols-outlined text-slate-700 dark:text-slate-300">menu</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div data-mobile-menu class="hidden md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div class="px-4 py-4 space-y-3">
          <a href="/public/index.html" class="block py-2 text-slate-700 dark:text-slate-300" data-i18n="nav.home">Home</a>
          <a href="/public/info/about.html" class="block py-2 text-slate-700 dark:text-slate-300" data-i18n="nav.about">About</a>
          <a href="/public/info/services.html" class="block py-2 text-slate-700 dark:text-slate-300" data-i18n="nav.services">Services</a>
          <a href="/public/dashboard/emergency.html" class="block py-2 text-red-600 dark:text-red-400 font-semibold" data-i18n="nav.emergency">Emergency</a>
          <a href="/public/dashboard/directory.html" class="block py-2 text-slate-700 dark:text-slate-300" data-i18n="nav.directory">Directory</a>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbar() {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  // Check auth state and render
  import('./core/auth.js').then(({ authService }) => {
    authService.onAuthChange((user) => {
      const role = user?.role || 'patient';
      navContainer.innerHTML = createNavbar(!!user, role);
      setupNavbarListeners();
    });
  });
}

function setupNavbarListeners() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  
  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Logout
  const logoutBtn = document.querySelector('[data-logout]');
  logoutBtn?.addEventListener('click', async () => {
    const { authService } = await import('./core/auth.js');
    await authService.logout();
    window.location.href = '/public/index.html';
  });
}
