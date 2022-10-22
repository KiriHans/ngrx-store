import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authreq = this.addTokenHeader(request, this.auth.getToken());
    return next.handle(authreq).pipe(
      catchError((error: Response) => {
        this.auth.logout();
        throw error;
      })
    );
  }

  addTokenHeader(request: HttpRequest<unknown>, token: string | null) {
    return request.clone({ headers: request.headers.set('Authorization', `bearer ${token}`) });
  }
}
