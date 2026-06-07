import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { AUTH_RETURN_URL_QUERY_PARAM } from '../../../../core/firebase/auth-firebase.models';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async signInWithEmail(): Promise<void> {
    if (this.loading()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.auth.signInWithEmail(this.form.getRawValue());
      await this.redirectAfterAuth();
    } catch (err) {
      this.error.set(this.auth.resolveError(err, 'Unable to sign in. Please try again.'));
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.auth.signInWithGoogle();
      await this.redirectAfterAuth();
    } catch (err) {
      this.error.set(this.auth.resolveError(err, 'Unable to sign in with Google. Please try again.'));
    } finally {
      this.loading.set(false);
    }
  }

  private async redirectAfterAuth(): Promise<void> {
    const returnUrl = this.route.snapshot.queryParamMap.get(AUTH_RETURN_URL_QUERY_PARAM);
    await this.auth.navigateAfterAuth(returnUrl);
  }
}
