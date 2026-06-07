import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FIREBASE_AUTH } from './firebase.providers';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebase {
  private readonly auth = inject(FIREBASE_AUTH);

  readonly user$: Observable<User | null> = new Observable((subscriber) => {
    const unsubscribe = onAuthStateChanged(this.auth, (user) => subscriber.next(user));
    return () => unsubscribe();
  });

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const credential = await signInWithPopup(this.auth, provider);
    return credential.user;
  }
}
