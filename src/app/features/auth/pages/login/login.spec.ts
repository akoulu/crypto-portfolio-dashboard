import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { AuthFirebase } from '../../../../core/firebase/auth-firebase';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authFirebase: { signInWithGoogle: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authFirebase = {
      signInWithGoogle: vi.fn().mockResolvedValue({ uid: 'test-user' }),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthFirebase, useValue: authFirebase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign in with Google and navigate to dashboard', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await component.signInWithGoogle();

    expect(authFirebase.signInWithGoogle).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});
