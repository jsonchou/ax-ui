//import const param

import { CART_INFO } from '../actions/cart'

const cartInfo = (state = { foo: 'foo' }, action = {}) => {
    switch (action.type) {
        case CART_INFO:
            return action.info
        default:
            return state;
    }
}

export default {
    cartInfo
}