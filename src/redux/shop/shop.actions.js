import { SET_COLLECTIONS } from './shop.types';

export const setCollections = collections => ({
  type: SET_COLLECTIONS,
  payload: collections
});
