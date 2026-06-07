import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthFirebase } from './auth-firebase';
import {
  AUTH_DEFAULT_REDIRECT,
  AUTH_LOGIN_PATH,
  AUTH_RETURN_URL_QUERY_PARAM,
} from './auth-firebase.models';

export const authGuard: CanActivateFn = (_route, state) => {
  const authFirebase = inject(AuthFirebase);
  const router = inject(Router);

  return authFirebase.waitForAuthState$().pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      }

      return router.createUrlTree([AUTH_LOGIN_PATH], {
        queryParams: { [AUTH_RETURN_URL_QUERY_PARAM]: state.url },
      });
    }),
  );
};

export const guestGuard: CanActivateFn = () => {
  const authFirebase = inject(AuthFirebase);
  const router = inject(Router);

  return authFirebase.waitForAuthState$().pipe(
    take(1),
    map((user) => {
      if (!user) {
        return true;
      }

      return router.createUrlTree([AUTH_DEFAULT_REDIRECT]);
    }),
  );
};
