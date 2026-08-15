import { Component, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { DatePipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { TruncatePipe } from '../../shared/pipes/truncate-pipe';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, LowerCasePipe, DatePipe, TruncatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product = signal<Product | null>(null);
  date = new Date();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    this.productService.getProductByID(id).subscribe((response) => {
      console.log(response);
      this.product.set(response.product);
    });
  }
}
