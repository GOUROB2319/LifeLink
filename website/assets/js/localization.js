const translations = {
    en: {
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.howItWorks": "How it Works",
        "nav.impact": "Impact",
        "nav.about": "About Us",
        "nav.login": "Login",
        "nav.join": "Join LifeLink",
        "hero.badge": "Reliable Healthcare Network",
        "hero.title": "Connecting Lives in Every <span class='text-emergency'>Heartbeat</span>",
        "hero.subtitle": "LifeLink is the professional bridge connecting donors, patients, and hospitals. Our mission is to streamline blood donations and medical assistance.",
        "hero.cta.emergency": "Emergency Blood Request",
        "hero.cta.find_doctor": "Find a Doctor",
        "trust.label": "Trusted by Global Healthcare Leaders",
        "process.title": "How It Works",
        "process.step1.title": "1. Register",
        "process.step1.desc": "Create your profile as a donor, hospital, or patient to access our network.",
        "process.step2.title": "2. Request",
        "process.step2.desc": "Submit a request for blood or medical consultation through our portal.",
        "process.step3.title": "3. Match",
        "process.step3.desc": "Our AI-driven system finds the nearest compatible donor or specialist.",
        "process.step4.title": "4. Save",
        "process.step4.desc": "The connection is made, lives are saved, and records are updated securely.",
        "stats.donated": "Units Donated",
        "stats.saved": "Lives Saved",
        "stats.hospitals": "Partner Hospitals",
        "testimonials.title": "Patient & Donor Stories",
        "testimonials.subtitle": "Real experiences from our community members who have been part of the LifeLink mission.",
        "footer.tagline": "The professional bridge between medical resources and human needs. Available 24/7 for emergency support.",
        "footer.platform": "Platform",
        "footer.resources": "Resources",
        "footer.contact": "Contact"
    },
    bn: {
        "nav.home": "হোম",
        "nav.services": "সেবাসমূহ",
        "nav.howItWorks": "কিভাবে কাজ করে",
        "nav.impact": "প্রভাব",
        "nav.about": "আমাদের সম্পর্কে",
        "nav.login": "লগইন",
        "nav.join": "লাইফলিংকে যোগ দিন",
        "hero.badge": "নির্ভরযোগ্য স্বাস্থ্যসেবা নেটওয়ার্ক",
        "hero.title": "প্রতিটি <span class='text-emergency'>স্পন্দনে</span> জীবন সংযুক্ত করা",
        "hero.subtitle": "লাইফলিংক হল ডোনার, রোগী এবং হাসপাতালের মধ্যে সংযোগ স্থাপনকারী পেশাদার সেতু। আমাদের লক্ষ্য রক্তদান এবং চিকিৎসা সহায়তা সহজতর করা।",
        "hero.cta.emergency": "জরুরী রক্তের অনুরোধ",
        "hero.cta.find_doctor": "ডাক্তার খুঁজুন",
        "trust.label": "বিশ্বসেরা স্বাস্থ্যসেবা প্রতিষ্ঠান দ্বারা বিশ্বস্ত",
        "process.title": "কিভাবে কাজ করে",
        "process.step1.title": "১. নিবন্ধন করুন",
        "process.step1.desc": "আমাদের নেটওয়ার্ক অ্যাক্সেস করতে ডোনার, হাসপাতাল বা রোগী হিসেবে আপনার প্রোফাইল তৈরি করুন।",
        "process.step2.title": "২. অনুরোধ করুন",
        "process.step2.desc": "আমাদের পোর্টালের মাধ্যমে রক্ত বা চিকিৎসা পরামর্শের জন্য অনুরোধ জমা দিন।",
        "process.step3.title": "৩. ম্যাচিং",
        "process.step3.desc": "আমাদের এআই-চালিত সিস্টেম নিকটতম উপযুক্ত ডোনার বা বিশেষজ্ঞ খুঁজে বের করে।",
        "process.step4.title": "৪. জীবন বাঁচান",
        "process.step4.desc": "সংযোগ তৈরি হয়, জীবন রক্ষা পায় এবং রেকর্ড নিরাপদে আপডেট করা হয়।",
        "stats.donated": "ইউনিট রক্তদান",
        "stats.saved": "জীবন রক্ষা পেয়েছে",
        "stats.hospitals": "পার্টনার হাসপাতাল",
        "testimonials.title": "রোগী ও ডোনারদের গল্প",
        "testimonials.subtitle": "আমাদের কমিউনিটির সদস্যদের বাস্তব অভিজ্ঞতা যারা লাইফলিংক মিশনের অংশ হয়েছেন।",
        "footer.tagline": "চিকিৎসা সম্পদ এবং মানুষের প্রয়োজনের মধ্যে পেশাদার সেতু। জরুরী সহায়তার জন্য ২৪/৭ উপলব্ধ।",
        "footer.platform": "প্ল্যাটফর্ম",
        "footer.resources": "রিসোর্স",
        "footer.contact": "যোগাযোগ"
    }
};

class LocalizationManager {
    constructor() {
        this.currentLang = localStorage.getItem('lifelink_lang') || 'en';
        this.init();
    }

    init() {
        this.updateDOM();
        this.setupEventListeners();
    }

    setLanguage(lang) {
        if (!translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('lifelink_lang', lang);
        this.updateDOM();

        // Update document dir and lang attributes if needed
        document.documentElement.lang = lang;
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'bn' : 'en';
        this.setLanguage(newLang);
        return newLang;
    }

    updateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.currentLang][key]) {
                // Check if element has child nodes (to preserve icons etc)
                // For simple text replacement
                if (el.children.length === 0) {
                    el.textContent = translations[this.currentLang][key];
                } else {
                    el.innerHTML = translations[this.currentLang][key];
                }
            }
        });

        // Update Toggle Button Text
        const toggleBtn = document.getElementById('lang-toggle-text');
        if (toggleBtn) {
            toggleBtn.textContent = this.currentLang === 'en' ? 'BN' : 'EN';
        }
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Auto-detect location for first time visitors (Mock logic)
            if (!localStorage.getItem('lifelink_lang')) {
                // In a real app, check navigator.language or IP
                // For this demo, enable BN by default if requested, otherwise EN
            }
        });
    }
}

window.localization = new LocalizationManager();

// Global function for button
window.toggleLanguage = () => {
    window.localization.toggleLanguage();
};
