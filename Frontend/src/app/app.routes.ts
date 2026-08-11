import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Home } from './pages/home/home';
import { NoFound } from './pages/no-found/no-found';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetails },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '**', component: NoFound },
];
