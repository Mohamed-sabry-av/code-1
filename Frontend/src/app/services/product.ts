import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Enviroment} from '../enviroments/enivroments'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = Enviroment.BASE_URL + `/product`;

  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get<any>(this.baseUrl);
  }

  getProductByID(id: string|null) {
    return this._http.get<any>(`${this.baseUrl}/${id}`);
  }
}
