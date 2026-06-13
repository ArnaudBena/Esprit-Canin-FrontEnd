import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 401 = problème d'authentification, géré par la page login / les guards
      if (error.status !== 401) {
        const message = error.error?.erreur ?? 'Une erreur est survenue';
        toastService.show(message, 'error');
      }
      return throwError(() => error);
    })
  );
};
