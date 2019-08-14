import React, { useState } from 'react';
import './cart.styles.scss';
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';
// Components
import CartPreview from '../cart-preview/cart-preview.component';
// Modules
import { connect } from 'react-redux';

const Cart = ({ currentUser }) => {
  const [showPreview, setShowPreview] = useState(false);
  return (
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
      <CartPreview
        revealed={String(showPreview)}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
      />
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(Cart);
