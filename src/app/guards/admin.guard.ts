import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  // pas connecté -> login
  if (authService.jwtInfo() == null) {
    return router.parseUrl('/login');
  }

  // connecté mais pas admin -> login + message
  if (authService.jwtInfo()?.role !== 'ADMIN') {
    toastService.show("Accès réservé à l'administration", 'error');
    return router.parseUrl('/login');
  }

  return true;
};
