import React, { useEffect, useState } from 'react';
import './cart-item.styles.scss';

const CartItem = ({
  item: { imageUrl, price, name, quantity },
  i,
  ...otherProps
}) => {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const tiemout = setTimeout(() => setReveal(true), 250 + 60 * i);
    return () => clearTimeout(tiemout);
  }, [i]);
  return (
    <div className="cart-item" {...otherProps} revealed={String(reveal)}>
      <div style={{ backgroundImage: `url(${imageUrl})` }} className="img" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x {price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
