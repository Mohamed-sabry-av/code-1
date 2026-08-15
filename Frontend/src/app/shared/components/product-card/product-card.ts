import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, TruncatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
}
