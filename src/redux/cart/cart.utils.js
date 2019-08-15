export const addItemToCart = (cartItems, itemToAdd) => {
  const itemExist = cartItems.some(cartItem => cartItem.id === itemToAdd.id);

  if (itemExist) {
    return cartItems.map(cartItem =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};
