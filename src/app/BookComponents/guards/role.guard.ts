import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleRedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role: string | undefined = this.authService.userSubject.value?.role;

    // Redirect based on role
    if (role === 'client') {
      this.router.navigate(['/client']);
    } else if (role === 'manager') {
      this.router.navigate(['/manager']);
    } else {
      this.router.navigate(['']);
    }

    // Always return false to prevent access if guard is triggered
    return false;
  }
}