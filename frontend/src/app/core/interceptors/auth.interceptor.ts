import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const credentials = auth.getCredentials();

  if (credentials && req.url.includes('/api/admin')) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Basic ${credentials}`)
    });
    return next(cloned);
  }
  return next(req);
};
