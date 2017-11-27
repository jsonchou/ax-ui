import index from '../containers/index'
import topic from '../containers/topic'
import test from '../containers/test'
import cart from '../containers/cart'
import cartImmutable from '../containers/CartImmutable'

const routes = [
    {
        path: '/',
        page: 'index',
        exact: true,
        component: index
    },
    {
        path: '/topic',
        page: 'topic',
        exact: false,
        component: topic
    },
    {
        path: '/test',
        page: 'test',
        exact: false,
        component: test
    },
    {
        path: '/cart',
        page: 'cart',
        exact: false,
        component: cart
    },
    {
        path: '/cartImmutable',
        page: 'cartImmutable',
        exact: false,
        component: cartImmutable
    }
];


export default routes;