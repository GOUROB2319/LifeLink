# LifeLink - Development Guidelines

## Code Quality Standards

### File Structure and Organization
- **Modular Architecture**: Each JavaScript file serves a single, well-defined purpose (localization.js for i18n, db-service.js for database operations, geolocation.js for location services)
- **Service Layer Pattern**: Business logic is separated into service modules that export functions (auth-service, db-service, geolocation)
- **Component-Based UI**: Reusable web components (app-navbar, app-footer) using Custom Elements API
- **Configuration Separation**: Configuration files (config.js, firebase-config.js, api-config.js) are separate from implementation

### Code Formatting Conventions
- **Indentation**: 4 spaces for JavaScript, 2 spaces for HTML/CSS (observed in 100% of files)
- **Line Breaks**: Windows-style CRLF line endings (\r\n)
- **Semicolons**: Consistently used at end of statements in JavaScript
- **Quotes**: Single quotes for JavaScript strings, double quotes for HTML attributes
- **Trailing Commas**: Used in multi-line object/array literals for cleaner diffs

### Naming Conventions
- **Variables/Functions**: camelCase (getCurrentLocation, saveUserProfile, calculateDistance)
- **Classes**: PascalCase (LocalizationManager, Navbar, Footer)
- **Constants**: UPPER_SNAKE_CASE (CACHE_NAME, ASSETS_TO_CACHE)
- **Private Properties**: Underscore prefix (_isAuth, _resolvePath)
- **File Names**: kebab-case for multi-word files (db-service.js, firebase-config.js, app-check.js)
- **Translation Keys**: Dot notation with namespacing (nav.home, hero.title, onboarding.step1.title)

### Documentation Standards
- **JSDoc Comments**: Used for all exported functions with parameter types and return values
- **Inline Comments**: Explain complex logic, business rules, and workarounds
- **Section Headers**: Comment blocks separate logical sections within files
- **TODO/FIXME**: Not observed - code appears production-ready

## Semantic Patterns and Practices

### ES6+ Module System
```javascript
// Named exports for service functions
export const saveUserProfile = async (db, user, role, additionalData = {}) => { ... };
export const getCurrentLocation = () => { ... };

// Import from CDN for Firebase
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
```

### Async/Await Pattern
- **Consistent Usage**: All asynchronous operations use async/await (100% of async code)
- **Error Handling**: Try-catch blocks with structured error returns
- **Return Format**: Standardized `{ success: boolean, error?: string, data?: any }` pattern

```javascript
export const saveUserProfile = async (db, user, role, additionalData = {}) => {
    try {
        // ... operation
        return { success: true };
    } catch (error) {
        console.error("Error saving user profile:", error);
        return { success: false, error: error.message };
    }
};
```

### Promise-Based APIs
```javascript
// Geolocation wrapped in Promise for consistency
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ latitude: position.coords.latitude, ... }),
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
};
```

### Firestore Database Patterns

#### CRUD Operations
```javascript
// Create/Update with serverTimestamp
await setDoc(userRef, {
    ...data,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp()
});

// Read with existence check
const userSnap = await getDoc(userRef);
if (!userSnap.exists()) { ... }

// Update with partial data
await updateDoc(userRef, { 
    status, 
    updatedAt: serverTimestamp() 
});

// Delete
await deleteDoc(userRef);
```

#### Query Patterns
```javascript
// Compound queries with where clauses
const q = query(
    collection(db, "users"),
    where("role", "==", "donor"),
    where("bloodGroup", "==", bloodGroup),
    where("availability", "==", true)
);

// Ordered queries
const q = query(
    collection(db, "requests"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
);

// Client-side filtering for complex criteria (avoiding index requirements)
let results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
if (specialty) {
    results = results.filter(item => 
        item.specialty && item.specialty.toLowerCase() === specialty.toLowerCase()
    );
}
```

### Web Components Pattern

#### Custom Element Definition
```javascript
class Navbar extends HTMLElement {
    constructor() {
        super();
        this._isAuth = false; // Private state
    }

    connectedCallback() {
        // Initialize when added to DOM
        const isAuth = this.getAttribute('auth') === 'true';
        this.render(isAuth, activeLink);
        this.initLogic();
        this.setupLanguageListener();
    }

    render(isAuth, activeLink) {
        // Template literal for HTML
        this.innerHTML = `<header>...</header>`;
    }
}

customElements.define('app-navbar', Navbar);
```

#### Component Communication
```javascript
// Custom events for cross-component communication
document.dispatchEvent(new CustomEvent('lifelink-language-change', { 
    detail: { lang } 
}));

// Event listeners in components
document.addEventListener('lifelink-language-change', () => {
    if (window.localization) {
        setTimeout(() => window.localization.updateDOM(), 50);
    }
});
```

### Internationalization (i18n) Pattern

#### Translation Dictionary Structure
```javascript
const translations = {
    en: {
        "nav.home": "Home",
        "hero.title": "Connecting Lives in<br>Every <span class='text-emergency'>Heartbeat</span>",
        // Nested namespacing for organization
        "onboarding.step1.title": "Join LifeLink"
    },
    bn: {
        "nav.home": "হোম",
        // Bengali translations with same keys
    }
};
```

#### Dynamic Content Translation
```javascript
// Data attribute for translation keys
<a data-i18n="nav.services">Services</a>

// Placeholder translation
<input data-placeholder-i18n="onboarding.placeholder.email" />

// Update DOM on language change
updateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[this.currentLang][key]) {
            if (el.children.length === 0) {
                el.textContent = translations[this.currentLang][key];
            } else {
                el.innerHTML = translations[this.currentLang][key];
            }
        }
    });
}
```

#### Mutation Observer for Dynamic Content
```javascript
setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && 
                        (node.hasAttribute('data-i18n') || node.querySelector('[data-i18n]'))) {
                        shouldUpdate = true;
                    }
                });
            }
        });
        if (shouldUpdate) {
            setTimeout(() => this.updateDOM(), 50);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
```

### Path Resolution Pattern

#### Dynamic Base URL Calculation
```javascript
const getBaseUrl = () => {
    const currentUrl = new URL(window.location.href);
    const htmlBase = document.documentElement.getAttribute('data-base');
    if (htmlBase) {
        return new URL(htmlBase, currentUrl.href).toString();
    }

    const path = currentUrl.pathname;
    const roots = ['/auth/', '/dashboard/', '/info/', '/onboarding/'];
    let rootPath = '/';
    for (const seg of roots) {
        if (path.includes(seg)) {
            rootPath = path.split(seg)[0] + '/';
            break;
        }
    }

    const origin = currentUrl.protocol === 'file:' 
        ? 'file://' 
        : `${currentUrl.protocol}//${currentUrl.host}`;
    return `${origin}${rootPath}`;
};

// Closure for path resolution
const createResolvePath = () => {
    const baseUrl = getBaseUrl();
    return (path) => {
        const clean = path.replace(/^\\/+/, '');
        return new URL(clean, baseUrl).toString();
    };
};
```

### Service Worker Patterns

#### Cache-First Strategy
```javascript
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then((fetchResponse) => {
                        // Cache new responses
                        if (fetchResponse && fetchResponse.status === 200) {
                            const responseClone = fetchResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return fetchResponse;
                    })
                    .catch(() => {
                        // Offline fallback
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});
```

#### Lifecycle Management
```javascript
// Install - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting(); // Activate immediately
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control immediately
});
```

### Geolocation Patterns

#### Haversine Distance Calculation
```javascript
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
```

#### Proximity Search
```javascript
export const findNearby = (userLocation, items, maxDistance = 50) => {
    return items
        .map(item => {
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                item.latitude || item.location?.latitude,
                item.longitude || item.location?.longitude
            );
            return { ...item, distance };
        })
        .filter(item => item.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
};
```

## Frequently Used Code Idioms

### Null/Undefined Checks
```javascript
// Existence check before operations
if (!user || !user.uid) throw new Error("User UID is required");

// Optional chaining for nested properties
item.latitude || item.location?.latitude

// Nullish coalescing for defaults
const roleToSave = role ?? additionalData.role;
availability: additionalData.availability ?? true
```

### Object Spread for Merging
```javascript
// Merge with overrides
await setDoc(userRef, {
    ...baseData,
    displayName: additionalData.displayName || user.displayName || '',
    role: roleToSave || 'patient',
    ...additionalData
});

// Spread in return values
return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### Array Methods for Data Transformation
```javascript
// Map for transformation
const results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// Filter for client-side queries
results = results.filter(item => 
    item.specialty && item.specialty.toLowerCase() === specialty.toLowerCase()
);

// Sort for ordering
.sort((a, b) => a.distance - b.distance);

// Chaining for complex operations
return items
    .map(item => ({ ...item, distance: calculateDistance(...) }))
    .filter(item => item.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
```

### Conditional Rendering in Templates
```javascript
// Ternary for conditional blocks
${!isAuth ? `
    <a href="...">Login</a>
` : `
    <button>Dashboard</button>
`}

// Template literal for dynamic classes
class="px-4 py-2 ${activeLink === 'services' ? 'bg-primary/10 text-primary' : ''}"
```

### LocalStorage Patterns
```javascript
// Get with fallback
this.currentLang = localStorage.getItem('lifelink_lang') || 'en';

// Set after change
localStorage.setItem('lifelink_lang', lang);

// Check existence
if (!localStorage.getItem('lifelink_lang')) { ... }
```

### DOM Manipulation Patterns
```javascript
// Query selector with null check
const toggleBtn = document.getElementById('lang-toggle-text');
if (toggleBtn) {
    toggleBtn.textContent = this.currentLang === 'en' ? 'BN' : 'EN';
}

// Event delegation
const logoutBtn = this.querySelector('#logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => { ... });
}

// Dynamic attribute updates
document.documentElement.lang = this.currentLang;
el.setAttribute('placeholder', translations[this.currentLang][key]);
```

## Security Best Practices

### Input Validation
- All user inputs validated before database operations
- Type checking for required parameters
- Sanitization through Firebase SDK (prevents injection)

### Authentication Checks
```javascript
// Verify user before operations
if (!user || !user.uid) throw new Error("User UID is required");

// Check authentication state
const isAuth = this.getAttribute('auth') === 'true';
```

### Content Security Policy
```javascript
// Injected via meta tag in navbar component
ensureMeta('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' https://cdn.tailwindcss.com ... 'unsafe-inline' blob:; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "connect-src 'self' https://firestore.googleapis.com ...",
    true
);
```

### Firestore Security Rules Integration
- Client-side code assumes server-side rules enforcement
- Operations return structured errors for permission denials
- No sensitive logic in client code

## Performance Optimizations

### Lazy Loading
- Service worker caches assets on first load
- Components render only when connected to DOM
- Mutation observer with debouncing (50ms delay)

### Efficient Queries
- Firestore queries use indexes where possible
- Client-side filtering for complex criteria (avoids index explosion)
- Pagination ready (orderBy with limit - not yet implemented)

### Caching Strategy
- Service worker: Cache-first for static assets
- Firestore: Offline persistence enabled
- LocalStorage: User preferences cached

### Debouncing
```javascript
// Delay DOM updates to batch changes
setTimeout(() => this.updateDOM(), 50);
setTimeout(() => this.updateDOM(), 100); // Longer for language toggle
```

## Error Handling Patterns

### Structured Error Returns
```javascript
try {
    // ... operation
    return { success: true, id: docRef.id };
} catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: error.message };
}
```

### Console Logging
- All errors logged with context
- Success operations logged in development
- Service worker logs lifecycle events

### Graceful Degradation
```javascript
// Fallback for unsupported features
if (!navigator.geolocation) {
    reject(new Error('Geolocation not supported'));
    return;
}

// Offline fallback in service worker
.catch(() => {
    if (event.request.destination === 'document') {
        return caches.match('/index.html');
    }
});
```

## Testing Considerations

### Testable Code Structure
- Pure functions for calculations (calculateDistance, formatDistance)
- Service functions with clear inputs/outputs
- Dependency injection (db parameter passed to functions)

### Mock-Friendly Design
- External APIs wrapped in service modules
- Configuration separated from logic
- Browser APIs wrapped in Promise-based functions

## Accessibility Patterns

### Semantic HTML
- Material Symbols icons with text labels
- ARIA attributes (not extensively observed - area for improvement)
- Keyboard navigation support in components

### Internationalization
- Full Bengali language support
- RTL-ready architecture (dir attribute management)
- Language switcher accessible via keyboard

## Development Workflow

### File Organization
- Assets grouped by type (css/, js/, images/)
- Pages grouped by function (auth/, dashboard/, info/, onboarding/)
- Services in assets/js/ with clear naming

### Configuration Management
- Environment-specific configs in separate files
- No hardcoded credentials (use .env pattern)
- Firebase config in dedicated file

### Version Control
- Service worker versioning (CACHE_NAME = 'lifelink-v2')
- Cache invalidation on version change
- Git-friendly structure (modular files)
