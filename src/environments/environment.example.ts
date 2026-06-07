import { Environment } from './firebase-config.model';

/**
 * Setup:
 * 1. Copy this file to `environment.ts`
 * 2. Copy this file to `environment.development.ts` and set production: false
 * 3. Fill in your Firebase web app config from Firebase Console
 * 4. Add validateFirebaseConfig(...) at the bottom of each file (see commented line)
 *
 * Security:
 * - `environment.ts` and `environment.development.ts` are gitignored
 * - Restrict the API key in Google Cloud Console (HTTP referrers)
 * - Never commit Admin SDK / service account JSON files
 */
export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.firebasestorage.app',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID',
  },
};

// After copying, uncomment in environment.ts / environment.development.ts:
// import { validateFirebaseConfig } from './firebase-config.model';
// validateFirebaseConfig(environment.firebase, 'environment.ts');
