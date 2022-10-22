import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from '../reducers/category.reducer';
import * as fromCategories from '../reducers/category.reducer';

export const selectCategoriesState = createFeatureSelector<CategoryState>('category');

export const selectAllCategories = createSelector(selectCategoriesState, fromCategories.selectAll);

export const areCategoriesLoaded = createSelector(selectCategoriesState, (state) => {
  return state.allCategoriesLoaded;
});
