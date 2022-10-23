import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { MetadataProductsState } from '../reducers/metadata-products.reducer';
import { areMetadataProductsLoaded } from '../selectors/metadata-products.selectors';
import { loadAllProducts, loadMetadataProducts } from '../website.actions';

@Injectable()
export class MetadataProductsResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store<MetadataProductsState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(areMetadataProductsLoaded),
      tap({
        next: (metaLoaded) => {
          if (!this.loading && !metaLoaded) {
            this.loading = true;
            this.store.dispatch(loadMetadataProducts());
          }
        },
      }),
      filter((metaLoaded) => {
        return metaLoaded;
      }),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
