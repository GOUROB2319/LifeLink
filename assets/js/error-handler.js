/**
 * Error Handling Utility for LifeLink
 * Provides consistent error handling across the application
 */

// Error types
export const ErrorTypes = {
    NETWORK: 'network',
    AUTH: 'auth',
    VALIDATION: 'validation',
    PERMISSION: 'permission',
    NOT_FOUND: 'not_found',
    SERVER: 'server',
    UNKNOWN: 'unknown'
};

// User-friendly error messages (Bilingual)
const ErrorMessages = {
    en: {
        network: 'Network error. Please check your internet connection.',
        auth: 'Authentication failed. Please login again.',
        validation: 'Please check your input and try again.',
        permission: 'You do not have permission to perform this action.',
        not_found: 'The requested resource was not found.',
        server: 'Server error. Please try again later.',
        unknown: 'An unexpected error occurred. Please try again.'
    },
    bn: {
        network: 'নেটওয়ার্ক সমস্যা। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।',
        auth: 'প্রমাণীকরণ ব্যর্থ। অনুগ্রহ করে আবার লগইন করুন।',
        validation: 'আপনার ইনপুট পরীক্ষা করুন এবং আবার চেষ্টা করুন।',
        permission: 'এই কাজটি করার অনুমতি আপনার নেই।',
        not_found: 'অনুরোধকৃত তথ্য পাওয়া যায়নি।',
        server: 'সার্ভার সমস্যা। পরে আবার চেষ্টা করুন।',
        unknown: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।'
    }
};

/**
 * Get current language
 */
const getCurrentLang = () => localStorage.getItem('lifelink_lang') || 'en';

/**
 * Classify error type
 * @param {Error} error - Error object
 * @returns {string} - Error type
 */
export const classifyError = (error) => {
    if (!error) return ErrorTypes.UNKNOWN;

    const message = error.message?.toLowerCase() || '';
    const code = error.code?.toLowerCase() || '';

    // Network errors
    if (message.includes('network') || message.includes('fetch') || 
        code.includes('network') || !navigator.onLine) {
        return ErrorTypes.NETWORK;
    }

    // Auth errors
    if (code.includes('auth/') || message.includes('authentication')) {
        return ErrorTypes.AUTH;
    }

    // Permission errors
    if (code.includes('permission') || message.includes('permission-denied')) {
        return ErrorTypes.PERMISSION;
    }

    // Not found errors
    if (code.includes('not-found') || message.includes('not found')) {
        return ErrorTypes.NOT_FOUND;
    }

    // Validation errors
    if (message.includes('invalid') || message.includes('validation')) {
        return ErrorTypes.VALIDATION;
    }

    // Server errors
    if (code.includes('internal') || message.includes('server')) {
        return ErrorTypes.SERVER;
    }

    return ErrorTypes.UNKNOWN;
};

/**
 * Get user-friendly error message
 * @param {Error} error - Error object
 * @param {string} customMessage - Custom message (optional)
 * @returns {string} - User-friendly message
 */
export const getErrorMessage = (error, customMessage = null) => {
    if (customMessage) return customMessage;

    const lang = getCurrentLang();
    const errorType = classifyError(error);
    
    return ErrorMessages[lang][errorType] || ErrorMessages[lang].unknown;
};

/**
 * Show error notification
 * @param {string} message - Error message
 * @param {number} duration - Duration in ms (default 5000)
 */
export const showErrorNotification = (message, duration = 5000) => {
    // Remove existing notifications
    const existing = document.getElementById('error-notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.id = 'error-notification';
    notification.className = 'fixed top-24 right-4 z-[9999] max-w-md animate-slide-up';
    notification.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg shadow-xl flex items-start gap-3">
            <span class="material-symbols-outlined text-red-500 text-2xl flex-shrink-0">error</span>
            <div class="flex-1">
                <p class="text-sm font-bold text-red-800 dark:text-red-300 mb-1">Error</p>
                <p class="text-sm text-red-700 dark:text-red-400">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="text-red-500 hover:text-red-700 transition-colors">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
};

/**
 * Show success notification
 * @param {string} message - Success message
 * @param {number} duration - Duration in ms (default 3000)
 */
export const showSuccessNotification = (message, duration = 3000) => {
    const existing = document.getElementById('success-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.id = 'success-notification';
    notification.className = 'fixed top-24 right-4 z-[9999] max-w-md animate-slide-up';
    notification.innerHTML = `
        <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg shadow-xl flex items-start gap-3">
            <span class="material-symbols-outlined text-green-500 text-2xl flex-shrink-0">check_circle</span>
            <div class="flex-1">
                <p class="text-sm font-bold text-green-800 dark:text-green-300 mb-1">Success</p>
                <p class="text-sm text-green-700 dark:text-green-400">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="text-green-500 hover:text-green-700 transition-colors">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts (default 3)
 * @param {number} delay - Initial delay in ms (default 1000)
 * @returns {Promise} - Result of function
 */
export const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            // Don't retry auth errors or validation errors
            const errorType = classifyError(error);
            if (errorType === ErrorTypes.AUTH || errorType === ErrorTypes.VALIDATION) {
                throw error;
            }

            // Wait before retry (exponential backoff)
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
            }
        }
    }

    throw lastError;
};

/**
 * Handle async operation with loading state
 * @param {Function} operation - Async operation
 * @param {HTMLElement} button - Button element (optional)
 * @param {string} loadingText - Loading text (optional)
 * @returns {Promise} - Result of operation
 */
export const handleAsyncOperation = async (operation, button = null, loadingText = 'Processing...') => {
    let originalContent = null;
    let originalDisabled = false;

    try {
        // Set loading state
        if (button) {
            originalContent = button.innerHTML;
            originalDisabled = button.disabled;
            button.disabled = true;
            button.innerHTML = `
                <span class="material-symbols-outlined animate-spin">sync</span>
                <span>${loadingText}</span>
            `;
        }

        // Execute operation with retry
        const result = await retryWithBackoff(operation);
        return { success: true, data: result };

    } catch (error) {
        console.error('Operation failed:', error);
        const message = getErrorMessage(error);
        showErrorNotification(message);
        return { success: false, error };

    } finally {
        // Restore button state
        if (button && originalContent) {
            button.disabled = originalDisabled;
            button.innerHTML = originalContent;
        }
    }
};

/**
 * Log error (for debugging and future analytics)
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export const logError = (error, context = {}) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        message: error.message,
        code: error.code,
        type: classifyError(error),
        stack: error.stack,
        context,
        userAgent: navigator.userAgent,
        url: window.location.href
    };

    console.error('Error Log:', errorLog);

    // TODO: Send to error tracking service (Sentry, etc.) in production
};

/**
 * Check if user is online
 * @returns {boolean}
 */
export const isOnline = () => navigator.onLine;

/**
 * Setup online/offline listeners
 */
export const setupNetworkListeners = () => {
    window.addEventListener('online', () => {
        showSuccessNotification('Connection restored');
    });

    window.addEventListener('offline', () => {
        showErrorNotification('No internet connection', 10000);
    });
};

// Initialize network listeners
if (typeof window !== 'undefined') {
    setupNetworkListeners();
}
