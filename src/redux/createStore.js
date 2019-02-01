import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from 'aliasRedux/reducers';

export default () => {
  const middleware = [
    thunk
  ];

  const enhancer = compose(
    process.env.NODE_ENV !== 'production'
      ? composeWithDevTools(applyMiddleware(...middleware))
      : applyMiddleware(...middleware)
  );

  return createStore(
    reducer,
    enhancer
  );
};