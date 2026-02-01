class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const isAuth = this.getAttribute('auth') === 'true';
        const activeLink = this.getAttribute('active') || '';

        // Correct paths based on depth (simple heuristic: count slashes in location.pathname)
        // For a more robust solution, we can just use root-relative paths if served correctly, 
        // but for file:// or simple serving, we need relative adjustments.
        // Assuming /website/ is root for now or using absolute relative to current page.
        // Let's us simple relative logic based on assumed folder structure.

        const getPath = (path) => {
            // Basic logic: if we are in a subdir, go up.
            // This is a simplified approach. Ideally we use absolute paths /assets/...
            return path;
        };

        this.innerHTML = `
    <header class="fixed top-0 z-50 w-full transition-all duration-300 glass border-b border-white/20 dark:border-slate-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center gap-3 cursor-pointer group" onclick="window.location.href='/index.html'">
                    <div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span class="material-symbols-outlined text-2xl">favorite</span>
                    </div>
                    <span class="text-xl font-bold tracking-tight text-slate-800 dark:text-white">LifeLink <span class="text-secondary">BD</span></span>
                </div>

                <!-- Desktop Nav -->
                <nav class="hidden md:flex items-center gap-1">
                    <a class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors ${activeLink === 'services' ? 'bg-primary/10 text-primary' : ''}" href="/info/services.html" data-i18n="nav.services">Services</a>
                    <a class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors ${activeLink === 'how-it-works' ? 'bg-primary/10 text-primary' : ''}" href="/index.html#how-it-works" data-i18n="nav.howItWorks">How it Works</a>
                    <a class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors ${activeLink === 'impact' ? 'bg-primary/10 text-primary' : ''}" href="/index.html#impact" data-i18n="nav.impact">Impact</a>
                    <a class="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors ${activeLink === 'about' ? 'bg-primary/10 text-primary' : ''}" href="/info/about.html" data-i18n="nav.about">About Us</a>
                </nav>

                <!-- Actions -->
                <div class="flex items-center gap-3">
                    <!-- Theme Toggle -->
                    <button id="theme-toggle-nav" class="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:text-secondary dark:hover:text-secondary">
                        <span class="material-symbols-outlined dark:hidden">dark_mode</span>
                        <span class="material-symbols-outlined hidden dark:block">light_mode</span>
                    </button>

                    <div class="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>

                    ${!isAuth ? `
                    <a href="/auth/login.html" class="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors px-2" data-i18n="nav.login">Login</a>
                    
                    <a href="/onboarding/step1.html" class="relative overflow-hidden bg-brand-gradient text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 group">
                        <span class="relative z-10 flex items-center gap-2">
                            <span data-i18n="nav.join">Join LifeLink</span>
                            <span class="material-symbols-outlined text-lg">arrow_forward</span>
                        </span>
                    </a>
                    ` : `
                    <!-- Authenticated state, no dashboard button here as per instruction -->
                    `}
                </div>
            </div>
        </div>
    </header>
        `;

        // Initialize Theme Toggle Logic for this injected component
        const themeBtn = this.querySelector('#theme-toggle-nav');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                if (document.documentElement.classList.contains('dark')) {
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    localStorage.setItem('color-theme', 'light');
                }
            });
        }
    }
}

customElements.define('app-navbar', Navbar);
