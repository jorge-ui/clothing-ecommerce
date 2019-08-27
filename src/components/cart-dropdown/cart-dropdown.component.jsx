import React from 'react';
import './cart-dropdown.styles.scss';
// Components
import CustomButton from '../custom-button/custom-button.component';
import CartDropdownItem from '../cart-dropdown-item/cart-dropdown-item.component';
// Modules
import { animated, useSpring } from 'react-spring';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = ({ revealed, setShowDropdown, cartItems, history }) => {
  const spring = useSpring({
    height: revealed ? 300 : 0,
    width: revealed ? 250 : 70,
    config: {
      mass: 1,
      tension: 470,
      friction: 39,
      clamp: revealed ? false : true
    }
  });
  function goToCheckOut() {
    history.push('/checkout');
    setShowDropdown(false);
  }
  return (
    <animated.div
      className="cart-dropdown"
      style={spring}
      onMouseEnter={() => revealed && setShowDropdown(true)}
      onMouseLeave={() => revealed && setShowDropdown(false)}
    >
      <div className="content" revealed={String(revealed)}>
        <div className="cart-dropdown-items" count={cartItems.length}>
          {!cartItems.length ? (
            <span className="empty-message">Your cart is empty.</span>
          ) : (
            revealed &&
            cartItems.map((item, i) => (
              <CartDropdownItem key={item.id} item={item} i={i} />
            ))
          )}
        </div>
        {history.location.pathname !== '/checkout' && (
          <CustomButton onClick={goToCheckOut}>GO TO CHECKOUT</CustomButton>
        )}
      </div>
    </animated.div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

CartDropdown.defaultProps = {
  cartItems: []
};

export default withRouter(connect(mapStateToProps)(CartDropdown));
