import { ActionReducerMap } from '@ngrx/store';
import { cartReducer } from '../website/reducers/cart.reducer';
import { categoryReducer } from '../website/reducers/category.reducer';
import { metaProductsReducer } from '../website/reducers/metadata-products.reducer';
import { productReducer } from '../website/reducers/product.reducer';

export const reducers: ActionReducerMap<unknown> = {
  category: categoryReducer,
  product: productReducer,
  metaProducts: metaProductsReducer,
  cart: cartReducer,
};
