/**
 * Notification Service (100% Free - Browser API)
 * No API keys or payment required
 */

/**
 * Request notification permission
 * @returns {Promise<string>} - Permission state
 */
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        return 'unsupported';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return Notification.permission;
};

/**
 * Show browser notification
 * @param {string} title - Notification title
 * @param {Object} options - Notification options
 */
export const showNotification = (title, options = {}) => {
    if (!('Notification' in window)) {
        console.warn('Notifications not supported');
        return;
    }

    if (Notification.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
    }

    const defaultOptions = {
        icon: '/assets/images/lifelink-logo.svg',
        badge: '/assets/images/favicon.svg',
        vibrate: [200, 100, 200],
        requireInteraction: false,
        ...options
    };

    const notification = new Notification(title, defaultOptions);

    notification.onclick = () => {
        window.focus();
        notification.close();
        if (options.onClick) options.onClick();
    };

    return notification;
};

/**
 * Show emergency notification
 * @param {Object} request - Emergency request data
 */
export const showEmergencyNotification = (request) => {
    showNotification('🚨 Emergency Blood Request', {
        body: `${request.bloodGroup} needed urgently at ${request.hospital || 'nearby hospital'}`,
        tag: 'emergency',
        requireInteraction: true,
        actions: [
            { action: 'view', title: 'View Details' },
            { action: 'close', title: 'Dismiss' }
        ],
        onClick: () => {
            window.location.href = `/dashboard/emergency.html?id=${request.id}`;
        }
    });
};

/**
 * Show appointment reminder
 * @param {Object} appointment - Appointment data
 */
export const showAppointmentReminder = (appointment) => {
    showNotification('📅 Appointment Reminder', {
        body: `Your appointment with ${appointment.doctorName} is in 1 hour`,
        tag: 'appointment',
        onClick: () => {
            window.location.href = '/dashboard/patient_dashboard.html';
        }
    });
};

/**
 * Show donation success notification
 * @param {Object} donation - Donation data
 */
export const showDonationSuccess = (donation) => {
    showNotification('✅ Donation Recorded', {
        body: `Thank you for donating ${donation.bloodGroup}! You've saved a life.`,
        tag: 'donation',
        onClick: () => {
            window.location.href = '/dashboard/donor.html';
        }
    });
};

/**
 * Schedule notification (using setTimeout)
 * @param {string} title - Title
 * @param {Object} options - Options
 * @param {number} delay - Delay in milliseconds
 */
export const scheduleNotification = (title, options, delay) => {
    return setTimeout(() => {
        showNotification(title, options);
    }, delay);
};

/**
 * Check if notifications are supported
 * @returns {boolean}
 */
export const isNotificationSupported = () => {
    return 'Notification' in window;
};

/**
 * Get notification permission status
 * @returns {string} - 'granted', 'denied', 'default', 'unsupported'
 */
export const getNotificationPermission = () => {
    if (!isNotificationSupported()) return 'unsupported';
    return Notification.permission;
};

/**
 * Initialize notification system
 */
export const initNotifications = async () => {
    if (!isNotificationSupported()) {
        console.warn('Notifications not supported in this browser');
        return false;
    }

    const permission = await requestNotificationPermission();
    
    if (permission === 'granted') {
        console.log('Notifications enabled');
        return true;
    } else {
        console.log('Notifications permission:', permission);
        return false;
    }
};

// Auto-initialize on load
if (typeof window !== 'undefined') {
    // Don't auto-request, let user trigger it
    console.log('Notification service loaded');
}
