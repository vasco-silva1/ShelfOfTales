import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { TokenService } from '../../Services/token.service';
import { inject } from '@angular/core';


export const managerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const expectedRole = 'manager';

  // 🔍 1. Verifica se o token é válido
  if (!tokenService.hasValidToken()) {
    authService.logout(); // Expulsa o usuário
    router.navigate(['signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // 🔍 2. Verifica se a role já está carregada no BehaviorSubject
  const userRole = authService.userSubject.value?.role;
  if (userRole === expectedRole) {
    return true; // ✅ Acesso permitido
  }

  // ❌ Se o usuário estiver autenticado, mas não for "client", bloqueia
  router.navigate(['/unauthorized']);
  return false;
};



