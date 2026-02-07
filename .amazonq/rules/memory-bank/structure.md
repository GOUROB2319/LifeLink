# LifeLink - Project Structure

## Directory Organization

```
LifeLink/
├── assets/                  # Static resources and shared utilities
│   ├── css/                # Stylesheets
│   │   └── styles.css      # Custom styles and utilities
│   ├── images/             # Brand assets and icons
│   │   ├── favicon.svg     # Browser favicon
│   │   └── lifelink-logo.svg  # Main logo
│   └── js/                 # JavaScript modules and services
│       ├── animations.js   # UI animations and transitions
│       ├── api-config.js   # External API configurations
│       ├── app-check.js    # Firebase App Check integration
│       ├── auth-service.js # Authentication logic
│       ├── components.js   # Reusable UI components
│       ├── config.js       # TailwindCSS configuration
│       ├── db-service.js   # Firestore database operations
│       ├── districts.js    # Bangladesh district data
│       ├── divisions.js    # Bangladesh division data
│       ├── error-handler.js # Global error handling
│       ├── firebase-config.js # Firebase initialization
│       ├── gemini-service.js # AI assistant integration
│       ├── geolocation.js  # Location services
│       ├── loading.js      # Loading states and spinners
│       ├── localization.js # i18n (English/Bengali)
│       ├── main.js         # Main application entry
│       ├── notifications.js # Notification system
│       ├── placeholder-services.js # Mock data for development
│       ├── pwa.js          # PWA registration and updates
│       └── validation.js   # Form validation utilities
│
├── auth/                   # Authentication pages
│   ├── index.html          # Auth landing/redirect
│   ├── login.html          # Login page (Email/Google)
│   └── register.html       # Registration page
│
├── dashboard/              # Role-based dashboards and features
│   ├── admin_dashboard.html      # Admin panel
│   ├── directory.html            # Medical directory search
│   ├── doctor_dashboard.html     # Doctor appointments/profile
│   ├── doctor_profile.html       # Public doctor profile view
│   ├── doctor_verification.html  # Doctor verification flow
│   ├── donation_success.html     # Post-donation confirmation
│   ├── donor.html                # Donor dashboard
│   ├── emergency.html            # Emergency blood request
│   ├── hospital_dashboard.html   # Hospital inventory/requests
│   ├── hospital.html             # Hospital profile view
│   ├── patient_dashboard.html    # Patient request tracking
│   ├── search-donors.html        # Donor search interface
│   └── settings.html             # User settings/preferences
│
├── info/                   # Marketing and informational pages
│   ├── about.html          # About LifeLink
│   ├── contact.html        # Contact form
│   ├── organ_donation.html # Organ donation registry/education
│   ├── privacy.html        # Privacy policy
│   ├── services.html       # Services overview
│   └── terms.html          # Terms of service
│
├── onboarding/             # Multi-step user onboarding
│   ├── step1.html          # Account setup
│   ├── step2_1.html        # Patient-specific onboarding
│   ├── step2_2.html        # Donor-specific onboarding
│   ├── step2_3.html        # Hospital-specific onboarding
│   ├── step3.html          # Profile completion
│   └── step4.html          # Final setup/preferences
│
├── .amazonq/               # Amazon Q AI rules and memory
│   └── rules/
│       └── memory-bank/    # Project documentation
│
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── CONTRIBUTING.md         # Contribution guidelines
├── firestore.rules         # Firestore security rules
├── GOOGLE_SIGNIN_FIX.md    # Google OAuth troubleshooting
├── IMPLEMENTATION.md       # Implementation details
├── index.html              # Landing page
├── manifest.json           # PWA manifest
├── PRODUCTION_CHECKLIST.md # Pre-deployment checklist
├── PROGRESS.md             # Development progress tracker
├── README.md               # Project documentation
├── SECURITY.md             # Security policies
├── service-worker.js       # PWA service worker
└── SETUP.md                # Setup instructions
```

## Core Components

### Authentication System
- **auth-service.js**: Handles Firebase Authentication (Email/Password, Google OAuth)
- **Login/Register Pages**: User authentication flows with validation
- **Role-Based Access**: Patient, Donor, Doctor, Hospital, Admin roles

### Database Layer
- **db-service.js**: Firestore CRUD operations and queries
- **firestore.rules**: Security rules enforcing ownership and role-based access
- **Collections**: users, requests, appointments, donations

### UI Components
- **components.js**: Reusable UI elements (modals, cards, forms)
- **animations.js**: Smooth transitions and visual feedback
- **loading.js**: Loading states and skeleton screens

### Localization System
- **localization.js**: i18n support for English and Bengali
- **Language Switcher**: Dynamic content translation
- **RTL Support**: Prepared for right-to-left languages

### Geolocation Services
- **geolocation.js**: Browser geolocation API integration
- **districts.js/divisions.js**: Bangladesh administrative divisions
- **Location-Based Search**: Find nearby donors/hospitals

### PWA Infrastructure
- **service-worker.js**: Offline caching and background sync
- **manifest.json**: PWA configuration and shortcuts
- **pwa.js**: Service worker registration and update handling

### Error Handling
- **error-handler.js**: Global error catching and user-friendly messages
- **validation.js**: Form validation with real-time feedback
- **notifications.js**: Toast notifications for success/error states

## Architectural Patterns

### Modular JavaScript Architecture
- **Service Layer**: Separate modules for auth, database, geolocation
- **Component-Based UI**: Reusable components with consistent API
- **Configuration Management**: Centralized config files

### Role-Based Routing
- **Dashboard Segregation**: Separate dashboards per user role
- **Access Control**: Client-side route guards with server-side validation
- **Onboarding Flow**: Role-specific multi-step setup

### Progressive Enhancement
- **Core Functionality First**: Works without JavaScript (forms)
- **PWA Features**: Offline support, installability
- **Responsive Design**: Mobile-first approach

### Data Flow
1. **User Action** → UI Component
2. **Component** → Service Layer (auth-service, db-service)
3. **Service** → Firebase (Authentication, Firestore)
4. **Firebase** → Service Layer (response/error)
5. **Service** → Component (update UI)
6. **Component** → User Feedback (notifications, loading states)

### Security Architecture
- **Client-Side Validation**: Immediate feedback, UX improvement
- **Server-Side Rules**: Firestore security rules enforce access control
- **App Check**: Abuse prevention and bot protection
- **Role Verification**: Admin-approved doctor/hospital verification

### State Management
- **Session Storage**: Temporary data (form progress)
- **Local Storage**: User preferences (language, theme)
- **Firestore Real-Time**: Synchronized data across devices
- **Service Worker Cache**: Offline data availability

## Page Relationships

### Landing → Authentication
- index.html → auth/login.html → auth/register.html

### Authentication → Onboarding
- auth/register.html → onboarding/step1.html → step2_x.html → step3.html → step4.html

### Onboarding → Dashboard
- onboarding/step4.html → dashboard/{role}_dashboard.html

### Dashboard Interconnections
- patient_dashboard.html ↔ emergency.html ↔ search-donors.html
- donor.html ↔ donation_success.html
- doctor_dashboard.html ↔ doctor_profile.html
- hospital_dashboard.html ↔ hospital.html
- All dashboards → settings.html

### Directory Flow
- directory.html → doctor_profile.html / hospital.html

## Configuration Files

### Firebase Configuration
- **firebase-config.js**: Firebase project initialization
- **firestore.rules**: Database security rules
- **app-check.js**: reCAPTCHA Enterprise integration

### Build Configuration
- **config.js**: TailwindCSS theme customization
- **manifest.json**: PWA metadata and shortcuts
- **.env.example**: Environment variables template

### Development Documentation
- **README.md**: Project overview and features
- **SETUP.md**: Local development setup
- **IMPLEMENTATION.md**: Technical implementation details
- **CONTRIBUTING.md**: Contribution guidelines
- **SECURITY.md**: Security policies and reporting
