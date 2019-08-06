import React from 'react';
import './App.styles.css';
// Components
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop-page/shop-page.component';
import Header from './components/header/header.component';

import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/shop" component={ShopPage} />
    </Switch>
  </div>
);

export default App;
