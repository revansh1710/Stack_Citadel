import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router=inject(Router)
  if (authService.isLoggedInGuard) {
    return true 
  } else {
    router.navigate(['/login']);
    return false
  }
};
