import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faCartPlus);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
