import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_ORIGIN } from './product';

export interface AuthUser {
  email: string;
  role: 'admin' | 'user';
}

interface LoginResponse {
  sucess: string;
  data: AuthUser & { token: string };
}

const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${API_ORIGIN}/auth`;
  private userUrl = `${API_ORIGIN}/user`;

  // بنبدأ بالقيمة المحفوظة في localStorage عشان اليوزر يفضل مسجل دخول بعد Refresh
  accessToken = signal<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));
  user = signal<AuthUser | null>(JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'));

  isLoggedIn = computed(() => !!this.accessToken());
  isAdmin = computed(() => this.user()?.role === 'admin');

  constructor(private _http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(`${this.baseUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(tap((res) => this.setSession(res.data.token, { email: res.data.email, role: res.data.role })));
  }

  signup(email: string, password: string) {
    return this._http.post<any>(this.userUrl, { email, password });
  }

  logout(): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(tap(() => this.clearSession()));
  }

  private setSession(token: string, user: AuthUser) {
    this.accessToken.set(token);
    this.user.set(user);
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private clearSession() {
    this.accessToken.set(null);
    this.user.set(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
