import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthFirebase } from './auth-firebase';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authFirebase = inject(AuthFirebase);

  if (req.headers.has('Authorization')) {
    return next(req);
  }

  return from(authFirebase.getIdToken()).pipe(
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }),
  );
};
