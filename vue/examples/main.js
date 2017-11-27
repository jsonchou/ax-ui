import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import ax from '../src/index'
import lang from '../src/locales/lang/zh-cn'

import router from './router'

//前置信息
if (typeof Object.assign != 'function') {
    _util.file.load('https://static.zhongan.com/website/assets/libs/polyfills/object-assign.js')
}

//全局注入
Vue.config.devtools = true;

Vue.use(ax, {
    lang
});

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from) => {
    document.title = to.name;
});

window.router = router;
window.Vue = Vue;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');