# Production Checklist (LifeLink)

## Firebase
- [ ] Firestore Rules published (use `firestore.rules`)
- [ ] Authentication providers configured (Email/Password, Google)
- [ ] Firestore indexes created if needed (appointments, requests by userId, requests by status)
- [ ] Check Firebase quotas (free tier) and enable budget alerts

## Security
- [ ] Rules enforced for per‑role access (donor, patient, doctor, hospital)
- [ ] Verify public directory only exposes verified doctors/hospitals
- [ ] Disable client‑side role changes (handled by rules)
- [ ] Remove any test accounts or demo data

## Data Model
- [ ] `users` documents have correct role and required fields
- [ ] `requests` documents include `userId`, `status`, `createdAt`
- [ ] `appointments` documents include `doctorId`, `date`, `status`
- [ ] `donations` documents include `donorId`, `date`

## UI/UX
- [ ] All role dashboards load with real data
- [ ] Error states shown for empty lists
- [ ] All external links open correctly
- [ ] Mobile responsiveness verified

## Performance
- [ ] Optimize large images if any
- [ ] Avoid duplicate heavy scripts per page

## Legal/Policy
- [ ] Privacy Policy updated with correct contact info
- [ ] Terms of Service updated with correct jurisdiction

## Launch
- [ ] Smoke test: register → onboarding → dashboard
- [ ] Emergency request flow tested end‑to‑end
- [ ] Doctor appointment confirm/cancel tested
- [ ] Hospital inventory updates reflected in profile
- [ ] Patient request status updates visible
