import React from 'react';
import './cart-dropdown.styles.scss';
// Components
import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = props => (
  <div className="cart-dropdown" {...props}>
    <div className="content">
      <div className="cart-items">Items</div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  </div>
);

export default CartDropdown;
