import React from 'react';
import './cart-dropdown.styles.scss';
// Components
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
// Modules
import { animated, useSpring } from 'react-spring';

const CartDropdown = ({ revealed, setShowPreview, cartItems }) => {
  const { height } = useSpring({
    height: revealed ? 300 : 0,
    config: {
      mass: 1,
      tension: 470,
      friction: 35,
      clamp: revealed ? false : true
    }
  });

  return (
    <animated.div
      className="cart-dropdown"
      style={{
        height: height.interpolate(h => h),
        width: height.interpolate([0, 300], [70, 250]).interpolate(h => h)
      }}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <div className="content" revealed={String(revealed)}>
        <div className="cart-items" count={cartItems.length}>
          {cartItems.length
            ? cartItems.map(item => <CartItem key={item.id} item={item} />)
            : '0 items on cart'}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
      </div>
    </animated.div>
  );
};

CartDropdown.defaultProps = {
  cartItems: []
};

export default CartDropdown;
