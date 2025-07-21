import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (authService.isAuthenticated() && token && authService.validateAuth(token)) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
