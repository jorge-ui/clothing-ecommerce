import React from 'react';
import './cart.styles.scss';
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';
// Components
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// Modules
import { connect } from 'react-redux';
// Actions
import { setShowPreview } from '../../redux/cart/cart.actions';

const Cart = ({ currentUser, setShowPreview, showPreview }) => (
  <div className="cart">
    <div
      className={`${currentUser ? 'revealed' : ''} cart-icon`}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <Icon className="icon" />
      <span className="item-count">0</span>
      <div className="hovered" revealed={String(showPreview)} />
    </div>
    <CartDropdown
      revealed={String(showPreview)}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    />
  </div>
);

const mapStateToProps = ({ user: { currentUser }, cart: { showPreview } }) => ({
  currentUser,
  showPreview
});

const mapActionsToProps = {
  setShowPreview
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Cart);
