import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { logOut } from 'src/app/auth/auth.actions';
import { User } from 'src/app/auth/models/user.models';
import { isLoggedIn, isLoggedOut, selectUserProfile } from 'src/app/auth/selectors/auth.selectors';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from '../../models/category.models';
import { selectAllCategories } from '../../selectors/categories.selectors';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'website-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  categoryList$!: Observable<Category[]>;
  userProfile$!: Observable<User | null>;
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  constructor(private router: Router, private store: Store<Category[]>) {}

  ngOnInit(): void {
    this.categoryList$ = this.store.pipe(select(selectAllCategories));
    this.userProfile$ = this.store.pipe(select(selectUserProfile));

    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logIn() {
    this.router.navigateByUrl('/login');
  }

  logOut() {
    this.store.dispatch(logOut());
  }
}
