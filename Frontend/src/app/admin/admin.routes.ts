import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AdminProducts } from './pages/admin-products/admin-products';
import { AdminUsers } from './pages/admin-users/admin-users';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: AdminProducts },
      { path: 'users', component: AdminUsers },
    ],
  },
];
