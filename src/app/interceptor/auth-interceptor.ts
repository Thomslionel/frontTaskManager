import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from '../services/AuthService/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);

  const token = authService.getAccessToken();

  // 1. Ajouter le token si présent
  let authReq = req;

  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Envoyer la requête
  return next(authReq).pipe(

    catchError((error: any) => {

      // ❌ TOKEN EXPIRÉ
      if (error.status === 401) {

        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          authService.logout();
          return throwError(() => error);
        }

        // 🔁 refresh token
        return authService.refreshToken().pipe(

          switchMap((res: any) => {

            const newToken = res.accessToken;

            localStorage.setItem('accessToken', newToken);

            // 🔁 rejouer requête initiale
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });

            return next(retryReq);
          }),

          catchError(err => {
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};