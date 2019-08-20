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

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const itemOnCart = cartItems.find(
    cartItem => cartItem.id === itemToRemove.id
  );

  if (itemOnCart.quantity < 2) {
    return cartItems.filter(item => item.id !== itemToRemove.id);
  } else {
    return cartItems.map(item =>
      item.id === itemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};
