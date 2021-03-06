/* eslint global-require: 0 */

import { Platform, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createFilter } from 'redux-persist-transform-filter';
import reducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    createFilter('app', ['isLoginScreenVisible'], ['isLoginScreenVisible']),
  ],
  whitelist: ['carousel', 'notification', 'user', 'app'],
  stateReconciler: autoMergeLevel2
};


let composeEnhancers = compose;
if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData;
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
    name: Platform.OS,
    ...require('../package.json').remotedev,
  });
  /* eslint-enable no-underscore-dangle */
}

/*
  We apply the redux-persist to the store. When deploying any state changes that are persisted,
  ** MAKE SURE ** to check if any migration is needed!
  Check out https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
 */

export default function configureStore(initialState, navReduxMiddleWare) {
  const enhancer = composeEnhancers(applyMiddleware(navReduxMiddleWare, thunk));
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }
  return { store, persistor };
}
