import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index'
import picker from '../pages/picker'
import scroll from '../pages/scroll'
import calendar from '../pages/calendar'

const router = new VueRouter({
    mode: 'hash', //history
    routes: [{
        path: '/',
        component: index,
        name: 'index',
    }, {
        path: '/picker',
        component: picker,
        name: 'picker'
    }, {
        path: '/scroll',
        component: scroll,
        name: 'scroll'
    }, {
        path: '/calendar',
        component: calendar,
        name: 'calendar'
    }]
})

export default router