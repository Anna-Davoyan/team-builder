import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;