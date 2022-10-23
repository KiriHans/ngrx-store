import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap, tap } from 'rxjs';
import { logOut } from 'src/app/auth/auth.actions';
import { User } from 'src/app/auth/models/user.models';
import { isLoggedIn, isLoggedOut, selectUserProfile } from 'src/app/auth/selectors/auth.selectors';
import { Category } from '../../models/category.models';
import { Product } from '../../models/product.models';
import { selectAllCategories } from '../../selectors/categories.selectors';
import { selectAllProducts, selectProductsByCategory, selectSearchedProducts } from '../../selectors/products.selectors';
import { ProductByCategoryService } from '../../services/product-by-category.service';

@Component({
  selector: 'website-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  categoryList$!: Observable<Category[]>;
  productListSearched$ = this.searchAutoComplete('weath');

  mySearchBar!: FormControl;
  productsByCategory$!: Observable<Product[]>;

  userProfile$!: Observable<User | null>;
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  constructor(private router: Router, private store: Store<Category[]>, private productByCategoryService: ProductByCategoryService) {
    this.mySearchBar = new FormControl('');
  }

  ngOnInit(): void {
    this.categoryList$ = this.store.pipe(select(selectAllCategories));

    this.userProfile$ = this.store.pipe(select(selectUserProfile));

    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.productListSearched$ = this.mySearchBar.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((searchedProduct) => {
        if (searchedProduct) {
          return this.searchAutoComplete(searchedProduct);
        }
        return of([]);
      })
    );
  }

  logIn() {
    this.router.navigateByUrl('/login');
  }

  logOut() {
    this.store.dispatch(logOut());
  }

  searchAutoComplete(searchedProduct: string) {
    return this.store.pipe(select(selectSearchedProducts(searchedProduct)));
  }

  filterByCategory(category: string) {
    this.productByCategoryService.getProductsByCategory(category);
  }
}
