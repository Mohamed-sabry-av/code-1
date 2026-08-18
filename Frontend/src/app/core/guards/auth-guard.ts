import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
const route = inject(Router)

  if(authService.isLoggedIn()){
    return true
  }

  route.navigate(['/login'])

  return true;
};
