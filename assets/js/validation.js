/**
 * Form Validation Utility for LifeLink
 * Provides validation for all form inputs
 */

const ValidationRules = {
    // Email validation
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? null : 'Invalid email address';
    },

    // Bangladesh phone number validation
    phone: (value) => {
        // Remove +88 prefix if exists
        const cleaned = value.replace(/^\+88/, '').replace(/\s/g, '');
        const regex = /^01[3-9]\d{8}$/;
        return regex.test(cleaned) ? null : 'Invalid Bangladesh phone number (01XXXXXXXXX)';
    },

    // Password validation
    password: (value) => {
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (value.length > 50) return 'Password too long (max 50 characters)';
        return null;
    },

    // Name validation
    name: (value) => {
        if (!value || value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.length > 100) return 'Name too long (max 100 characters)';
        return null;
    },

    // Blood group validation
    bloodGroup: (value) => {
        const valid = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return valid.includes(value) ? null : 'Invalid blood group';
    },

    // Weight validation (for donors)
    weight: (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return 'Weight must be a number';
        if (num < 45) return 'Minimum weight requirement is 45 kg';
        if (num > 200) return 'Please enter a valid weight';
        return null;
    },

    // Age validation
    age: (value) => {
        const num = parseInt(value);
        if (isNaN(num)) return 'Age must be a number';
        if (num < 1) return 'Invalid age';
        if (num > 120) return 'Please enter a valid age';
        return null;
    },

    // Date validation (past dates only)
    pastDate: (value) => {
        if (!value) return null; // Optional field
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date > today) return 'Date cannot be in the future';
        return null;
    },

    // Date of birth validation
    dob: (value) => {
        if (!value) return 'Date of birth is required';
        const date = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        if (age < 18) return 'Must be at least 18 years old';
        if (age > 100) return 'Please enter a valid date of birth';
        return null;
    },

    // Required field validation
    required: (value) => {
        return value && value.trim() ? null : 'This field is required';
    },

    // URL validation
    url: (value) => {
        if (!value) return null; // Optional
        try {
            new URL(value);
            return null;
        } catch {
            return 'Invalid URL format';
        }
    }
};

/**
 * Validate a single field
 * @param {string} type - Validation type
 * @param {any} value - Field value
 * @returns {string|null} - Error message or null
 */
export const validateField = (type, value) => {
    const validator = ValidationRules[type];
    return validator ? validator(value) : null;
};

/**
 * Validate entire form
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules object
 * @returns {Object} - { valid: boolean, errors: {} }
 */
export const validateForm = (formData, rules) => {
    const errors = {};
    let valid = true;

    for (const [field, ruleTypes] of Object.entries(rules)) {
        const value = formData[field];
        
        for (const ruleType of ruleTypes) {
            const error = validateField(ruleType, value);
            if (error) {
                errors[field] = error;
                valid = false;
                break; // Stop at first error for this field
            }
        }
    }

    return { valid, errors };
};

/**
 * Show error message on input field
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
export const showFieldError = (input, message) => {
    // Remove existing error
    clearFieldError(input);

    // Add error styling
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-slate-100', 'dark:border-slate-700');

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-xs mt-1 flex items-center gap-1';
    errorDiv.innerHTML = `
        <span class="material-symbols-outlined text-sm">error</span>
        <span>${message}</span>
    `;
    errorDiv.setAttribute('data-error-for', input.id || input.name);

    // Insert after input or its parent
    const parent = input.parentElement;
    parent.insertAdjacentElement('afterend', errorDiv);
};

/**
 * Clear error message from input field
 * @param {HTMLElement} input - Input element
 */
export const clearFieldError = (input) => {
    // Remove error styling
    input.classList.remove('border-red-500', 'focus:border-red-500');
    input.classList.add('border-slate-100', 'dark:border-slate-700');

    // Remove error message
    const errorDiv = document.querySelector(`[data-error-for="${input.id || input.name}"]`);
    if (errorDiv) errorDiv.remove();
};

/**
 * Real-time validation on input
 * @param {HTMLElement} input - Input element
 * @param {string} validationType - Validation type
 */
export const setupRealtimeValidation = (input, validationType) => {
    input.addEventListener('blur', () => {
        const error = validateField(validationType, input.value);
        if (error) {
            showFieldError(input, error);
        } else {
            clearFieldError(input);
        }
    });

    input.addEventListener('input', () => {
        // Clear error on typing
        if (input.classList.contains('border-red-500')) {
            clearFieldError(input);
        }
    });
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
};

/**
 * Format Bangladesh phone number
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone (+88XXXXXXXXXXX)
 */
export const formatBDPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('88')) return '+' + cleaned;
    if (cleaned.startsWith('0')) return '+88' + cleaned.substring(1);
    return '+88' + cleaned;
};
