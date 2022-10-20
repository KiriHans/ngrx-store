import { createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.models';
import { category } from '../website.actions';

export const websiteFeatureKey = 'website';

export interface WebsiteState {
  categoryList: Category[];
}

const initialCategoryState: WebsiteState = {
  categoryList: [],
};

export const metaReducers: MetaReducer<WebsiteState>[] = !environment.production ? [] : [];

export const categoryReducer = createReducer(
  initialCategoryState,
  on(category, (state, action) => {
    return {
      categoryList: action.categoryList,
    };
  })
);
