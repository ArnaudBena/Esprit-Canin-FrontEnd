import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const adherentGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.jwtInfo() == null) {
    return router.parseUrl('/login');
  }
  if (authService.jwtInfo()?.role !== 'ADHERENT') {
    toastService.show('Accès réservé aux adhérents', 'error');
    return router.parseUrl('/login');
  }
  return true;
};
