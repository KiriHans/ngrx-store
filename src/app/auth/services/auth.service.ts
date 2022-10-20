import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Login, LoginDto } from '../models/login.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTHURL = 'https://trainee-program-api-staging.applaudostudios.com/api/v1';

  isLoggedIn = localStorage.getItem('accessToken') !== null;

  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { data: LoginDto }): Observable<{ data: Login }> {
    return this.http.post<{ data: Login }>(`${this.AUTHURL}/users/login`, credentials).pipe(
      tap({
        next: () => {
          this.isLoggedIn = true;
        },
        error: () => {
          this.isLoggedIn = false;
        },
      }),
      catchError((error: Response) => {
        if (error.status == 401) {
          throw new Error('The username/password is invalid');
        } else {
          throw new Error('Somenthing happened');
        }
      })
    );
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  getLocalStorageUserInfo() {
    return localStorage.getItem('user');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
  }

  saveTokens(response: Login) {
    localStorage.setItem('token', response.token);
  }
}
