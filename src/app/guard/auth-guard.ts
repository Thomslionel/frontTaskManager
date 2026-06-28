import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/AuthService/auth';

export const authGuard: CanActivateFn = (route, state) => {
   const authService = inject(Auth);
  const router = inject(Router);

  const isLoggedIn = !!authService.getAccessToken();

  if (isLoggedIn) {
    return true;
  }

  // ❌ pas connecté → redirect login
  router.navigate(['/login']);
  return false;
};
