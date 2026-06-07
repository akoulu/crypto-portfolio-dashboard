import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthFirebase } from '../../../../core/firebase/auth-firebase';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authFirebase = inject(AuthFirebase);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  async signInWithGoogle(): Promise<void> {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.authFirebase.signInWithGoogle();
      await this.router.navigate(['/dashboard']);
    } catch (err) {
      this.error.set(this.resolveErrorMessage(err));
    } finally {
      this.loading.set(false);
    }
  }

  private resolveErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'code' in error) {
      const code = String((error as { code: string }).code);

      if (code === 'auth/popup-closed-by-user') {
        return 'Sign-in was cancelled.';
      }
    }

    if (error instanceof Error && error.message) {
      return error.message;
    }

    return 'Unable to sign in with Google. Please try again.';
  }
}
