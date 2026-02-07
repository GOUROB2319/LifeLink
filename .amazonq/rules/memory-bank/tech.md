# LifeLink - Technology Stack

## Programming Languages
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Custom styles, animations, transitions
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
  - Modules (import/export)
  - Async/await patterns
  - Arrow functions
  - Template literals
  - Destructuring

## Frontend Technologies

### CSS Framework
- **TailwindCSS 3.x** (CDN)
  - Utility-first approach
  - Custom theme configuration in config.js
  - Dark mode support (class-based)
  - Responsive design utilities
  - Custom color palette (Emerald primary, Amber secondary)

### Typography
- **Hind Siliguri**: Bengali language support
- **Inter**: English body text
- **Public Sans**: Display text alternative
- **Manrope**: Body text alternative

### Icons
- **Material Symbols Outlined** (Google Fonts)
  - Consistent icon system
  - Variable font technology
  - Customizable weight and size

### UI Components
- Custom component library (components.js)
- Modal system
- Toast notifications
- Loading states and skeletons
- Form controls with validation

## Backend Services

### Firebase Platform
- **Firebase Authentication 10.x**
  - Email/Password provider
  - Google OAuth provider
  - Session management
  - User profile management

- **Cloud Firestore 10.x**
  - NoSQL document database
  - Real-time synchronization
  - Offline persistence
  - Security rules enforcement

- **Firebase App Check**
  - reCAPTCHA Enterprise integration
  - Abuse prevention
  - Bot protection

### External APIs
- **Google Gemini AI** (gemini-service.js)
  - AI-powered assistance
  - Natural language processing
  - Contextual help

- **Browser Geolocation API**
  - Location-based services
  - Donor proximity search
  - Hospital finder

## Database Schema

### Collections

#### users
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  role: 'patient' | 'donor' | 'doctor' | 'hospital' | 'admin',
  phone: string,
  address: string,
  division: string,
  district: string,
  bloodGroup: string,
  availability: boolean,
  verificationStatus: 'pending' | 'verified' | 'rejected',
  onboardingComplete: boolean,
  createdAt: timestamp,
  lastLogin: timestamp,
  updatedAt: timestamp
}
```

#### requests
```javascript
{
  requestId: string,
  userId: string,
  bloodGroup: string,
  priority: 'critical' | 'urgent' | 'standard',
  status: 'active' | 'matched' | 'completed' | 'cancelled',
  hospital: string,
  location: { division: string, district: string },
  contactName: string,
  contactPhone: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### appointments
```javascript
{
  appointmentId: string,
  doctorId: string,
  patientId: string,
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed',
  date: timestamp,
  notes: string,
  createdAt: timestamp
}
```

#### donations
```javascript
{
  donationId: string,
  donorId: string,
  requestId: string,
  date: timestamp,
  bloodGroup: string,
  hospital: string,
  createdAt: timestamp
}
```

## Security

### Firestore Security Rules
- **Authentication Required**: All operations require sign-in
- **Ownership Validation**: Users can only access their own data
- **Role-Based Access**: Different permissions per role
- **Verification Checks**: Doctors/hospitals must be verified for directory
- **Admin Privileges**: Special permissions for verification workflow

### Client-Side Security
- Input validation and sanitization
- XSS prevention (template literals, textContent)
- CSRF protection (Firebase handles tokens)
- Secure credential storage (Firebase SDK)

## Progressive Web App (PWA)

### Service Worker
- **Caching Strategy**: Cache-first for static assets
- **Offline Support**: Fallback pages for offline mode
- **Background Sync**: Queue requests when offline
- **Update Notifications**: Prompt users for new versions

### Manifest Configuration
- **App Name**: LifeLink - Healthcare Platform
- **Theme Color**: #10B981 (Emerald)
- **Display Mode**: Standalone
- **Shortcuts**: Emergency Request, Find Donors
- **Icons**: SVG logo (scalable)

## Development Tools

### Version Control
- **Git**: Source control
- **.gitignore**: Excludes node_modules, .env, Firebase config

### Environment Configuration
- **.env.example**: Template for environment variables
- **Firebase Config**: Separate config file for API keys

### Documentation
- **README.md**: Project overview
- **SETUP.md**: Development setup instructions
- **IMPLEMENTATION.md**: Technical implementation details
- **CONTRIBUTING.md**: Contribution guidelines
- **SECURITY.md**: Security policies
- **PRODUCTION_CHECKLIST.md**: Pre-deployment checklist

## Browser Support

### Minimum Requirements
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Service Worker API
- Geolocation API
- Local Storage
- IndexedDB (for Firestore offline)

## Performance Optimizations

### Loading Strategy
- **CDN Resources**: TailwindCSS, Google Fonts
- **Lazy Loading**: Images and non-critical scripts
- **Code Splitting**: Modular JavaScript
- **Minification**: Production builds

### Caching
- **Service Worker**: Static asset caching
- **Browser Cache**: HTTP cache headers
- **Firestore Cache**: Offline data persistence

### Asset Optimization
- **SVG Icons**: Scalable, small file size
- **WebP Images**: Modern image format (fallback to PNG/JPG)
- **Font Subsetting**: Only required characters

## Development Commands

### Local Development
```bash
# Serve locally (any HTTP server)
python -m http.server 8000
# or
npx serve
```

### Firebase Deployment
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# Deploy to Firebase Hosting
firebase deploy
```

### Testing
- Manual testing in browser
- Firebase Emulator Suite for local testing
- Lighthouse for performance audits

## API Configuration

### Firebase Project Setup
1. Create Firebase project at console.firebase.google.com
2. Enable Authentication (Email/Password, Google)
3. Create Firestore database
4. Register web app and copy config
5. Update firebase-config.js with credentials

### App Check Setup
1. Enable App Check in Firebase Console
2. Register reCAPTCHA Enterprise site key
3. Update app-check.js with site key

### Gemini AI Setup
1. Obtain API key from Google AI Studio
2. Add to api-config.js
3. Configure rate limits and quotas

## Localization

### Supported Languages
- **English (en)**: Default language
- **Bengali (bn)**: Secondary language

### Translation System
- **localization.js**: Translation dictionary
- **Dynamic Content**: JavaScript-based translation
- **Language Switcher**: Persistent preference in localStorage

## Deployment

### Firebase Hosting
- **Domain**: Custom domain support
- **SSL**: Automatic HTTPS
- **CDN**: Global content delivery
- **Rollback**: Version history

### Environment Variables
- Firebase API keys
- App Check site key
- Gemini API key
- reCAPTCHA keys

### Pre-Deployment Checklist
- Update Firebase config with production credentials
- Deploy Firestore security rules
- Enable App Check
- Test all authentication flows
- Verify PWA functionality
- Run Lighthouse audit
- Test on multiple devices/browsers
