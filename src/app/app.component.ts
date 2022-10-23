import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from './auth/auth.actions';
import { AuthState } from './auth/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'assignment9-store';
  loading = true;

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    const [userProfile, token] = [localStorage.getItem('user'), localStorage.getItem('token')];
    if (userProfile && token) {
      this.store.dispatch(login({ data: { token, user: JSON.parse(userProfile) } }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
