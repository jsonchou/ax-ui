import fetch from 'isomorphic-fetch'

export const CART_INFO = "CART_INFO";
export const CART_DATA = "CART_DATA"

export const setCartInfo = info => {
    return {
        type: CART_INFO,
        info,
    }
}

