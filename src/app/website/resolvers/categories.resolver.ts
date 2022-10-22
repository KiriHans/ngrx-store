import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, of, tap } from 'rxjs';
import { CategoryState } from '../reducers/category.reducer';
import { areCategoriesLoaded } from '../selectors/categories.selectors';
import { loadAllCategories } from '../website.actions';

@Injectable()
export class CategoriesResolver implements Resolve<boolean | CategoryState> {
  loading = false;
  constructor(private store: Store<CategoryState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | CategoryState> {
    return this.store.pipe(
      select(areCategoriesLoaded),
      tap((categoriesLoaded) => {
        if (!this.loading && !categoriesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCategories());
        }
      }),
      filter((categoriesLoaded) => {
        return categoriesLoaded;
      }),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
