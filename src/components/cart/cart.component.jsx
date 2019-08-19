import React, { useState } from 'react';
import './cart.styles.scss';
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';
// Components
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Modules
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const Cart = ({ currentUser, cartItems }) => {
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="cart">
      <div
        className={`${currentUser ? 'revealed' : ''} cart-icon`}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <Icon className="icon" />
        <span className="item-count">{itemsCount}</span>
        <div className="hovered" revealed={String(showDropdown)} />
      </div>
      <CartDropdown
        revealed={showDropdown}
        setShowDropdown={setShowDropdown}
        cartItems={cartItems}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(Cart);
