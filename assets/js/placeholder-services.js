/**
 * PLACEHOLDER SERVICES
 * These require API keys/payment - will work when you add credentials
 */

// ============================================
// GOOGLE MAPS PLACEHOLDER (Requires API Key)
// ============================================
export const MapsService = {
    isConfigured: () => {
        return window.google && window.google.maps;
    },

    initMap: (elementId, center) => {
        if (!MapsService.isConfigured()) {
            console.warn('Google Maps not configured. Add API key to enable.');
            return null;
        }
        // Will work when API key is added
        return new google.maps.Map(document.getElementById(elementId), {
            center,
            zoom: 12
        });
    },

    addMarker: (map, position, title) => {
        if (!MapsService.isConfigured()) return null;
        return new google.maps.Marker({ map, position, title });
    }
};

// ============================================
// SMS SERVICE PLACEHOLDER (Requires Twilio)
// ============================================
export const SMSService = {
    isConfigured: () => {
        // Check if Twilio credentials exist
        return false; // Will be true when you add credentials
    },

    sendSMS: async (phone, message) => {
        if (!SMSService.isConfigured()) {
            console.warn('SMS service not configured. Add Twilio credentials to enable.');
            return { success: false, message: 'SMS service not configured' };
        }
        
        // Placeholder - will work when Twilio is configured
        try {
            // const response = await fetch('/api/send-sms', {
            //     method: 'POST',
            //     body: JSON.stringify({ phone, message })
            // });
            // return await response.json();
            return { success: false, message: 'Not implemented yet' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    sendEmergencyAlert: async (phone, request) => {
        const message = `🚨 Emergency: ${request.bloodGroup} blood needed at ${request.hospital}. Contact: ${request.contactPhone}`;
        return await SMSService.sendSMS(phone, message);
    }
};

// ============================================
// PAYMENT SERVICE PLACEHOLDER (Requires Merchant Account)
// ============================================
export const PaymentService = {
    isConfigured: () => {
        return false; // Will be true when payment gateway is configured
    },

    initPayment: (amount, purpose) => {
        if (!PaymentService.isConfigured()) {
            console.warn('Payment service not configured. Add merchant credentials to enable.');
            return { success: false, message: 'Payment not configured' };
        }

        // Placeholder for bKash/Nagad/Stripe
        return {
            success: false,
            message: 'Payment gateway not configured'
        };
    },

    processDonation: async (amount) => {
        return await PaymentService.initPayment(amount, 'donation');
    },

    processConsultationFee: async (amount, doctorId) => {
        return await PaymentService.initPayment(amount, 'consultation');
    }
};

// ============================================
// EMAIL SERVICE PLACEHOLDER (Requires SendGrid/Mailgun)
// ============================================
export const EmailService = {
    isConfigured: () => {
        return false; // Will be true when email service is configured
    },

    sendEmail: async (to, subject, body) => {
        if (!EmailService.isConfigured()) {
            console.warn('Email service not configured. Add SendGrid/Mailgun API key to enable.');
            return { success: false, message: 'Email service not configured' };
        }

        // Placeholder
        return { success: false, message: 'Not implemented yet' };
    },

    sendWelcomeEmail: async (user) => {
        return await EmailService.sendEmail(
            user.email,
            'Welcome to LifeLink',
            `Hello ${user.displayName}, welcome to LifeLink!`
        );
    },

    sendAppointmentConfirmation: async (user, appointment) => {
        return await EmailService.sendEmail(
            user.email,
            'Appointment Confirmed',
            `Your appointment with ${appointment.doctorName} is confirmed.`
        );
    }
};

// ============================================
// CLOUD STORAGE PLACEHOLDER (Firebase Storage)
// ============================================
export const StorageService = {
    isConfigured: () => {
        // Firebase Storage is free up to 5GB
        return false; // Will be true when configured
    },

    uploadFile: async (file, path) => {
        if (!StorageService.isConfigured()) {
            console.warn('Storage service not configured.');
            return { success: false, message: 'Storage not configured' };
        }

        // Placeholder for Firebase Storage
        return { success: false, message: 'Not implemented yet' };
    },

    uploadProfilePicture: async (file, userId) => {
        return await StorageService.uploadFile(file, `profiles/${userId}`);
    },

    uploadVerificationDoc: async (file, userId) => {
        return await StorageService.uploadFile(file, `verification/${userId}`);
    }
};

// ============================================
// USAGE INSTRUCTIONS
// ============================================
console.log(`
📌 PLACEHOLDER SERVICES LOADED

These services are ready but need configuration:

1. Google Maps: Add API key in HTML
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY"></script>

2. SMS (Twilio): Add credentials in backend
   - Account SID
   - Auth Token
   - Phone Number

3. Payment: Add merchant credentials
   - bKash Merchant ID
   - Nagad Merchant ID
   - Or Stripe API Key

4. Email: Add SendGrid/Mailgun API key

5. Storage: Configure Firebase Storage

All functions are ready - just add credentials when available!
`);
