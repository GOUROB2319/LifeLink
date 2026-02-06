# Google Sign-in সমস্যার সমাধান

## ✅ যা করা হয়েছে:

1. **CSP Fixed** - Google Analytics যোগ করা হয়েছে
2. **Popup Method** - Redirect এর বদলে Popup ব্যবহার করা হচ্ছে
3. **Better Error Handling** - Console এ error দেখাবে

---

## 🔧 আপনাকে যা করতে হবে:

### Step 1: Firebase Console এ Authorized Domains যোগ করুন

1. যান: https://console.firebase.google.com/
2. আপনার project select করুন: **lifelink-295e7**
3. বাম পাশে **Authentication** ক্লিক করুন
4. উপরে **Settings** tab ক্লিক করুন
5. নিচে scroll করে **Authorized domains** section খুঁজুন
6. **Add domain** button ক্লিক করুন
7. এই domains যোগ করুন:

```
localhost
127.0.0.1
```

8. **Save** করুন

---

### Step 2: Browser Cache Clear করুন

1. **Ctrl + Shift + Delete** চাপুন
2. **Cached images and files** select করুন
3. **Clear data** ক্লিক করুন

---

### Step 3: Test করুন

1. Browser বন্ধ করে আবার খুলুন
2. `auth/login.html` বা `auth/register.html` খুলুন
3. **Continue with Google** button ক্লিক করুন
4. Popup window আসবে
5. Google account select করুন
6. Allow করুন

---

## 🐛 যদি এখনও কাজ না করে:

### Check 1: Console Error দেখুন
```
F12 → Console tab
```

যদি দেখেন:
- `auth/unauthorized-domain` → Firebase এ domain add করেননি
- `auth/popup-blocked` → Browser popup allow করুন
- `CSP violation` → আমার fix কাজ করেনি

### Check 2: Popup Blocker
```
Chrome: Settings → Privacy → Site Settings → Pop-ups
Allow: localhost, 127.0.0.1
```

### Check 3: Firebase Authentication Enable
```
Firebase Console → Authentication → Sign-in method
Google: Enabled হতে হবে
```

---

## 📝 কেন এই সমস্যা হয়েছিল:

1. **CSP Block** - Google Analytics blocked ছিল
2. **Redirect Method** - Redirect reliable নয়, Popup better
3. **Authorized Domains** - Firebase এ domain add করা ছিল না

---

## ✅ এখন কী হবে:

1. Popup window খুলবে
2. Google account select করবেন
3. Automatically login হবে
4. Onboarding page এ redirect হবে

---

## 🆘 যদি সমস্যা থাকে:

Console এর screenshot পাঠান, আমি দেখব কী error আসছে।
