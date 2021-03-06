import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const storeEnchancer = [];

if (process.env.NODE_ENV === 'development') 
  storeEnchancer.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    ...storeEnchancer
  )
);

export const persistor = persistStore(store);
