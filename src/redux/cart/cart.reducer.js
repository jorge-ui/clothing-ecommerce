import { ADD_ITEM, CLEAR_ITEM, REMOVE_ITEM } from './cart.types';
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

    case CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== payload)
      };

    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item
        )
      };

    default:
      return state;
  }
};

export default cartReducer;
