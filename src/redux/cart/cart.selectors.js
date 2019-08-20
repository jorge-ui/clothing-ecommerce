import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartQuantity = createSelector(
  [selectCartItems],
  items => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  items => items.reduce((sum, item) => sum + item.quantity * item.price, 0)
);
