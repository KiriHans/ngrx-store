import { createAction, props } from '@ngrx/store';
import { Category } from './models/category.models';

export const category = createAction('[Nav-Bar Page] Show Category List', props<{ categoryList: Category[] }>());
