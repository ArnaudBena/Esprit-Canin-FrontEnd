import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Réservé aux non-connectés : un utilisateur déjà connecté est renvoyé vers son espace.
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.jwtInfo() != null) {
    return router.parseUrl(authService.espaceUrl());
  }
  return true;
};
