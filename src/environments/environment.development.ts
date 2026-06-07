import { Environment, validateFirebaseConfig } from './firebase-config.model';

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAg9IimIZngcSdkfiKjpK4N9-g3ZHBuTHk',
    authDomain: 'crypto-portfolio-dashboard.firebaseapp.com',
    projectId: 'crypto-portfolio-dashboard',
    storageBucket: 'crypto-portfolio-dashboard.firebasestorage.app',
    messagingSenderId: '862620039718',
    appId: '1:862620039718:web:4083dc50c31df2df9344e7',
    measurementId: 'G-ST4NWEXL4Q',
  },
};

validateFirebaseConfig(environment.firebase, 'environment.development.ts');
