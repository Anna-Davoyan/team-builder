import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import Home from "./Home";
import './style.css'

import 'semantic-ui-css/semantic.min.css'

import {
    BrowserRouter as Router,
} from "react-router-dom";


import {applyMiddleware, compose, createStore} from "redux";
import reducer from './reducers'
import {Provider} from "react-redux";
import thunk from 'redux-thunk'


const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Home/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
