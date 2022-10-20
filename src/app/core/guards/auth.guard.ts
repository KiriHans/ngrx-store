import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    if (this.auth.isLoggedIn) {
      return true;
    }

    this.auth.redirectUrl = url;
    return this.router.parseUrl('/auth/login');
  }

  constructor(private auth: AuthService, private router: Router) {}
}
