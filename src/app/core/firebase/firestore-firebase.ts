import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, DocumentData } from 'firebase/firestore';
import { FIREBASE_FIRESTORE } from './firebase.providers';

@Injectable({
  providedIn: 'root',
})
export class FirestoreFirebase {
  private readonly firestore = inject(FIREBASE_FIRESTORE);

  collection(path: string): CollectionReference<DocumentData> {
    return collection(this.firestore, path);
  }
}
