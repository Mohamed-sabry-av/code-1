import { Component, OnInit, signal } from '@angular/core';
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
export class ProductDetails implements OnInit {
  product = signal<Product | null>(null);
  date = new Date();
  id: string | null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getProduct(this.id);
  }

  getProduct(id: string | null) {
    this.productService.getProductByID(id).subscribe((response) => {
      this.product.set(response.product);
    });
  }
}
