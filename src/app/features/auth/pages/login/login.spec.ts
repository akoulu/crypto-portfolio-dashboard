import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { Auth } from '../../../../core/services/auth';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let auth: {
    signInWithGoogle: ReturnType<typeof vi.fn>;
    signInWithEmail: ReturnType<typeof vi.fn>;
    navigateAfterAuth: ReturnType<typeof vi.fn>;
    resolveError: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    auth = {
      signInWithGoogle: vi.fn().mockResolvedValue({ uid: 'test-user' }),
      signInWithEmail: vi.fn().mockResolvedValue({ uid: 'test-user' }),
      navigateAfterAuth: vi.fn().mockResolvedValue(undefined),
      resolveError: vi.fn().mockReturnValue('Error'),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), { provide: Auth, useValue: auth }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign in with Google and redirect', async () => {
    await component.signInWithGoogle();

    expect(auth.signInWithGoogle).toHaveBeenCalled();
    expect(auth.navigateAfterAuth).toHaveBeenCalled();
  });
});
