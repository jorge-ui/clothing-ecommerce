import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
// Components
import Cart from '../cart/cart.component';
import NavLink from '../nav-link/nav-link.component';
//Modules
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="links">
      <NavLink to="/shop">SHOP</NavLink>
      <NavLink to="/contact">CONTACT</NavLink>
      {currentUser ? (
        <NavLink onClick={() => auth.signOut()}>SIGN OUT</NavLink>
      ) : (
        <NavLink to="/signin">SIGN IN</NavLink>
      )}
      <Cart />
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
