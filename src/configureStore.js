import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './state/rootReducer.js';
import mySaga from './sagas';

import { persistState } from 'redux-devtools';
import DevTools from './DevTools';

const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const sagaMiddleware = createSagaMiddleware();
let enhancer;
if (process.env.NODE_ENV === 'development') {
  enhancer = compose(
    applyMiddleware(sagaMiddleware),
    DevTools.instrument({
      maxAge: 50,
      shouldCatchErrors: true
    }),
    persistState(getDebugSessionKey())
  );
} else {
  enhancer = applyMiddleware(sagaMiddleware);
}


const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('./state/rootReducer', () => {
      const nextRootReducer = require('./state/rootReducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }
  sagaMiddleware.run(mySaga);
  store.runSaga = sagaMiddleware.run;
  return store;
};

export default configureStore;
