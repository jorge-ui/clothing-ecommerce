import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsArray = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const createCollectionSelectorByRouteName = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );
