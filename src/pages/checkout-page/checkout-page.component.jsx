import React from 'react';
import './checkout-page.styles.scss';
// Components
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CheckoutForm from '../../components/checkout-form/checkout-form.component';
// Modules
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

const easeOutCubic = t => --t * t * t + 1;
const easeOutQuart = t => 1 - --t * t * t * t;

const transitionConfig = {
  unique: true,
  trail: 55,
  from: {
    opacity: 0,
    transform: 'translate(0px, 100px)',
    height: 130
  },
  enter: {
    opacity: 1,
    transform: 'translate(0px, 0px)'
  },
  leave: item => async next => {
    await next({
      opacity: 0,
      transform: 'translate(-200px, 0px)',
      config: { duration: 200, easing: easeOutCubic }
    });
    await next({ height: 0, config: { duration: 400, easing: easeOutQuart } });
  },
  config: {
    duration: 400,
    easing: easeOutCubic
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
      <div className="checkout-panel">
        <div className="panel-review">
          <div className="review-header">
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
              <span>Clear</span>
            </div>
          </div>
          <div className="review-items">
            {transition.map(({ item, key, props }) => (
              <animated.div key={key} style={props} className="animated-item">
                <CheckoutItem item={item} />
              </animated.div>
            ))}
          </div>
        </div>
        <div className="panel-order">
          <div className="order-header">Order</div>
          <CheckoutForm
            price={cartTotal}
            formdisabled={Boolean(cartItems.length === 0)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
