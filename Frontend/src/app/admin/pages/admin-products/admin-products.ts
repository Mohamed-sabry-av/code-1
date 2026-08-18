import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product';
import { Product } from '../../../shared/models/product.model';
import { ProductForm } from './product-form/product-form';

@Component({
  selector: 'app-admin-products',
  imports: [ProductForm],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit {
  products = signal<Product[]>([]);

  showModal = signal(false);
  editingProduct = signal<Product | null>(null);

  constructor(private proudctService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.proudctService.getAllProducts().subscribe((response) => {
      this.products.set(response.products);
    });
  }

  deleteProucts(id: string) {
    this.proudctService.deleteProduct(id).subscribe(() => {
      console.log('deleted');
      this.loadProducts();
    });
  }

  openAddModal():void{
    this.editingProduct.set(null);
    this.showModal.set(true);
  }

  openEditModal(product:Product):void{
    this.editingProduct.set(product)
    this.showModal.set(true)
  }

  onFormSaved():void{
    this.showModal.set(false)
    this.loadProducts()
  }
}
