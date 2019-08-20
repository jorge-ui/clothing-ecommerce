import React from 'react';
import './checkout-item.styles.scss';

const CheckoutItem = ({ item: { name, price, imageUrl, quantity } }) => (
  <div className="checkout-item">
    <div className="image-container">
      <div className="image-wrap">
        <img src={imageUrl} alt="item" />
      </div>
    </div>
    <span className="name">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">${price}</span>
    <span className="remove-button">
      <span>&#10006;</span>
    </span>
  </div>
);

export default CheckoutItem;
