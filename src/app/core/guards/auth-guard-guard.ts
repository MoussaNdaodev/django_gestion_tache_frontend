import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { isPlatformBrowser } from '@angular/common';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 🔹 On détecte si on est côté navigateur
  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) {
    // côté serveur on laisse passer pour ne pas bloquer le SSR (j'ai activer le rendu coté serveur lorque j'ai créer le projet)
    return true;
  }

  // côté navigateur, on vérifie le token
  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;
};
