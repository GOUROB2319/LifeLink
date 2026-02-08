# 🚀 DEPLOYMENT GUIDE - LIFELINK BD

## Quick Deploy (5 Minutes)

### Prerequisites
- Node.js installed
- Firebase account
- Project: lifelink-295e7

### Steps

#### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

#### 2. Login
```bash
firebase login
```

#### 3. Deploy
```bash
cd "C:\Users\GourobSaha\OneDrive - Gourob Saha\LifeLink"
firebase deploy --only hosting
```

#### 4. Verify
Visit: https://lifelink-295e7.web.app

---

## Detailed Deployment

### First Time Setup

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```
- Opens browser
- Login with Google account
- Grant permissions

3. **Verify Project**
```bash
firebase projects:list
```
Should show: lifelink-295e7

### Deploy Hosting

```bash
firebase deploy --only hosting
```

**Output:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/lifelink-295e7/overview
Hosting URL: https://lifelink-295e7.web.app
```

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### Deploy Everything

```bash
firebase deploy
```

---

## Testing Deployment

### 1. Visit Site
```
https://lifelink-295e7.web.app
```

### 2. Test PWA Install
- Chrome: Click install icon in address bar
- Mobile: Add to Home Screen

### 3. Test Offline
- Open DevTools > Network
- Set to Offline
- Reload page
- Should show offline page

### 4. Test Features
- Register account
- Login
- Navigate dashboards
- Submit forms
- Toggle theme
- Toggle language

---

## Rollback

If issues occur:

```bash
firebase hosting:clone lifelink-295e7:PREVIOUS_VERSION lifelink-295e7:live
```

---

## Custom Domain (Optional)

### 1. Add Domain in Firebase Console
- Go to Hosting section
- Click "Add custom domain"
- Enter domain name
- Follow DNS instructions

### 2. Update DNS Records
Add records provided by Firebase:
- Type: A
- Name: @
- Value: (Firebase IP)

### 3. Wait for SSL
- Firebase auto-provisions SSL
- Takes 24-48 hours
- Site will be HTTPS

---

## Environment Variables

### Production Config
Already set in `public/assets/js/core/firebase.js`

### If Changing:
1. Update firebase.js
2. Redeploy

---

## Monitoring

### View Logs
```bash
firebase hosting:channel:list
```

### Analytics
- Firebase Console > Analytics
- Real-time users
- Page views
- Events

### Performance
- Firebase Console > Performance
- Page load times
- Network requests
- App start time

---

## Troubleshooting

### Deploy Fails
```bash
# Clear cache
firebase deploy --only hosting --force

# Check auth
firebase login --reauth
```

### Site Not Updating
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# Clear service worker
DevTools > Application > Service Workers > Unregister
```

### 404 Errors
- Check firebase.json rewrites
- Verify file paths
- Check public directory

---

## Post-Deployment

### 1. Verify All Pages
- [ ] Landing page
- [ ] Auth pages
- [ ] All dashboards
- [ ] Info pages

### 2. Test Forms
- [ ] Registration
- [ ] Login
- [ ] Emergency request
- [ ] Profile update
- [ ] Contact form

### 3. Check Performance
```bash
# Run Lighthouse
Chrome DevTools > Lighthouse > Generate Report
```

### 4. Monitor Errors
- Firebase Console > Crashlytics
- Check for JavaScript errors
- Monitor failed requests

---

## Maintenance

### Update Content
1. Edit files locally
2. Test locally: `firebase serve`
3. Deploy: `firebase deploy --only hosting`

### Update Dependencies
```bash
npm update
```

### Backup
Firebase auto-backs up, but also:
```bash
git commit -am "Backup before changes"
git push
```

---

## Support

### Firebase Support
- Console: https://console.firebase.google.com
- Docs: https://firebase.google.com/docs
- Status: https://status.firebase.google.com

### Project Support
- Email: support@lifelink.bd
- GitHub: (your repo)

---

## Quick Commands Reference

```bash
# Deploy
firebase deploy --only hosting

# Test locally
firebase serve

# View logs
firebase hosting:channel:list

# Rollback
firebase hosting:clone SOURCE:VERSION DEST:live

# Check status
firebase projects:list
```

---

**Ready to Deploy!** 🚀
