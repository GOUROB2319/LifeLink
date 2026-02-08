/**
 * PWA Installer and Service Worker Registration
 * Makes app installable on mobile/desktop
 */

let deferredPrompt;

/**
 * Register service worker
 */
export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service Worker registered:', registration.scope);
            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            return null;
        }
    } else {
        console.log('Service Workers not supported');
        return null;
    }
};

/**
 * Check if app is installed
 * @returns {boolean}
 */
export const isAppInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
};

/**
 * Show install prompt
 */
export const showInstallPrompt = async () => {
    if (!deferredPrompt) {
        console.log('Install prompt not available');
        return false;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Install outcome: ${outcome}`);
    deferredPrompt = null;
    return outcome === 'accepted';
};

/**
 * Create install button
 * @param {HTMLElement} container - Container element
 */
export const createInstallButton = (container) => {
    if (isAppInstalled()) {
        console.log('App already installed');
        return;
    }

    const button = document.createElement('button');
    button.id = 'install-button';
    button.className = 'hidden fixed bottom-6 right-6 z-50 bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-105 transition-all';
    button.innerHTML = `
        <span class="material-symbols-outlined">download</span>
        <span>Install App</span>
    `;

    button.addEventListener('click', async () => {
        const installed = await showInstallPrompt();
        if (installed) {
            button.remove();
        }
    });

    container.appendChild(button);

    // Show button when install prompt is available
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        button.classList.remove('hidden');
    });

    // Hide button after install
    window.addEventListener('appinstalled', () => {
        button.remove();
        console.log('App installed successfully');
    });
};

/**
 * Initialize PWA features
 */
export const initPWA = () => {
    // Register service worker
    registerServiceWorker();

    // Create install button
    if (document.body) {
        createInstallButton(document.body);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            createInstallButton(document.body);
        });
    }

    // Log install status
    if (isAppInstalled()) {
        console.log('Running as installed app');
    } else {
        console.log('Running in browser');
    }
};

// Auto-initialize
if (typeof window !== 'undefined') {
    initPWA();
}
