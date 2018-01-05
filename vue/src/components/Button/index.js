import Vue from 'vue';
import Comp from './index.vue'

let EX = Vue.extend(Comp); //默认实例

const Wrapper = function (opt = {}) {

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = Object.assign({}, params, opt);

    let _ex = new EX({
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

//mask show & hide must be the same vue node
