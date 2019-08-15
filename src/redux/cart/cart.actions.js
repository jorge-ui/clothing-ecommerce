import { SET_SHOW_PREVIEW, ADD_ITEM } from './cart.types';

export const setShowPreview = val => ({
  type: SET_SHOW_PREVIEW,
  payload: val
});

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item
});
