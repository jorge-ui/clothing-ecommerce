import React from 'react';
import './App.styles.css';
// Components
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import { Route } from 'react-router-dom';

const App = () => (
  <div className="App">
    <Route exact path="/" component={HomePage} />
    <Route exact path="/shop" component={ShopPage} />
  </div>
);

export default App;
