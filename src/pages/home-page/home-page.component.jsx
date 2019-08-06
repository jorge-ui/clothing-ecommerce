import React from 'react';
import './home-page.styles.scss';
import { Link } from 'react-router-dom';

import MenuDirectory from '../../components/menu-directory/menu-directory.component';

const HomePage = () => (
  <div className="home-page">
    <MenuDirectory />
    <Link to="shop">Shop</Link>
  </div>
);

export default HomePage;
