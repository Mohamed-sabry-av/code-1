import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../enviroments/enivroments';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = Enviroment.BASE_URL + `/product`;

  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get<any>(this.baseUrl);
  }

  getProductByID(id: string | null) {
    return this._http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product) {
    return this._http.post<any>(this.baseUrl, product);
  }

  updateProduct(id: string, product: Product) {
    return this._http.put<any>(`{this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this._http.delete<any>(`{this.baseUrl}/${id}`);
  }
}
