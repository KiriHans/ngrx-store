import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { WebsiteActions } from '../action-types';
import { Category } from '../models/category.models';

export interface CategoryState extends EntityState<Category> {
  allCategoriesLoaded: boolean;
}

export const categoryAdapter = createEntityAdapter<Category>();
export const initialCategoryState = categoryAdapter.getInitialState();

export const categoryReducer = createReducer(
  initialCategoryState,
  on(WebsiteActions.allCategoriesLoaded, (state, action) => {
    return categoryAdapter.setAll(action.categoryList, { ...state, allCategoriesLoaded: true });
  })
);

export const { selectAll } = categoryAdapter.getSelectors();
