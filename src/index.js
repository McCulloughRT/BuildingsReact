import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import InitialState from './init_state';

console.log('store created');
ReactDOM.render(
  <Provider store={ createStore(reducers, InitialState) }>
    <App />
  </Provider>,
  document.querySelector('#main')
);
