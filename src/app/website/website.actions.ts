import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Cart, CartDTO, ItemsCart } from './models/cart.models';
import { Category } from './models/category.models';
import { MetadataProducts } from './models/metadata-products.models';
import { Product } from './models/product.models';

export const loadAllCategories = createAction('[Categories Resolver] Load All Categories');
export const allCategoriesLoaded = createAction('[Load Categories Effect] All Categories Loaded', props<{ categoryList: Category[] }>());

export const loadAllProducts = createAction('[Products Resolver] Load All Products');
export const allProductsLoaded = createAction('[Load Products Effect] All Products Loaded', props<{ productList: Product[] }>());

export const loadMetadataProducts = createAction("[Metadata Products resolver] Load All Products' Metadata");
export const allMetadataProductsLoaded = createAction("[Load Metadata Products Effect] All Products' Metadata Loaded", props<{ productMeta: MetadataProducts }>());

export const loadCart = createAction('[Cart Resolver] Load Cart');
export const cartLoaded = createAction('[Load Cart Effect] Cart Loaded', props<{ cart: Cart }>());

export const addProductCart = createAction('[Cart Button] Add Product Cart', props<{ cartDto: CartDTO }>());
export const itemLoaded = createAction('[Load Item Effect] Item Added', props<{ cart: Cart }>());
