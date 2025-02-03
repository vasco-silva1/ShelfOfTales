import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TokenService } from '../Services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  // Verifica se o usuário está autenticado e o token existe
  if (authService.hasToken()) {
    try {
      const storedUser = tokenService.getToken('user');
      const parsedUser = JSON.parse(storedUser);

      // Verifica se o token existe no objeto
      if (parsedUser?.token) {
        const authRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${parsedUser.token}`),
        });
        return next(authRequest);
      }
    } catch (err) {
      console.error('Erro ao processar o token:', err);
      // Se ocorrer um erro ao processar o token, segue sem modificações
      return next(req);
    }
  }

  // Se o token não for encontrado ou inválido, segue com a requisição original
  return next(req);
};
