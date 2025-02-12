import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { map, Observable, take } from 'rxjs';
import { TokenService } from '../../Services/token.service';



export const clientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const expectedRole = 'client';

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

  // Se a role ainda não estiver carregada, busca do servidor
  // return authService.getUserRoleInTime().pipe(
  //   take(1), // Garante que pegamos apenas o primeiro valor emitido
  //   map((role) => {
  //     if (authService.hasToken() && role === expectedRole) {
  //       return true; // Acesso permitido
  //     }
  //     router.navigate(['/unauthorized'], { queryParams: { returnUrl: state.url } });
  //     return false; // Acesso negado
  //   })
  // );


