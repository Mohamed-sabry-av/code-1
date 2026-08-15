import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.acessToken()

  if(!token){
    return next(req) //without accessToken
  }

  const authReq = req.clone({
    setHeaders:{ Authorization: `Bearer ${token}`}
  })
  console.log(authReq)
  return next(authReq);
};
