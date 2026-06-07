import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebase } from '../firebase/auth-firebase';
import {
  AUTH_DEFAULT_REDIRECT,
  LoginCredentials,
  RegisterCredentials,
} from '../firebase/auth-firebase.models';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly authFirebase = inject(AuthFirebase);
  private readonly router = inject(Router);

  readonly user = this.authFirebase.user;
  readonly isAuthenticated = this.authFirebase.isAuthenticated;
  readonly user$ = this.authFirebase.user$;

  signInWithEmail(credentials: LoginCredentials) {
    return this.authFirebase.signInWithEmail(credentials);
  }

  registerWithEmail(credentials: RegisterCredentials) {
    return this.authFirebase.registerWithEmail(credentials);
  }

  signInWithGoogle() {
    return this.authFirebase.signInWithGoogle();
  }

  signOut() {
    return this.authFirebase.signOut();
  }

  resolveError(error: unknown, fallback: string) {
    return this.authFirebase.resolveError(error, fallback);
  }

  async navigateAfterAuth(returnUrl?: string | null): Promise<void> {
    const target = returnUrl?.startsWith('/') ? returnUrl : AUTH_DEFAULT_REDIRECT;
    await this.router.navigateByUrl(target);
  }
}
