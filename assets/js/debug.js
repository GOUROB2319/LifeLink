/**
 * Production-Safe Debug Utility for LifeLink
 * Provides console logging that automatically silences in production
 * Usage: import { debug } from './debug.js'; debug.log('message');
 */

class DebugLogger {
    constructor() {
        // Check if we're in development mode
        // Development detected by: localhost, 127.0.0.1, or file:// protocol
        this.isDev = this.checkDevEnvironment();
    }

    checkDevEnvironment() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;

        return (
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '' || // file:// protocol
            protocol === 'file:' ||
            hostname.includes('localhost') ||
            hostname.endsWith('.local')
        );
    }

    log(...args) {
        if (this.isDev) {
            console.log('[LifeLink]', ...args);
        }
    }

    warn(...args) {
        if (this.isDev) {
            console.warn('[LifeLink]', ...args);
        }
    }

    error(...args) {
        // Always log errors, even in production
        // But with more controlled format
        if (this.isDev) {
            console.error('[LifeLink ERROR]', ...args);
        } else {
            // In production, still log to console for debugging
            // but without revealing sensitive implementation details
            console.error('[LifeLink] An error occurred. Check browser console in dev mode for details.');
            // Optionally send to error tracking service here
        }
    }

    info(...args) {
        if (this.isDev) {
            console.info('[LifeLink INFO]', ...args);
        }
    }

    table(data) {
        if (this.isDev && console.table) {
            console.table(data);
        }
    }

    group(label) {
        if (this.isDev && console.group) {
            console.group(label);
        }
    }

    groupEnd() {
        if (this.isDev && console.groupEnd) {
            console.groupEnd();
        }
    }

    // For critical errors that should ALWAYS be visible
    critical(...args) {
        console.error('[LifeLink CRITICAL]', ...args);
    }
}

// Create singleton instance
const debug = new DebugLogger();

// Export for ES6 modules
export { debug };

// Also attach to window for non-module scripts
if (typeof window !== 'undefined') {
    window.debug = debug;
}
