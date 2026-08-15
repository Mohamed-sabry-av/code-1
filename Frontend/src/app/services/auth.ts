import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Enviroment } from '../enviroments/enivroments';
import { USER } from '../shared/models/user.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = Enviroment.BASE_URL + '/auth';  //http://localhost:3000/auth

  acessToken = signal<string | null>(localStorage.getItem('accessToken'));
  user = signal<USER | null>(JSON.parse(localStorage.getItem('user') ?? 'null'));

  //   isLoggedIn = computed(() => !!this.acessToken());
  //   isAdmin = computed(() => this.user()?.role === 'admin');

  constructor(private _http: HttpClient) {}

  private setSession(token: string, user: USER) {
    this.acessToken.set(token);
    this.user.set(user);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(email: string, password: string) { 
    return this._http.post<any>(`${this.baseUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        this.setSession(response.data.token, {
          email: response.data.email,
          role: response.data.role,
        });
      }),
    );
  }
}
