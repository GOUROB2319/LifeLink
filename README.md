# 🩺 LifeLink BD - Healthcare Platform

> **Professional healthcare platform connecting blood donors, patients, doctors, and hospitals across Bangladesh**

[![Status](https://img.shields.io/badge/Status-Rebuilt-success)]()
[![Firebase](https://img.shields.io/badge/Firebase-10.8.0-orange)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

---

## 🌟 Features

### Core Functionality
- ✅ **Theme System**: Light/Dark mode with no flash
- ✅ **Language Support**: Full English & Bengali (বাংলা)
- ✅ **Authentication**: Email/Password + Google OAuth
- ✅ **Role-Based Access**: Patient, Donor, Doctor, Hospital, Admin
- ⏳ **Blood Requests**: Emergency blood donation system
- ⏳ **Medical Directory**: Search doctors and hospitals
- ⏳ **Donor Management**: Track donations and availability
- ⏳ **PWA Support**: Offline-capable, installable

### Technical Features
- Modern ES6+ JavaScript (no frameworks)
- Tailwind CSS with dark mode
- Firebase Authentication & Firestore
- Responsive, mobile-first design
- Accessibility compliant (WCAG AA)
- Progressive Web App ready

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (for build tools)
- Firebase account
- Modern web browser

### Installation

```bash
# Clone repository
git clone <repository-url>
cd LifeLink

# Install dependencies
npm install

# Serve locally
npx serve public
# or
python -m http.server 8000 --directory public
```

### Firebase Setup

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password, Google)
3. Create Firestore database
4. Update `public/assets/js/core/firebase.js` with your config

---

## 📁 Project Structure

```
public/
├── index.html                    # Landing page
├── assets/
│   ├── css/
│   │   └── main.css              # Styles
│   ├── js/
│   │   ├── core/                 # Core systems
│   │   │   ├── firebase.js       # Firebase initialization
│   │   │   ├── auth.js           # Authentication service
│   │   │   ├── db.js             # Database operations
│   │   │   ├── theme.js          # Theme controller
│   │   │   └── i18n.js           # Language system
│   │   ├── components/           # UI components
│   │   │   ├── navbar.js         # Navigation bar
│   │   │   └── footer.js         # Footer
│   │   └── app.js                # Main entry point
│   ├── images/                   # Images and icons
│   └── fonts/                    # Custom fonts
├── auth/
│   ├── login.html                # Login page
│   └── register.html             # Registration page
├── dashboard/
│   ├── patient.html              # Patient dashboard
│   ├── donor.html                # Donor dashboard
│   ├── doctor.html               # Doctor dashboard
│   ├── hospital.html             # Hospital dashboard
│   └── admin.html                # Admin dashboard
└── info/
    ├── about.html                # About page
    ├── contact.html              # Contact page
    ├── privacy.html              # Privacy policy
    └── terms.html                # Terms of service
```

---

## 🎨 Usage

### Theme System

```javascript
// Theme auto-initializes
// Add toggle button anywhere:
<button data-theme-toggle>
  <span class="material-symbols-outlined">dark_mode</span>
</button>
```

### Language System

```javascript
// Add translation key to elements:
<h1 data-i18n="hero.title">Default Text</h1>

// Toggle button:
<button data-lang-toggle>
  <span class="lang-text">বাংলা</span>
</button>
```

### Authentication

```javascript
import { authService } from './core/auth.js';

// Login
await authService.loginWithEmail(email, password);

// Register
await authService.registerWithEmail(email, password, name);

// Google OAuth
await authService.loginWithGoogle();

// Logout
await authService.logout();
```

### Database Operations

```javascript
import { dbService } from './core/db.js';

// Create user
await dbService.createUser(uid, userData);

// Get user
await dbService.getUser(uid);

// Create request
await dbService.createRequest(requestData);

// Get donors
await dbService.getDonors(bloodGroup, division);
```

---

## 🎯 Development

### Build CSS

```bash
# Build for production
npm run build:css

# Watch for changes
npm run watch:css
```

### Local Development

```bash
# Serve with live reload
npm run dev
```

### Testing

- Test theme toggle on all pages
- Test language toggle on all pages
- Test authentication flow
- Test on mobile devices
- Check console for errors

---

## 🚢 Deployment

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done)
firebase init

# Deploy
firebase deploy
```

### Environment Variables

Create `.env` file (not committed):
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

---

## 📚 Documentation

- **[REBUILD_COMPLETE.md](REBUILD_COMPLETE.md)** - Full technical documentation
- **[QUICK_START.md](QUICK_START.md)** - Developer quick reference
- **[REBUILD_SUMMARY.md](REBUILD_SUMMARY.md)** - Executive summary

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style
- Use ES6+ features
- Follow existing patterns
- Add translations for new text
- Test theme and language toggles
- Ensure mobile responsiveness

---

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules for data protection
- HTTPS only (Firebase Hosting)
- Input validation and sanitization
- XSS prevention

Report security issues to: security@lifelink.bd

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Team

- **Project Lead**: [Your Name]
- **Architecture**: Principal Software Architect
- **Development**: Senior Frontend Engineer

---

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Tailwind CSS for styling system
- Google Fonts for typography
- Material Symbols for icons
- Bangladesh healthcare community

---

## 📞 Support

- **Email**: support@lifelink.bd
- **Website**: [lifelink.bd](https://lifelink.bd)
- **Documentation**: See docs folder

---

## 🗺️ Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Theme system
- [x] Language system
- [x] Firebase integration
- [x] Authentication
- [x] Component library

### Phase 2: Dashboard Pages ⏳
- [ ] Patient dashboard
- [ ] Donor dashboard
- [ ] Doctor dashboard
- [ ] Hospital dashboard
- [ ] Admin dashboard

### Phase 3: Features ⏳
- [ ] Emergency blood requests
- [ ] Medical directory
- [ ] Donor search
- [ ] Appointment booking
- [ ] Profile management

### Phase 4: PWA ⏳
- [ ] Service worker
- [ ] Offline support
- [ ] Install prompt
- [ ] Push notifications

### Phase 5: Launch 🎯
- [ ] Performance optimization
- [ ] Security audit
- [ ] Accessibility testing
- [ ] Production deployment

---

## 📊 Status

**Current Phase**: Phase 1 Complete ✅  
**Next Milestone**: Dashboard Pages  
**Estimated Completion**: 4-6 hours  
**Confidence**: 🟢 HIGH

---

**Built with ❤️ for Bangladesh healthcare community**
