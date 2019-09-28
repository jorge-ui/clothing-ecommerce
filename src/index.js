import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

library.add(faPlus, faCartPlus);

const rootPath =
  process.env.NODE_ENV === 'development' ? '/' : '/clothing-ecommerce/';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={rootPath}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
