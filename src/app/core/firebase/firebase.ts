import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { FIREBASE_APP } from './firebase.providers';

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  readonly app = inject(FIREBASE_APP);
  readonly projectId = this.app.options.projectId;
}
