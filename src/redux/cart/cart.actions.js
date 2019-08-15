import { ADD_ITEM } from './cart.types';

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});
