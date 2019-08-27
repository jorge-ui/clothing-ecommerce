import React, { useState } from 'react';
import './cart.styles.scss';
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';
// Components
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Modules
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartQuantity } from '../../redux/cart/cart.selectors';

const Cart = ({ cartQuantity }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="cart">
      <div
        className="cart-icon"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <Icon className="icon" />
        <span className="item-count">{cartQuantity}</span>
        <div className="hovered" revealed={String(showDropdown)} />
      </div>
      <CartDropdown revealed={showDropdown} setShowDropdown={setShowDropdown} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartQuantity: selectCartQuantity
});

export default connect(mapStateToProps)(Cart);
