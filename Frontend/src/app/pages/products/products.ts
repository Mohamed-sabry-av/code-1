import { Component, signal } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe((response) => {
      console.log(response)
      this.products.set(response.products);
    });
  }
}
