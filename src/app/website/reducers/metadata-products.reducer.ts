import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { MetadataProducts } from '../models/metadata-products.models';
import { allMetadataProductsLoaded } from '../website.actions';

export const metadataProductsFeatureKey = 'metadataProducts';

export interface MetadataProductsState {
  meta: MetadataProducts | null;
  allMetadataProductsLoaded: boolean;
}

export const initialMetadataProductsState: MetadataProductsState = {
  meta: null,
  allMetadataProductsLoaded: false,
};

export const metaProductsReducer = createReducer(
  initialMetadataProductsState,
  on(allMetadataProductsLoaded, (state, action) => {
    return {
      meta: action.productMeta,
      allMetadataProductsLoaded: true,
    };
  })
);
