import {
  EnvironmentProviders,
  InjectionToken,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FIREBASE_APP');
export const FIREBASE_AUTH = new InjectionToken<Auth>('FIREBASE_AUTH');
export const FIREBASE_FIRESTORE = new InjectionToken<Firestore>('FIREBASE_FIRESTORE');

function createFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(environment.firebase);
}

export function provideCoreFirebase(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: FIREBASE_APP,
      useFactory: createFirebaseApp,
    },
    {
      provide: FIREBASE_AUTH,
      useFactory: () => getAuth(inject(FIREBASE_APP)),
    },
    {
      provide: FIREBASE_FIRESTORE,
      useFactory: () => getFirestore(inject(FIREBASE_APP)),
    },
  ]);
}

export type { FirebaseApp, Auth, Firestore };
