import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const route = inject(Router);

  if(authService.isLoggedIn()&&authService.isAdmin()){
    return true
  }

    route.navigate(['/'])

  return true;
};
