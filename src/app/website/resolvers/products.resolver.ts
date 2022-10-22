import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, of, tap } from 'rxjs';
import { ProductState } from '../reducers/product.reducer';
import { areProductsLoaded } from '../selectors/products.selectors';
import { loadAllProducts } from '../website.actions';

@Injectable()
export class ProductsResolver implements Resolve<Boolean> {
  loading = false;
  constructor(private store: Store<ProductState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Boolean> {
    return this.store.pipe(
      select(areProductsLoaded),
      tap({
        next: (productsLoaded) => {
          if (!this.loading && !productsLoaded) {
            this.loading = true;
            this.store.dispatch(loadAllProducts());
          }
        },
      }),
      filter((coursesLoaded) => {
        return coursesLoaded;
      }),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
