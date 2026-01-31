// LifeLink Core JavaScript

// Firebase UI Simulation - Real-time counter animation
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 16);
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate statistics counters
    const unitsCounter = document.getElementById('units-counter');
    const livesCounter = document.getElementById('lives-counter');
    const hospitalsCounter = document.getElementById('hospitals-counter');
    
    if (unitsCounter) animateCounter(unitsCounter, 15420);
    if (livesCounter) animateCounter(livesCounter, 8932);
    if (hospitalsCounter) animateCounter(hospitalsCounter, 450);
    
    // Real-time donor count simulation
    const donorCount = document.getElementById('donor-count');
    if (donorCount) {
        setInterval(() => {
            const current = parseInt(donorCount.textContent);
            const change = Math.random() > 0.5 ? 1 : -1;
            donorCount.textContent = Math.max(8, current + change);
        }, 5000);
    }
    
    // Live status indicator pulse
    const liveIndicators = document.querySelectorAll('.live-pulse');
    liveIndicators.forEach(indicator => {
        setInterval(() => {
            indicator.style.opacity = indicator.style.opacity === '0.3' ? '1' : '0.3';
        }, 1000);
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Blood type selector handler
function selectBloodType(bloodType) {
    console.log('Selected blood type:', bloodType);
    // Update UI to show selected state
    document.querySelectorAll('[data-blood-type]').forEach(btn => {
        btn.classList.remove('border-primary', 'bg-primary/10');
    });
    event.target.closest('[data-blood-type]').classList.add('border-primary', 'bg-primary/10');
}

// Emergency request submission
function submitEmergencyRequest(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Broadcasting...';
    submitBtn.disabled = true;
    
    // Simulate network request
    setTimeout(() => {
        submitBtn.textContent = '✓ Request Sent';
        submitBtn.classList.add('bg-green-600');
        
        // Redirect to success page after delay
        setTimeout(() => {
            window.location.href = 'donation-success.html';
        }, 1500);
    }, 2000);
}

// Availability toggle
function toggleAvailability(checkbox) {
    const status = checkbox.checked ? 'Available' : 'Unavailable';
    console.log('Donor status:', status);
    
    // Update local storage
    localStorage.setItem('donorAvailability', checkbox.checked);
    
    // Show notification
    showNotification(`You are now ${status.toLowerCase()} for emergency requests`);
}

// Show notification (toast)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Dark mode toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}

// OAuth button handlers (visual feedback only)
function handleGoogleSignIn() {
    showNotification('Redirecting to Google Sign-In...', 'info');
    setTimeout(() => {
        // In real implementation, this would redirect to Google OAuth
        console.log('Google OAuth would be triggered here');
    }, 1000);
}

function handlePhoneSignIn() {
    showNotification('Phone authentication coming soon', 'info');
}

// Search functionality
function handleSearch(query) {
    console.log('Searching for:', query);
    // In real implementation, this would filter results
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Export functions for HTML onclick handlers
window.selectBloodType = selectBloodType;
window.submitEmergencyRequest = submitEmergencyRequest;
window.toggleAvailability = toggleAvailability;
window.toggleDarkMode = toggleDarkMode;
window.handleGoogleSignIn = handleGoogleSignIn;
window.handlePhoneSignIn = handlePhoneSignIn;
window.handleSearch = handleSearch;
window.toggleMobileMenu = toggleMobileMenu;
window.validateForm = validateForm;
