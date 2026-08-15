import { Routes } from '@angular/router';
import { AdminProducts } from './admin-products/admin-products';
import { ProductForm } from './product-form/product-form';
import { AdminUsers } from './admin-users/admin-users';

export const adminRoutes: Routes = [
  { path: 'products', component: AdminProducts },
  { path: 'products/new', component: ProductForm },
  { path: 'products/:id/edit', component: ProductForm },
  { path: 'users', component: AdminUsers },
];
