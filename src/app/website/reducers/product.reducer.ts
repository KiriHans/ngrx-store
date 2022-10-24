import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.models';
import { Addlike, allProductsLoaded } from '../website.actions';

export interface ProductState extends EntityState<Product> {
  allProductsLoaded: boolean;
}

export const productAdapter = createEntityAdapter<Product>();
export const initialProductState = productAdapter.getInitialState();

export const productReducer = createReducer(
  initialProductState,
  on(allProductsLoaded, (state, action) => {
    return productAdapter.setAll(action.productList, { ...state, allProductsLoaded: true });
  }),
  on(Addlike, (state, action) => {
    return productAdapter.updateOne(action.update, state);
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = productAdapter.getSelectors();
