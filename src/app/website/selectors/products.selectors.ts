import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import * as fromProducts from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(selectProductsState, fromProducts.selectAll);

// export const selectProduct = createSelector(selectProductsState, state => state.);

export const areProductsLoaded = createSelector(selectProductsState, (state) => {
  return state.allProductsLoaded;
});

export function selectProductById(id: string | number) {
  return createSelector(selectAllProducts, (products) => {
    return products.filter((product) => {
      return +product.id === +id;
    })[0];
  });
}

export function selectSearchedProducts(searchedProduct: string) {
  const filterValue = searchedProduct.toLowerCase();
  return createSelector(selectAllProducts, (products) => {
    return products.filter((product) => product.name.toLowerCase().includes(filterValue));
  });
}

export function selectProductsByCategory(category: string) {
  return createSelector(selectAllProducts, (products) => {
    return products.filter((product) => product.category?.name === category);
  });
}
