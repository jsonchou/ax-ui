import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import { combineReducers } from '__reduxImmutable__';
import thunk from 'redux-thunk';

// reducers
import base from '../reducers/base'
import cart from '../reducers/cart'

// console.log(base, cart)
// import base from '../reducers'

var store = createStore(
    combineReducers(Object.assign({}, base, cart)),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;