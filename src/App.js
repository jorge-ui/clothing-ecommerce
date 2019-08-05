import React from 'react';
import './App.styles.css';
import HomePage from './pages/home-page/home-page.component';
import { Route } from 'react-router-dom';

const App = () => (
  <div className="App">
    <Route exact path="/" component={HomePage} />
  </div>
);

export default App;
