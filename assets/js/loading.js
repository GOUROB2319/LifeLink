/**
 * Loading Component Utility
 * Provides consistent loading states across the application
 */

export const LoadingStates = {
    BUTTON: 'button',
    FULLSCREEN: 'fullscreen',
    INLINE: 'inline',
    SKELETON: 'skeleton'
};

/**
 * Show loading spinner
 * @param {string} type - Loading type
 * @param {string} message - Loading message
 * @param {HTMLElement} container - Container element (optional)
 */
export const showLoading = (type = LoadingStates.FULLSCREEN, message = 'Loading...', container = null) => {
    const loadingId = `loading-${type}-${Date.now()}`;
    
    if (type === LoadingStates.FULLSCREEN) {
        const existing = document.getElementById('fullscreen-loading');
        if (existing) return;

        const loading = document.createElement('div');
        loading.id = 'fullscreen-loading';
        loading.className = 'fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center';
        loading.innerHTML = `
            <div class="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                    <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="text-slate-700 dark:text-slate-300 font-bold text-center">${message}</p>
            </div>
        `;
        document.body.appendChild(loading);
        return loadingId;
    }

    if (type === LoadingStates.INLINE && container) {
        const loading = document.createElement('div');
        loading.id = loadingId;
        loading.className = 'flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl';
        loading.innerHTML = `
            <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm text-slate-600 dark:text-slate-400">${message}</span>
        `;
        container.appendChild(loading);
        return loadingId;
    }

    return loadingId;
};

/**
 * Hide loading spinner
 * @param {string} loadingId - Loading ID (optional)
 */
export const hideLoading = (loadingId = null) => {
    if (loadingId) {
        const element = document.getElementById(loadingId);
        if (element) element.remove();
    } else {
        const fullscreen = document.getElementById('fullscreen-loading');
        if (fullscreen) fullscreen.remove();
    }
};

/**
 * Create skeleton loader
 * @param {number} count - Number of skeleton items
 * @returns {string} - HTML string
 */
export const createSkeleton = (count = 3) => {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `
            <div class="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
        `;
    }
    return html;
};

/**
 * Show empty state
 * @param {HTMLElement} container - Container element
 * @param {string} message - Empty message
 * @param {string} icon - Material icon name
 */
export const showEmptyState = (container, message = 'No data found', icon = 'inbox') => {
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 px-4">
            <div class="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <span class="material-symbols-outlined text-5xl text-slate-400">${icon}</span>
            </div>
            <p class="text-slate-500 dark:text-slate-400 text-center font-medium">${message}</p>
        </div>
    `;
};
