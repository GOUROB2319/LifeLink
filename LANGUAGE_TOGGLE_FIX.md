# ভাষা টগল সমস্যা সমাধান

## সমস্যা
পুরো পেজে কোথাও বাংলা/ইংরেজি টগল বাটন কাজ করছিল না।

## সমাধান

### ✅ ফিক্স ১: Global toggleLanguage ফাংশন
**ফাইল:** `assets/js/localization.js`

```javascript
// নিশ্চিত করা হয়েছে যে toggleLanguage global scope-এ আছে
window.toggleLanguage = () => {
    if (window.localization) {
        window.localization.toggleLanguage();
    }
};
```

### ✅ ফিক্স ২: Navbar Event Listener
**ফাইল:** `assets/js/components.js`

```javascript
// Language toggle button-এ proper event listener যোগ করা হয়েছে
const langBtn = this.querySelector('#lang-toggle-btn');
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.toggleLanguage) {
            window.toggleLanguage();
        } else if (window.localization) {
            window.localization.toggleLanguage();
        }
    });
}
```

### ✅ ফিক্স ৩: Script Loading Order
নিশ্চিত করা হয়েছে যে `localization.js` সব পেজে লোড হচ্ছে:
- index.html ✅
- auth/login.html ✅
- auth/register.html ✅
- dashboard/settings.html ✅
- onboarding/step1.html ✅

## টেস্ট করার পদ্ধতি

### পদ্ধতি ১: Test Page ব্যবহার করুন
1. ব্রাউজারে খুলুন: `test-language.html`
2. "Check Status" বাটনে ক্লিক করুন
3. নিশ্চিত করুন:
   - `window.localization exists: true`
   - `window.toggleLanguage exists: true`
   - `Current language: en` (বা `bn`)

### পদ্ধতি ২: যেকোনো পেজে টেস্ট করুন
1. যেকোনো পেজ খুলুন (যেমন: index.html)
2. Browser Console খুলুন (F12)
3. টাইপ করুন: `window.toggleLanguage()`
4. Enter চাপুন
5. পেজের সব টেক্সট বাংলায় পরিবর্তন হবে

### পদ্ধতি ৩: Navbar Button ক্লিক করুন
1. যেকোনো পেজ খুলুন
2. উপরের navbar-এ language toggle button খুঁজুন (EN/BN)
3. ক্লিক করুন
4. সব টেক্সট বাংলায় পরিবর্তন হবে
5. আবার ক্লিক করুন - ইংরেজিতে ফিরে আসবে

## Troubleshooting

### যদি এখনও কাজ না করে:

#### ১. Console Error চেক করুন
```javascript
// Browser Console-এ (F12) টাইপ করুন:
console.log('Localization:', window.localization);
console.log('Toggle Function:', window.toggleLanguage);
console.log('Current Lang:', window.localization?.currentLang);
```

#### ২. Script Loading চেক করুন
```javascript
// Console-এ টাইপ করুন:
document.querySelectorAll('script[src*="localization"]');
// Result: একটি script element দেখাবে
```

#### ৩. Manual Toggle চেষ্টা করুন
```javascript
// Console-এ টাইপ করুন:
if (window.localization) {
    window.localization.toggleLanguage();
} else {
    console.error('Localization not loaded!');
}
```

## পরিবর্তিত ফাইল

1. ✅ `assets/js/localization.js` - Global function ঠিক করা
2. ✅ `assets/js/components.js` - Event listener উন্নত করা
3. ✅ `test-language.html` - Test page তৈরি করা (নতুন)

## যাচাই করার চেকলিস্ট

- [ ] index.html-এ language toggle কাজ করছে
- [ ] auth/login.html-এ language toggle কাজ করছে
- [ ] auth/register.html-এ language toggle কাজ করছে
- [ ] onboarding/step1.html-এ language toggle কাজ করছে
- [ ] dashboard/settings.html-এ language toggle কাজ করছে
- [ ] Language পরিবর্তন করার পর reload করলে language persist করছে
- [ ] Console-এ কোনো error নেই

## প্রত্যাশিত আচরণ

### ক্লিক করার পর:
1. Button text পরিবর্তন হবে (EN → BN বা BN → EN)
2. পেজের সব `data-i18n` attribute যুক্ত element-এর text পরিবর্তন হবে
3. localStorage-এ language সেভ হবে
4. Page reload করলে selected language থাকবে

### Example:
```
Before: "Join LifeLink"
After:  "লাইফলিংকে যোগ দিন"
```

## সফলতার মাপকাঠি

✅ সব পেজে language toggle button visible
✅ Button ক্লিক করলে language পরিবর্তন হচ্ছে
✅ সব translated text সঠিকভাবে দেখাচ্ছে
✅ Language preference persist করছে
✅ Console-এ কোনো error নেই
