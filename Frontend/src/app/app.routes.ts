import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Home } from './pages/home/home';
import { NoFound } from './pages/no-found/no-found';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetails),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  { path: 'signup', loadComponent: () => import('./pages/signup/signup').then((m) => m.Signup) },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((response) => response.ADMIN_ROUTES),
    canActivate: [adminGuard],
  },
  { path: '**', component: NoFound },
];
