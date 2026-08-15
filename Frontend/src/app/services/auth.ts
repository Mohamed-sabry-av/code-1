import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Enviroment } from '../enviroments/enivroments';
import { USER } from '../shared/models/user.model';
import { finalize, tap } from 'rxjs';
import { USERAUTH } from '../shared/models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = Enviroment.BASE_URL + '/auth';

  acessToken = signal<string | null>(localStorage.getItem('accessToken'));
  user = signal<USER | null>(JSON.parse(localStorage.getItem('user') ?? 'null'));

  isLoggedIn = computed(() => !!this.acessToken());
  //   isAdmin = computed(() => this.user()?.role === 'admin');

  constructor(private _http: HttpClient) {}

  private setSession(token: string, user: USER) {
    this.acessToken.set(token);
    this.user.set(user);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearSession() {
    this.acessToken.set(null);
    this.user.set(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  login(data: USERAUTH) {
    return this._http.post<any>(`${this.baseUrl}/login`, data, { withCredentials: true }).pipe(
      tap((response) => {
        this.setSession(response.data.token, {
          email: response.data.email,
          role: response.data.role,
        });
      }),
    );
  }

  logout() {
    return this._http
      .post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(finalize(() => this.clearSession())); // finalize why and not Tap
  }

  signup(data: USERAUTH) {
    return this._http.post<any>(`${Enviroment.BASE_URL}/user`, data);
  }
}
