import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { isPlatformBrowser } from '@angular/common';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    // côté serveur, on laisse passer pour le SSR
    return true;
  }

  const userRole = authService.getUserRole();

  if (userRole !== 'admin') {
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
};
