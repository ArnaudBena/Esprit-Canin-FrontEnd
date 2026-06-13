import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const coachGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.jwtInfo() == null) {
    return router.parseUrl('/login');
  }
  if (authService.jwtInfo()?.role !== 'COACH') {
    toastService.show('Accès réservé aux coachs', 'error');
    return router.parseUrl('/login');
  }
  return true;
};
