import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { WebsiteActions } from '../action-types';
import { Cart, ItemsCart } from '../models/cart.models';

export const cartFeatureKey = 'cart';

export interface CartState extends EntityState<ItemsCart> {
  id: string | null;
  user_id: string | null;
  number: string | null;
  status: string | null;
  total: string | null;
  total_items: string | null;
  completed_at: string | null;
  created_at: string | null;
  cartLoaded: boolean;
}

export const CartAdapter = createEntityAdapter<ItemsCart>({
  selectId: (item) => item.product_id,
});
export const initialCartState: CartState = CartAdapter.getInitialState({
  id: null,
  user_id: null,
  number: null,
  status: null,
  total: null,
  total_items: null,
  completed_at: null,
  created_at: null,
  cartLoaded: false,
});

export const cartReducer = createReducer(
  initialCartState,
  on(WebsiteActions.cartLoaded, (state, action) => {
    return CartAdapter.setAll(action.cart.items, { ...state, ...action.cart, cartLoaded: true });
  }),
  on(WebsiteActions.itemLoaded, (state, action) => {
    return CartAdapter.addOne(action.item, state);
  }),
  on(WebsiteActions.upsertItem, (state, action) => {
    return CartAdapter.upsertOne(action.item, state);
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = CartAdapter.getSelectors();
