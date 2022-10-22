import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { WebsiteActions } from './action-types';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { allCategoriesLoaded, allProductsLoaded } from './website.actions';

@Injectable()
export class WebsiteEffects {
  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WebsiteActions.loadAllCategories),
      concatMap(() => {
        return this.categories.getCategories();
      }),
      map((categories) => {
        return allCategoriesLoaded({ categoryList: categories });
      })
    );
  });

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WebsiteActions.loadAllProducts),
      concatMap(() => {
        return this.products.getProducts();
      }),
      map((products) => {
        return allProductsLoaded({ productList: products });
      })
    );
  });

  constructor(private actions$: Actions, private categories: CategoriesService, private products: ProductsService) {}
}
