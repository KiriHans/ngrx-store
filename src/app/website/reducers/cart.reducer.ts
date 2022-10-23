import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { WebsiteActions } from '../action-types';
import { Cart, ItemsCart } from '../models/cart.models';

export const cartFeatureKey = 'cart';

export interface CartState extends EntityState<ItemsCart> {
  id: 'string';
  user_id: 'string';
  number: 'string';
  status: 'string';
  total: 'string';
  total_items: 'string';
  completed_at: 'string';
  created_at: 'string';
  cartLoaded: boolean;
}

export const CartAdapter = createEntityAdapter<ItemsCart>();
export const initialCartState = CartAdapter.getInitialState();

export const cartReducer = createReducer(
  initialCartState,
  on(WebsiteActions.cartLoaded, (state, action) => {
    return CartAdapter.setAll(action.cart.items, { ...state, ...action.cart, cartLoaded: true });
  }),
  on(WebsiteActions.itemLoaded, (state, action) => {
    return CartAdapter.setAll(action.cart.items, { ...state, ...action.cart, cartLoaded: true });
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = CartAdapter.getSelectors();

export const selectItemsIds = selectIds;
