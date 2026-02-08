// i18n System - Language Management
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      emergency: 'Emergency',
      directory: 'Directory',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    hero: {
      badge: 'Reliable Healthcare Network',
      title: 'Connecting Lives in Every Heartbeat',
      subtitle: 'LifeLink is the professional bridge connecting donors, patients, and hospitals. Our mission is to streamline blood donations and medical assistance.',
      cta: {
        join: 'Join LifeLink',
        emergency: 'Emergency Request',
        findDoctor: 'Find a Doctor'
      }
    },
    stats: {
      donated: 'Units Donated',
      saved: 'Lives Saved',
      hospitals: 'Partner Hospitals'
    },
    footer: {
      tagline: 'Connecting lives, one heartbeat at a time',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      contact: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: 'All rights reserved'
    },
    auth: {
      loginTitle: 'Welcome Back',
      registerTitle: 'Create Account',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      googleLogin: 'Continue with Google',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      forgotPassword: 'Forgot Password?'
    },
    dashboard: {
      patient: 'Patient Dashboard',
      donor: 'Donor Dashboard',
      doctor: 'Doctor Dashboard',
      hospital: 'Hospital Dashboard',
      admin: 'Admin Dashboard',
      welcome: 'Welcome',
      profile: 'Profile',
      settings: 'Settings',
      requests: 'Requests',
      history: 'History'
    }
  },
  bn: {
    nav: {
      home: 'হোম',
      about: 'সম্পর্কে',
      services: 'সেবা',
      emergency: 'জরুরি',
      directory: 'ডিরেক্টরি',
      login: 'লগইন',
      register: 'নিবন্ধন',
      dashboard: 'ড্যাশবোর্ড',
      logout: 'লগআউট'
    },
    hero: {
      badge: 'নির্ভরযোগ্য স্বাস্থ্যসেবা নেটওয়ার্ক',
      title: 'প্রতিটি হৃদস্পন্দনে জীবন সংযুক্ত করা',
      subtitle: 'লাইফলিংক দাতা, রোগী এবং হাসপাতালকে সংযুক্ত করার পেশাদার সেতু। আমাদের লক্ষ্য রক্তদান এবং চিকিৎসা সহায়তা সহজ করা।',
      cta: {
        join: 'লাইফলিংকে যোগ দিন',
        emergency: 'জরুরি অনুরোধ',
        findDoctor: 'ডাক্তার খুঁজুন'
      }
    },
    stats: {
      donated: 'ইউনিট দান করা হয়েছে',
      saved: 'জীবন রক্ষা পেয়েছে',
      hospitals: 'অংশীদার হাসপাতাল'
    },
    footer: {
      tagline: 'জীবন সংযুক্ত করা, একটি হৃদস্পন্দনে',
      quickLinks: 'দ্রুত লিংক',
      legal: 'আইনি',
      contact: 'যোগাযোগ করুন',
      privacy: 'গোপনীয়তা নীতি',
      terms: 'সেবার শর্তাবলী',
      rights: 'সর্বস্বত্ব সংরক্ষিত'
    },
    auth: {
      loginTitle: 'স্বাগতম',
      registerTitle: 'অ্যাকাউন্ট তৈরি করুন',
      email: 'ইমেইল ঠিকানা',
      password: 'পাসওয়ার্ড',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      fullName: 'পূর্ণ নাম',
      phone: 'ফোন নম্বর',
      loginButton: 'সাইন ইন',
      registerButton: 'অ্যাকাউন্ট তৈরি করুন',
      googleLogin: 'Google দিয়ে চালিয়ে যান',
      noAccount: 'অ্যাকাউন্ট নেই?',
      hasAccount: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?'
    },
    dashboard: {
      patient: 'রোগী ড্যাশবোর্ড',
      donor: 'দাতা ড্যাশবোর্ড',
      doctor: 'ডাক্তার ড্যাশবোর্ড',
      hospital: 'হাসপাতাল ড্যাশবোর্ড',
      admin: 'অ্যাডমিন ড্যাশবোর্ড',
      welcome: 'স্বাগতম',
      profile: 'প্রোফাইল',
      settings: 'সেটিংস',
      requests: 'অনুরোধ',
      history: 'ইতিহাস'
    }
  }
};

class I18nController {
  constructor() {
    this.STORAGE_KEY = 'lifelink-lang';
    this.LANGUAGES = { EN: 'en', BN: 'bn' };
    this.currentLang = this.getStoredLang() || this.LANGUAGES.EN;
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.setupToggleListeners();
  }

  getStoredLang() {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  setStoredLang(lang) {
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    this.setStoredLang(lang);
    
    document.documentElement.lang = lang;
    document.body.classList.remove('lang-en', 'lang-bn');
    document.body.classList.add(`lang-${lang}`);
    
    this.translatePage();
    this.updateToggleButtons();
  }

  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
  }

  getTranslation(key) {
    const keys = key.split('.');
    let value = translations[this.currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  }

  toggle() {
    const newLang = this.currentLang === this.LANGUAGES.EN ? this.LANGUAGES.BN : this.LANGUAGES.EN;
    this.applyLanguage(newLang);
  }

  setupToggleListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-lang-toggle]')) {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  updateToggleButtons() {
    const buttons = document.querySelectorAll('[data-lang-toggle]');
    buttons.forEach(btn => {
      const text = btn.querySelector('.lang-text');
      if (text) {
        text.textContent = this.currentLang === this.LANGUAGES.EN ? 'বাংলা' : 'English';
      }
    });
  }
}

export const i18n = new I18nController();
export { translations };
