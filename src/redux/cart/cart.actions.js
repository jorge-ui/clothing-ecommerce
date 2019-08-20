import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM } from './cart.types';

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});

export const clearItem = id => ({
  type: CLEAR_ITEM,
  payload: id
});

export const removeItem = item => ({
  type: REMOVE_ITEM,
  payload: item
});
