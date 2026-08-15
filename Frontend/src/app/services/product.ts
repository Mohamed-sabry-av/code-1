import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/product';

  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get<any>(this.baseUrl);
  }

  getProductByID(id: string|null) {
    return this._http.get<any>(`${this.baseUrl}/${id}`);
  }
}
