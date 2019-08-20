import React from 'react';
import './checkout-page.styles.scss';
// Components
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// Modules
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

const transitionConfig = {
  from: {
    opacity: 1
  },
  leave: {
    opacity: 0
  },
  config: {
    duration: 600
  }
};

const CheckoutPage = ({ cartItems, cartTotal }) => {
  const transition = useTransition(
    cartItems,
    item => item.id,
    transitionConfig
  );

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {transition.map(({ item, key }) => (
        <CheckoutItem item={item} key={key} />
      ))}
      <div className="cart-total">
        <span>TOTAL: ${cartTotal}</span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
