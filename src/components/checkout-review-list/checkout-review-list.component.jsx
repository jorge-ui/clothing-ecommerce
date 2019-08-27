import React from 'react';
import './checkout-review-list.styles.scss';
// Components
import CheckoutReviewItem from '../checkout-review-item/checkout-review-item.component';
// Modules
import { useTransition, animated } from 'react-spring';
import { easeOutCubic, easeOutQuart } from '../../utils/easingFuctions';
// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CheckoutReviewList = ({ cartItems }) => {
  const transition = useTransition(
    cartItems,
    item => item.id,
    transitionConfig
  );
  return (
    <div className="checkout-review-list">
      {transition.map(({ item, key, props }) => (
        <animated.div key={key} style={props} className="animated-item">
          <CheckoutReviewItem item={item} />
        </animated.div>
      ))}
      <div
        className="empty-cart"
        revealed={String(Boolean(cartItems.length === 0))}
      >
        Your cart is empty.
      </div>
    </div>
  );
};

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
  leave: () => async next => {
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

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CheckoutReviewList);
