import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check.js";
import firebaseConfig from "./firebase-config.js";

if (firebaseConfig?.appCheckSiteKey) {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(firebaseConfig.appCheckSiteKey),
        isTokenAutoRefreshEnabled: true
    });
}
