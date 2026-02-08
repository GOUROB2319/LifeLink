# LifeLink - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Firebase account
- Text editor (VS Code recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lifelink.git
cd lifelink
```

2. **Configure Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing
   - Enable Authentication (Email/Password + Google)
   - Create Firestore Database
   - Copy your Firebase config

3. **Update Firebase Configuration**
   - Open `assets/js/firebase-config.js`
   - Replace with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       // ... other config
   };
   ```

4. **Deploy Firestore Rules**
   - Copy content from `firestore.rules`
   - Paste in Firebase Console → Firestore → Rules
   - Publish the rules

5. **Configure Gemini AI (Optional)**
   - Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update `assets/js/api-config.js`:
   ```javascript
   gemini: {
       apiKey: "YOUR_GEMINI_API_KEY"
   }
   ```

6. **Run Locally**
   - Open `index.html` in browser
   - Or use local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

7. **Test the Application**
   - Register a new account
   - Complete onboarding
   - Test emergency request flow

## 🔒 Security Setup

### Environment Variables (Production)
Create `.env` file (never commit this):
```env
FIREBASE_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

### Firebase Security
1. Enable App Check (reCAPTCHA v3)
2. Set up authorized domains
3. Configure CORS settings
4. Enable Firebase Security Rules

## 📱 Features

### Implemented ✅
- User authentication (Email/Password + Google)
- Multi-role system (Donor, Patient, Doctor, Hospital, Admin)
- Emergency blood request
- Real-time form validation
- Error handling with retry logic
- Bilingual support (English/Bengali)
- Responsive design
- Dark mode support

### Coming Soon 🚧
- Push notifications
- Geolocation & maps
- In-app messaging
- Payment integration
- Mobile app (React Native/Flutter)

## 🛠️ Development

### File Structure
```
LifeLink/
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── auth-service.js      # Authentication
│   │   ├── db-service.js        # Database operations
│   │   ├── validation.js        # Form validation
│   │   ├── error-handler.js     # Error handling
│   │   ├── loading.js           # Loading states
│   │   └── ...
│   └── images/
├── auth/                         # Login & registration
├── dashboard/                    # Role-based dashboards
├── info/                         # Static pages
├── onboarding/                   # Multi-step onboarding
├── index.html                    # Landing page
├── firestore.rules              # Security rules
└── README.md
```

### Code Style
- Use ES6+ features
- Follow consistent naming conventions
- Add comments for complex logic
- Keep functions small and focused

### Testing
```bash
# Manual testing checklist:
- [ ] Register new user
- [ ] Login with email/password
- [ ] Login with Google
- [ ] Complete onboarding
- [ ] Submit emergency request
- [ ] Update profile
- [ ] Test all validations
- [ ] Test error scenarios
```

## 🌐 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### Other Platforms
- **Netlify**: Drag & drop or connect GitHub
- **Vercel**: Import from GitHub
- **GitHub Pages**: Enable in repository settings

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/lifelink/issues)
- **Email**: support@lifelink.org
- **Documentation**: [Wiki](https://github.com/yourusername/lifelink/wiki)

## 🙏 Acknowledgments

- Firebase for backend services
- Google Gemini for AI features
- TailwindCSS for styling
- Material Symbols for icons
- All contributors and supporters

---

Made with ❤️ for saving lives in Bangladesh
