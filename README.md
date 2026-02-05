# LifeLink - Professional Healthcare Platform

A life-saving healthcare platform connecting patients, blood/organ donors, doctors, and hospitals.

## Features

- Emergency blood request system with priority levels
- Donor dashboard with availability, history, and achievements
- Medical directory for doctors and hospitals
- Organ donation registry with consent workflow
- Secure authentication (Email/Password + Google OAuth)
- Responsive, accessible UI

## Project Structure

```
LifeLink/
├── assets/                  # Static resources (CSS, JS, images)
├── auth/                    # Login & registration
├── dashboard/               # App dashboards & flows
├── info/                    # Marketing & policy pages
├── onboarding/              # Multi-step onboarding
├── index.html               # Main landing page
├── firestore.rules          # Firestore security rules
└── README.md                # Documentation
```

## Pages

### Core Pages
- `index.html` - Landing page with hero, statistics, testimonials
- `auth/login.html` - Login with Email/Password and Google
- `auth/register.html` - Account creation
- `dashboard/emergency.html` - Emergency blood request flow
- `dashboard/donor.html` - Donor dashboard

### Role Dashboards
- `dashboard/doctor_dashboard.html` - Doctor dashboard & appointments
- `dashboard/patient_dashboard.html` - Patient dashboard & request tracking
- `dashboard/hospital_dashboard.html` - Hospital dashboard & inventory

### Directory & Search
- `dashboard/directory.html` - Doctor and provider search
- `dashboard/hospital.html` - Hospital profile and resources
- `info/organ_donation.html` - Organ donation registry and education

### User Management
- `onboarding/step1.html` - Multi-step onboarding (account setup)
- `dashboard/settings.html` - User settings and privacy controls
- `dashboard/donation_success.html` - Post-donation confirmation and impact summary

## Technology Stack

- **Frontend**: HTML5 + TailwindCSS (CDN)
- **Typography**: Inter + Hind Siliguri
- **Icons**: Material Symbols Outlined
- **JavaScript**: Vanilla JS with Firebase Auth + Firestore

## Firebase Integration

The app uses Firebase for authentication and data storage:
- **Authentication**: Email/Password, Google Sign-In
- **Database**: Firestore (users, requests, donations, appointments)

## Firestore Security Rules (Required for Production)

This project includes a `firestore.rules` file. Paste it in:
Firebase Console → Firestore Database → Rules → Publish.

These rules:
- Allow only owners to read/update their profiles
- Expose verified doctors/hospitals in directory
- Lock down requests and appointments to owners

## Getting Started

1. Open `index.html` in your browser
2. Navigate through the application using the links
3. Try the emergency request flow
4. Explore donor dashboard and medical directory

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2024 LifeLink Healthcare Systems. All Rights Reserved.
