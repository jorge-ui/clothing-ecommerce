import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectAllShop = createSelector(
  [selectShop],
  shop => shop
);

export const selectHats = createSelector(
  [selectShop],
  shop => shop.find(collection => collection.title === 'Hats')
);

export const selectSneakers = createSelector(
  [selectShop],
  shop => shop.find(collection => collection.title === 'Sneakers')
);

export const selectJackets = createSelector(
  [selectShop],
  shop => shop.find(collection => collection.title === 'Jackets')
);

export const selectWomen = createSelector(
  [selectShop],
  shop => shop.find(collection => collection.title === 'Womens')
);

export const selectMens = createSelector(
  [selectShop],
  shop => shop.find(collection => collection.title === 'Mens')
);
