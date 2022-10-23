import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';
import { WebsiteActions } from './action-types';
import { CartDTO } from './models/cart.models';
import { CartService } from './services/cart.service';
import { CategoriesService } from './services/categories.service';
import { MetadataProductsService } from './services/metadata-products.service';
import { ProductsService } from './services/products.service';
import { allCategoriesLoaded, allMetadataProductsLoaded, allProductsLoaded, cartLoaded, itemLoaded } from './website.actions';

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

  loadMetadataProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WebsiteActions.loadMetadataProducts),
      concatMap(() => {
        return this.metadataProducts.getMetadata();
      }),
      map((metadata) => {
        return allMetadataProductsLoaded({ productMeta: metadata });
      })
    );
  });

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WebsiteActions.loadCart),
      concatMap(() => {
        return this.cart.getCart();
      }),
      map((cart) => {
        return cartLoaded({ cart });
      })
    );
  });

  AddItemCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WebsiteActions.addProductCart),
        concatMap((item) => {
          return this.cart.addItemCart(item.cartDto);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private categories: CategoriesService,
    private products: ProductsService,
    private metadataProducts: MetadataProductsService,
    private cart: CartService
  ) {}
}
