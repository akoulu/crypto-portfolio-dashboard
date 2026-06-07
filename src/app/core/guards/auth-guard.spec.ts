import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { vi } from 'vitest';
import { User } from 'firebase/auth';

import { AuthFirebase } from '../firebase/auth-firebase';
import { authGuard, guestGuard } from '../firebase/auth-firebase.guards';

describe('auth guards', () => {
  let waitForAuthState$: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    waitForAuthState$ = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthFirebase,
          useValue: { waitForAuthState$ },
        },
      ],
    });
  });

  it('authGuard should allow authenticated users', async () => {
    waitForAuthState$.mockReturnValue(of({ uid: 'user-1' } as User));

    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(authGuard({} as never, { url: '/dashboard' } as never) as ReturnType<typeof of>),
    );

    expect(result).toBe(true);
  });

  it('authGuard should redirect guests to login', async () => {
    waitForAuthState$.mockReturnValue(of(null));
    const router = TestBed.inject(Router);
    const tree = {} as UrlTree;
    vi.spyOn(router, 'createUrlTree').mockReturnValue(tree);

    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(authGuard({} as never, { url: '/dashboard' } as never) as ReturnType<typeof of>),
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/dashboard' },
    });
    expect(result).toBe(tree);
  });

  it('guestGuard should redirect authenticated users to dashboard', async () => {
    waitForAuthState$.mockReturnValue(of({ uid: 'user-1' } as User));
    const router = TestBed.inject(Router);
    const tree = {} as UrlTree;
    vi.spyOn(router, 'createUrlTree').mockReturnValue(tree);

    const result = await TestBed.runInInjectionContext(() =>
      firstValueFrom(guestGuard({} as never, {} as never) as ReturnType<typeof of>),
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/dashboard']);
    expect(result).toBe(tree);
  });
});
