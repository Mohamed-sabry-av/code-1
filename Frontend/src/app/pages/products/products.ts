import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../services/product';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  private sub!: Subscription;

  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      console.log(response);
      this.products.set(response.products);
    });
  }
}
