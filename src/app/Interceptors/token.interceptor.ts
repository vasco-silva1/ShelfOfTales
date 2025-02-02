import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { TokenService } from '../Services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (inject(AuthService).hasToken()) {
    const theToken = JSON.parse(inject(TokenService).getToken('user'));
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${theToken.token}`)
    });
    return next(authRequest);
  }
  return next(req);
};
