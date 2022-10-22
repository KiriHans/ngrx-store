import { createAction, props } from '@ngrx/store';
import { Category } from './models/category.models';
import { Product } from './models/product.models';

export const loadAllCategories = createAction('[Categories Resolver] Load All Categories');

export const allCategoriesLoaded = createAction('[Load Categories Effect] All Categories Loaded', props<{ categoryList: Category[] }>());

export const loadAllProducts = createAction('[Products Resolver] Load All Products');

export const allProductsLoaded = createAction('[Load Products Effect] All Products Loaded', props<{ productList: Product[] }>());
