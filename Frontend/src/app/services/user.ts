import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ORIGIN } from './product';

export interface AppUser {
  _id: string;
  email: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${API_ORIGIN}/user`;

  constructor(private _http: HttpClient) {}

  getAllUsers() {
    return this._http.get<{ status: string; users: AppUser[] }>(this.baseUrl);
  }

  updateUserRole(id: string, role: 'admin' | 'user') {
    return this._http.put<any>(`${this.baseUrl}/${id}`, { role });
  }

  deleteUser(id: string) {
    return this._http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
