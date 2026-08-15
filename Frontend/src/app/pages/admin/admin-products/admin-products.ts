import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-admin-products',
  imports: [RouterLink],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.products.set(response.products);
    });
  }

  onDelete(id: string): void {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe(() => {
      this.products.update((list) => list.filter((p) => p._id !== id));
    });
  }
}
