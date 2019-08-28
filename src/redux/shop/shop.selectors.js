import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsArray = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const createCollectionSelectorByRouteName = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

export const selectCollectionsIsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectCollectionsIsLoaded = createSelector(
  [selectCollections],
  collections => !!collections
);
