import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MetadataProductsState } from '../reducers/metadata-products.reducer';

export const selectMetadataProductsState = createFeatureSelector<MetadataProductsState>('metaProducts');

export const selectMetadataProducts = createSelector(selectMetadataProductsState, (meta) => {
  return meta.meta;
});

export const areMetadataProductsLoaded = createSelector(selectMetadataProductsState, (state) => {
  return state.allMetadataProductsLoaded;
});
