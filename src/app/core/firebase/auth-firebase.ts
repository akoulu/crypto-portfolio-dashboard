import { computed, inject, Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { resolveFirebaseAuthError } from './auth-firebase.errors';
import { LoginCredentials, RegisterCredentials } from './auth-firebase.models';
import { FIREBASE_AUTH } from './firebase.providers';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebase {
  private readonly auth = inject(FIREBASE_AUTH);
  private readonly authStateReady$ = new ReplaySubject<User | null>(1);
  private readonly userSubject = new BehaviorSubject<User | null>(this.auth.currentUser);
  private authInitialized = false;

  private readonly currentUser = signal<User | null>(this.auth.currentUser);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => this.syncAuthState(user));
  }

  waitForAuthState$(): Observable<User | null> {
    if (this.authInitialized) {
      return new Observable((subscriber) => {
        subscriber.next(this.currentUser());
        subscriber.complete();
      });
    }

    return this.authStateReady$.pipe(take(1));
  }

  async signInWithEmail(credentials: LoginCredentials): Promise<User> {
    const { email, password } = credentials;
    const result = await signInWithEmailAndPassword(this.auth, email.trim(), password);
    return result.user;
  }

  async registerWithEmail(credentials: RegisterCredentials): Promise<User> {
    const { displayName, email, password } = credentials;
    const result = await createUserWithEmailAndPassword(this.auth, email.trim(), password);

    if (displayName.trim()) {
      await updateProfile(result.user, { displayName: displayName.trim() });
    }

    return result.user;
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  async getIdToken(forceRefresh = false): Promise<string | null> {
    const user = this.auth.currentUser;

    if (!user) {
      return null;
    }

    return user.getIdToken(forceRefresh);
  }

  resolveError(error: unknown, fallback: string): string {
    return resolveFirebaseAuthError(error, fallback);
  }

  private syncAuthState(user: User | null): void {
    this.currentUser.set(user);
    this.userSubject.next(user);

    if (!this.authInitialized) {
      this.authInitialized = true;
      this.authStateReady$.next(user);
    }
  }
}
