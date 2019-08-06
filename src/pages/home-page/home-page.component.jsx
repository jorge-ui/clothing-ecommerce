import React from 'react';
import './home-page.styles.scss';
import { Link } from 'react-router-dom';

import DirectoryMenu from '../../components/directory-menu/directory-menu.component';

const HomePage = () => (
  <div className="home-page">
    <DirectoryMenu />
    <Link to="shop">Shop</Link>
  </div>
);

export default HomePage;
