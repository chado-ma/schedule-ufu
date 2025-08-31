import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserData } from '../../models/UserData';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = 'http://localhost:3000/v1/auth';
  private tokenKey = 'auth-token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {{
      this.checkToken();
      const t: string | null = this.getToken();
      if (this.isAuthenticated() && t != null) {
        this.validateAuth(t).subscribe({
          next: (user) => {
            console.log('userLoggedIn:', user);
            localStorage.setItem('userLoggedIn', JSON.stringify(user));
          },
          error: () => {
            this.logout();
          }
        });
      }
  }}

  private checkToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token && this.isValidToken(token)) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.logout();
    }
  }

  private isValidToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  sendEmailCode(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseApiUrl}/email/send/${email}`, { headers });
  }

  verifyEmailCode(email: string, code: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  

    return this.http.post(`${this.baseApiUrl}/email/validate`, { email, code }, { headers });
  }

  gerenateAuth(userData: UserData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseApiUrl}`, userData, { 
      headers,
      responseType: 'text' // Aceita resposta em texto (token)
    });
  }

  validateAuth(token : string): Observable<User> {
    const TokenRequest = {
      'token': token
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(`${this.baseApiUrl}/validate`, TokenRequest, { headers });
  }

  

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  // Obter token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar se está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? this.isValidToken(token) : false;
  }

  // Obter dados do usuário
  getUser(): UserData | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Salvar dados do usuário
  saveUser(user: UserData): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserLoggedIn(): User | null {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    return userLoggedIn ? JSON.parse(userLoggedIn) : null;
  }
}
