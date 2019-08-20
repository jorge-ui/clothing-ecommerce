import React, { useState } from 'react';
import './checkout-item.styles.scss';
// Modules
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
// Actions
import { addItem, clearItem, removeItem } from '../../redux/cart/cart.actions';

const transitionConfig = {
  from: {
    opacity: 0,
    position: 'absolute'
  },
  enter: {
    transform: 'translateY(0)',
    opacity: 1
  },
  leave: {
    opacity: -0.2
  },
  config: {
    clamp: true
  }
};

const CheckoutItem = ({ item, addItem, clearItem, removeItem }) => {
  const [addUp, setAddUp] = useState(true);
  const { id, name, price, imageUrl, quantity } = item;

  const transition = useTransition(quantity, null, {
    ...transitionConfig,
    from: {
      ...transitionConfig.from,
      transform: `translateY(${addUp ? '-' : ''}25px)`
    },
    leave: {
      ...transitionConfig.leave,
      transform: `translateY(${!addUp ? '-' : ''}25px)`
    }
  });

  return (
    <div className="checkout-item">
      <div className="image-container">
        <div className="image-wrap">
          <img src={imageUrl} alt="item" />
        </div>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          onClick={() => removeItem(item) & setAddUp(false)}
          className="arrow"
        >
          <span>&#10094;</span>
        </div>
        <span className="value">
          {transition.map(({ item, key, props }) => (
            <animated.div key={key} style={props}>
              {item}
            </animated.div>
          ))}
        </span>
        <div onClick={() => addItem(item) & setAddUp(true)} className="arrow">
          <span>&#10095;</span>
        </div>
      </span>
      <span className="price">${price}</span>
      <span className="remove-button">
        <span onClick={() => clearItem(id)}>&#10006;</span>
      </span>
    </div>
  );
};

const mapActionsToProps = {
  clearItem,
  addItem,
  removeItem
};

export default connect(
  null,
  mapActionsToProps
)(CheckoutItem);
