import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, of, tap } from 'rxjs';
import { CartState } from '../reducers/cart.reducer';
import { isCartLoaded } from '../selectors/cart.selectors';
import { areCategoriesLoaded } from '../selectors/categories.selectors';
import { loadAllCategories, loadCart } from '../website.actions';

@Injectable()
export class CartResolver implements Resolve<boolean | CartState> {
  loading = false;
  constructor(private store: Store<CartState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | CartState> {
    return this.store.pipe(
      select(isCartLoaded),
      tap((cartLoaded) => {
        console.log(cartLoaded);
        if (!this.loading && !cartLoaded) {
          this.loading = true;
          this.store.dispatch(loadCart());
        }
      }),
      filter((cartLoaded) => {
        return cartLoaded;
      }),

      first(),

      finalize(() => {
        this.loading = false;
      })
    );
  }
}
