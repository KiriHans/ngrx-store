import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import * as fromProducts from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(selectProductsState, fromProducts.selectAll);

export const areProductsLoaded = createSelector(selectProductsState, (state) => {
  return state.allProductsLoaded;
});
