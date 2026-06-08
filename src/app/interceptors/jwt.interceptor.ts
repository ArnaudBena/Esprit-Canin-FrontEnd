import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    // on clone la requête en ajoutant le header Authorization
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${jwt}` },
    });
  }

  return next(req);
};
