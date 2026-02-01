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
                    <!-- Language Toggle -->
                    <button onclick="toggleLanguage()" class="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all group">
                        <span class="material-symbols-outlined text-[18px] text-slate-500 group-hover:text-primary dark:text-slate-400">translate</span>
                        <span id="lang-toggle-text" class="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary">EN</span>
                    </button>


                    <div class="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>

                    ${!isAuth ? `
                    <a href="/auth/login.html" class="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors px-2" data-i18n="nav.login">Login</a>
                    
                    <a href="/auth/register.html" class="hidden sm:flex relative overflow-hidden bg-brand-gradient text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 group">
                        <span class="relative z-10 flex items-center gap-2">
                            <span data-i18n="nav.join">Join LifeLink</span>
                            <span class="material-symbols-outlined text-lg">arrow_forward</span>
                        </span>
                    </a>
                    ` : `
                    <!-- Authenticated state -->
                    <div class="relative group" id="profile-dropdown">
                        <button class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <span class="material-symbols-outlined">account_circle</span>
                            </div>
                            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">expand_more</span>
                        </button>
                        
                        <div class="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] transform scale-95 group-hover:scale-100">
                            <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account</p>
                                <p id="user-display-name" class="text-sm font-bold text-slate-900 dark:text-white truncate">User Name</p>
                            </div>
                            
                            <a href="/dashboard/donor.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all">
                                <span class="material-symbols-outlined text-[20px]">dashboard</span>
                                <span>Dashboard</span>
                            </a>
                            <a href="/dashboard/settings.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all">
                                <span class="material-symbols-outlined text-[20px]">settings</span>
                                <span>Settings</span>
                            </a>
                            <div class="h-[1px] bg-slate-100 dark:bg-slate-800 my-1"></div>
                            <button id="logout-btn" class="w-full flex items-center gap-3 px-4 py-3 text-sm text-emergency hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold">
                                <span class="material-symbols-outlined text-[20px]">logout</span>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                    `}

                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 origin-top transform scale-y-0 opacity-0">
            <div class="px-4 py-6 space-y-4">
                <a href="/info/services.html" class="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold transition-colors" data-i18n="nav.services">Services</a>
                <a href="/index.html#how-it-works" class="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold transition-colors" data-i18n="nav.howItWorks">How it Works</a>
                <a href="/index.html#impact" class="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold transition-colors" data-i18n="nav.impact">Impact</a>
                <a href="/info/about.html" class="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold transition-colors" data-i18n="nav.about">About Us</a>
                
                ${!isAuth ? `
                <div class="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-3">
                    <a href="/auth/login.html" class="block w-full text-center py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300" data-i18n="nav.login">Login</a>
                    <a href="/onboarding/step1.html" class="block w-full text-center py-3 rounded-xl bg-brand-gradient text-white font-bold shadow-lg shadow-primary/20" data-i18n="nav.join">Join LifeLink</a>
                </div>
                ` : ``}
            </div>
        </div>
    </header>
        `;

        this.initLogic();
    }

    initLogic() {

        // Mobile Menu
        const mobileBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');
        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    setTimeout(() => {
                        mobileMenu.classList.remove('scale-y-0', 'opacity-0');
                    }, 10);
                    mobileBtn.querySelector('span').textContent = 'close';
                } else {
                    mobileMenu.classList.add('scale-y-0', 'opacity-0');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                    mobileBtn.querySelector('span').textContent = 'menu';
                }
            });
        }
    }

    /**
     * Update the navbar to show authenticated state
     * @param {Object} user - Firebase user
     */
    updateAuth(user) {
        if (!user) return;

        const displayName = user.displayName || user.email.split('@')[0];
        const nameEl = this.querySelector('#user-display-name');
        if (nameEl) nameEl.textContent = displayName;

        // Logout logic - we expect the globally available logout function
        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                // Try to find the logoutUser function from auth-service
                if (window.dispatchEvent) {
                    window.dispatchEvent(new CustomEvent('lifelink-logout'));
                }
            });
        }
    }
}

customElements.define('app-navbar', Navbar);

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
    <footer class="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-4 gap-12 mb-12">
                <!-- Brand -->
                <div class="md:col-span-1">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-2xl">favorite</span>
                        </div>
                        <span class="text-xl font-bold text-white">LifeLink <span class="text-secondary">BD</span></span>
                    </div>
                    <p class="text-sm text-slate-400 leading-relaxed" data-i18n="footer.tagline">
                        The professional bridge between medical resources and human needs. Available 24/7 for emergency support.
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="text-white font-bold mb-4" data-i18n="footer.quick_links">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="/dashboard/donor.html" class="hover:text-primary transition-colors" data-i18n="footer.find_donors">Find Donors</a></li>
                        <li><a href="/dashboard/hospital.html" class="hover:text-primary transition-colors" data-i18n="footer.hospital_partners">Hospital Partners</a></li>
                        <li><a href="/dashboard/emergency.html" class="hover:text-primary transition-colors" data-i18n="footer.emergency">Emergency</a></li>
                        <li><a href="/dashboard/directory.html" class="hover:text-primary transition-colors" data-i18n="footer.find_doctor">Find a Doctor</a></li>
                    </ul>
                </div>

                <!-- Support -->
                <div>
                    <h4 class="text-white font-bold mb-4" data-i18n="footer.support">Support</h4>
                    <ul class="space-y-2">
                        <li><a href="/info/services.html" class="hover:text-primary transition-colors" data-i18n="footer.help_center">Help Center</a></li>
                        <li><a href="/info/privacy.html" class="hover:text-primary transition-colors" data-i18n="footer.terms_privacy">Terms & Privacy</a></li>
                        <li><a href="#" class="hover:text-primary transition-colors" data-i18n="footer.faq">FAQ</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-white font-bold mb-4" data-i18n="footer.contact_us">Contact Us</h4>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-lg">mail</span>
                            support@lifelink.org
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-lg">phone</span>
                            +880 1234-567890
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-lg">location_on</span>
                            <span data-i18n="footer.address">Dhaka, Bangladesh</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex flex-col gap-1 text-center md:text-left">
                    <p class="text-sm text-slate-400" data-i18n="footer.rights">&copy; 2024 LifeLink BD. All rights reserved.</p>
                    <p class="text-[10px] text-slate-500 opacity-60">
                        Red Cross logo by International Red Cross and Red Crescent Movement - <a href="https://www.icrc.org" class="hover:text-primary underline">www.icrc.org</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=113885843" class="hover:text-primary underline">Link</a>
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <a href="#" class="text-slate-400 hover:text-primary transition-colors">Facebook</a>
                    <a href="#" class="text-slate-400 hover:text-primary transition-colors">Twitter</a>
                    <a href="#" class="text-slate-400 hover:text-primary transition-colors">LinkedIn</a>
                </div>
            </div>
        </div>
    </footer>
        `;
    }
}

customElements.define('app-footer', Footer);
