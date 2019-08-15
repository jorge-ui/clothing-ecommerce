import { ADD_ITEM } from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload)
      };

    default:
      return state;
  }
};

export default cartReducer;
