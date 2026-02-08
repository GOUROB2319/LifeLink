# 🚀 LIFELINK BD - QUICK START GUIDE

## For Developers Continuing This Project

### 📁 Project Structure

```
public/
├── assets/js/core/      → Core systems (theme, i18n, firebase, auth, db)
├── assets/js/components/ → UI components (navbar, footer)
├── assets/js/app.js     → Main entry point
├── assets/css/main.css  → Styles
├── auth/                → Login, Register pages
├── dashboard/           → Role-based dashboards (TO BE CREATED)
└── info/                → About, Contact, etc. (TO BE CREATED)
```

### 🎨 Using the Theme System

```javascript
// Theme auto-initializes via app.js
// Add toggle button anywhere:
<button data-theme-toggle>
  <span class="material-symbols-outlined">dark_mode</span>
</button>

// Programmatic access:
import { themeController } from './core/theme.js';
themeController.toggle();
```

### 🌐 Using the Language System

```javascript
// Add translation key to any element:
<h1 data-i18n="hero.title">Default Text</h1>

// Add toggle button:
<button data-lang-toggle>
  <span class="lang-text">বাংলা</span>
</button>

// Add new translations in i18n.js:
translations.en.newSection = { key: 'value' };
translations.bn.newSection = { key: 'মান' };
```

### 🔐 Using Authentication

```javascript
import { authService } from './core/auth.js';

// Login
const result = await authService.loginWithEmail(email, password);
if (result.success) {
  // Redirect to dashboard
}

// Register
const result = await authService.registerWithEmail(email, password, name);

// Google OAuth
const result = await authService.loginWithGoogle();

// Logout
await authService.logout();

// Listen to auth changes
authService.onAuthChange((user) => {
  if (user) {
    // User logged in
  } else {
    // User logged out
  }
});
```

### 💾 Using Database

```javascript
import { dbService } from './core/db.js';

// Create user profile
await dbService.createUser(uid, {
  email: 'user@example.com',
  role: 'patient',
  bloodGroup: 'A+',
  ...
});

// Get user
const result = await dbService.getUser(uid);
if (result.success) {
  console.log(result.data);
}

// Create blood request
await dbService.createRequest({
  userId: uid,
  bloodGroup: 'A+',
  priority: 'urgent',
  hospital: 'Hospital Name',
  ...
});

// Get donors
const result = await dbService.getDonors('A+', 'Dhaka');
```

### 🎨 Using CSS Classes

```html
<!-- Buttons -->
<button class="btn-primary">Primary Action</button>
<button class="btn-secondary">Secondary Action</button>
<button class="btn-emergency">Emergency</button>

<!-- Cards -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<!-- Inputs -->
<input type="text" class="input-field" placeholder="Enter text">

<!-- Glass Effect -->
<div class="glass">Glassmorphism</div>

<!-- Gradient Text -->
<h1 class="text-gradient">Gradient Text</h1>
```

### 📄 Creating New Pages

1. **Copy template structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - LifeLink</title>
  
  <!-- Theme no-flash script -->
  <script>
    (function() {
      const theme = localStorage.getItem('lifelink-theme') || 'light';
      if (theme === 'dark') document.documentElement.classList.add('dark');
    })();
  </script>
  
  <!-- Fonts & Styles -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap" rel="stylesheet">
  <link href="../assets/css/main.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { colors: { primary: { DEFAULT: '#10B981', dark: '#059669' } } } }
    }
  </script>
</head>
<body class="bg-aurora text-slate-800 dark:text-slate-100">
  
  <!-- Navbar -->
  <div id="navbar"></div>

  <!-- Main Content -->
  <main class="pt-20">
    <!-- Your content here -->
  </main>

  <!-- Footer -->
  <div id="footer"></div>

  <!-- Scripts -->
  <script type="module" src="../assets/js/app.js"></script>
</body>
</html>
```

2. **Add translations to i18n.js**
3. **Test theme and language toggles**

### 🔒 Protected Routes

```javascript
// Add to any dashboard page:
<script type="module">
  import { authService } from '../assets/js/core/auth.js';
  
  authService.onAuthChange((user) => {
    if (!user) {
      window.location.href = '../auth/login.html';
    }
  });
</script>
```

### 📱 Making Components

```javascript
// In components/ folder:
export function createMyComponent(props) {
  return `
    <div class="my-component">
      <h3 data-i18n="component.title">${props.title}</h3>
      <p>${props.content}</p>
    </div>
  `;
}

export function initMyComponent() {
  const container = document.getElementById('my-component');
  if (container) {
    container.innerHTML = createMyComponent({ title: 'Title', content: 'Content' });
  }
}
```

### 🐛 Debugging Tips

```javascript
// Check theme
console.log(localStorage.getItem('lifelink-theme'));

// Check language
console.log(localStorage.getItem('lifelink-lang'));

// Check auth state
import { authService } from './core/auth.js';
console.log(authService.getCurrentUser());

// Check Firestore connection
import { db } from './core/firebase.js';
console.log(db);
```

### ✅ Before Committing

- [ ] Test theme toggle
- [ ] Test language toggle
- [ ] Test on mobile
- [ ] Check console for errors
- [ ] Verify all links work
- [ ] Test auth flow if applicable

### 🚀 Deployment

```bash
# Build CSS (when ready)
npm run build:css

# Test locally
npx serve public

# Deploy to Firebase
firebase deploy
```

### 📞 Need Help?

- Check `REBUILD_COMPLETE.md` for full documentation
- Review existing pages for patterns
- All systems are in `assets/js/core/`
- All components are in `assets/js/components/`

---

**Remember**: Keep it simple. Follow existing patterns. Test thoroughly.
