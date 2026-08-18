import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-admin-products',
  imports: [],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts implements OnInit{
  products = signal<Product[]>([])

  constructor(private proudctService:ProductService){}

  ngOnInit(){
    this.loadProducts()
  }

  loadProducts(){
    this.proudctService.getAllProducts().subscribe((response)=>{
      this.products.set(response.products)
    })
  }

  deleteProucts(){
    // this.proudctService.deleteProduct()
  }

}
