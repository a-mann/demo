import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router'
import {Provider} from 'react-redux';
import createStore from 'aliasRedux/createStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter initialEntries={['/','/sign-in','/dashboard:type?', '/dashboard/main']}
                  initialIndex={0}>
      <App/>
    </MemoryRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
