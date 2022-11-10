import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
    // blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

// const composedEnhancers = compose(applyMiddleware(...middleware));
const composedEnhancers =
    (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(persistedReducer, undefined, composedEnhancers(applyMiddleware(...middleware)));
// export const store = createStore(rootReducer, undefined, composedEnhancers(applyMiddleware(...middleware)));

export const persistor = persistStore(store);
