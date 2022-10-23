import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';
import * as fromCart from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(selectCartState, fromCart.selectAll);

export const selectItemIds = createSelector(selectCartState, fromCart.selectItemsIds);
export const getSelectedUserId = (state: CartState) => state.id;

export const selectCurrentItemId = createSelector(selectCartState, getSelectedUserId);

export const isCartLoaded = createSelector(selectCartState, (state) => {
  return state.cartLoaded;
});
