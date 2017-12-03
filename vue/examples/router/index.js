import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index'
import picker from '../pages/picker'
import scroll from '../pages/scroll'
import calendar from '../pages/calendar'
import toast from '../pages/toast'


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
    }, {
        path: '/toast',
        component: toast,
        name: 'toast'
    }]
})

export default router