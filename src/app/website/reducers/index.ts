import { ActionReducerMap } from '@ngrx/store';
import { categoryReducer } from './category.reducer';
import { productReducer } from './product.reducer';

export const reducers: ActionReducerMap<unknown> = {
  category: categoryReducer,
  product: productReducer,
};
