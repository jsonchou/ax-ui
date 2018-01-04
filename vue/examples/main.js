import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import ax from '../src/index'
import lang from '../src/locale/lang/zh-cn' //en,zh-cn,zh-tw

import router from './router'

import axconfig from './api/ax-config';

console.log(axconfig)

//前置信息
if (typeof Object.assign != 'function') {
    _util.file.load('https://static.zhongan.com/website/assets/libs/polyfills/object-assign.js')
}

//全局注入
Vue.config.devtools = true;

Vue.use(ax, axconfig);

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from) => {
    document.title = to.name;
});

window.vApp = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');