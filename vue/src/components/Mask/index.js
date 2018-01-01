import Vue from 'vue';
import Mask from './index.vue'

let EX = Vue.extend(Mask); //默认实例

let _ex;

const Wrapper = function (opt = {}) {

    _ex = null;

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = Object.assign({}, params, opt);

    params.visible = opt.visible || false;
    params.opacity = 'dark' || 'light' || 'transparent';

    _ex = new EX({
        data: params
    });

    // console.log('params', _ex)

    _ex.$mount();

    document.body.appendChild(_ex.$el);

    return _ex;
};

Wrapper.show = (opt = {}) => {
    if (typeof opt === 'function') {
        opt = {
            onShow: opt
        };
    }
    opt.visible = true;
    return Wrapper(opt);
}

Wrapper.hide = (opt = {}) => {
    if (typeof opt === 'function') {
        opt = {
            onHide: opt
        };
    }
    opt.visible = false;
    return Wrapper(opt);
}

export default Wrapper;