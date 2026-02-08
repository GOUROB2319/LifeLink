// Footer Component
export function createFooter() {
  return `
    <footer class="bg-slate-900 text-slate-300 py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-primary text-3xl">favorite</span>
              <span class="font-bold text-xl text-white">LifeLink</span>
            </div>
            <p class="text-sm text-slate-400" data-i18n="footer.tagline">Connecting lives, one heartbeat at a time</p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold text-white mb-4" data-i18n="footer.quickLinks">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/index.html" class="hover:text-primary transition" data-i18n="nav.home">Home</a></li>
              <li><a href="/info/about.html" class="hover:text-primary transition" data-i18n="nav.about">About</a></li>
              <li><a href="/info/services.html" class="hover:text-primary transition" data-i18n="nav.services">Services</a></li>
              <li><a href="/dashboard/emergency.html" class="hover:text-primary transition" data-i18n="nav.emergency">Emergency</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="font-semibold text-white mb-4" data-i18n="footer.legal">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/info/privacy.html" class="hover:text-primary transition" data-i18n="footer.privacy">Privacy Policy</a></li>
              <li><a href="/info/terms.html" class="hover:text-primary transition" data-i18n="footer.terms">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-semibold text-white mb-4" data-i18n="footer.contact">Contact Us</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/info/contact.html" class="hover:text-primary transition" data-i18n="footer.contact">Contact</a></li>
              <li class="text-slate-400">support@lifelink.bd</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; ${new Date().getFullYear()} LifeLink BD. <span data-i18n="footer.rights">All rights reserved</span>.</p>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter() {
  const footerContainer = document.getElementById('footer');
  if (footerContainer) {
    footerContainer.innerHTML = createFooter();
  }
}
