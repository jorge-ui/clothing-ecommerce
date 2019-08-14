import React from 'react';
import './nav-link.styles.scss';
// Components
import { Link } from 'react-router-dom';
// Modules
import PropTypes from 'prop-types';

const NavLink = ({ to, children, ...otherProps }) => {
  return to ? (
    <Link className="nav-link" to={to} {...otherProps}>
      {children}
      <div className="hovered" />
    </Link>
  ) : (
    <div className="nav-link" {...otherProps}>
      {children}
      <div className="hovered" />
    </div>
  );
};

NavLink.propTypes = {
  to: PropTypes.string
};

export default NavLink;
