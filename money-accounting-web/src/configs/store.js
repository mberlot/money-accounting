import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { cacheEnhancer } from "redux-cache";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk), cacheEnhancer())
);

export const persistor = persistStore(store);
