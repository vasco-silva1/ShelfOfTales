import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtém a Role esperada da rota
  const expectedRole = route.data?.['role'];
  // Obtém a Role real do usuário
  const userRole = authService.role();

  if (authService.hasToken() && userRole === expectedRole) {
    return true; // Permite o acesso se as Roles coincidirem
  }

  // Redireciona para a página de "Não autorizado"
  router.navigate(['/unauthorized'], { queryParams: { returnUrl: state.url } });
  return false;



  
  return true;
};
