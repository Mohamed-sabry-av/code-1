import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const API_ORIGIN = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${API_ORIGIN}/product`;

  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get<any>(this.baseUrl);
  }

  getProductByID(id: string|null) {
    return this._http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProduct(formData: FormData) {
    return this._http.post<any>(this.baseUrl, formData);
  }

  updateProduct(id: string, data: any) {
    return this._http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this._http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
