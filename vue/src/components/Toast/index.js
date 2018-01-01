import Vue from 'vue';
import Toast from './index.vue'
import { Object } from 'core-js/library/web/timers';

let EX = Vue.extend(Toast); //默认实例

let _ex;

const Wrapper = function (opt = {}) {

    _ex = null;

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = {};

    params.duration = parseInt(opt.duration || 1600);
    params.content = typeof opt === 'string' ? opt : (opt.content || opt.msg || opt.message);
    params.icon = opt.icon || 'info';
    params.onClose = opt.onClose || null;

    _ex = new EX({
        data: params
    });

    // console.log('params', _ex)

    _ex.$mount();

    document.body.appendChild(_ex.$el);

    _ex.visible = true;

    return _ex;
};

["info", "warn", "error", "success", "loading"].map(item => {
    Wrapper[item] = function (opt) {
        if (typeof opt === 'string' || typeof opt === 'number') {
            opt = {
                content: opt + ''
            };
        }
        opt.icon = item;
        return Wrapper(opt)
    }
});

export default Wrapper;