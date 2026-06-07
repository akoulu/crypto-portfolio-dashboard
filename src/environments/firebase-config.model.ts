export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface Environment {
  production: boolean;
  firebase: FirebaseConfig;
}

const REQUIRED_FIREBASE_KEYS: (keyof FirebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

export function validateFirebaseConfig(config: FirebaseConfig, context: string): void {
  const missing = REQUIRED_FIREBASE_KEYS.filter((key) => !config[key]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `[Firebase] Missing configuration in ${context}: ${missing.join(', ')}. ` +
        'Copy src/environments/environment.example.ts and set your project values.',
    );
  }
}
