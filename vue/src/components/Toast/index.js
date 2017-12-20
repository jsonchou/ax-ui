import Vue from 'vue';
import Toast from './index.vue'

let EX = Vue.extend(Toast); //默认实例

let _ex;

const Wrapper = function (opt = {}) {

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = {};

    params.duration = parseInt(opt.duration || 1600);
    params.content = typeof opt === 'string' ? opt : (opt.content || opt.msg || opt.message);
    params.position = opt.position || 'top left';
    params.theme = opt.theme || 'info'

    _ex = new EX(params);

    console.log('params', _ex)

    _ex.$mount();

    document.body.appendChild(_ex.$el);

    _ex.visible = true;

    return _ex;
};

["info", "warn", "error", "success", "loading"].map(item => {
    Wrapper[item] = (opt) => {
        if (typeof opt === 'string' || typeof opt === 'number') {
            opt = {
                content: opt + ''
            };
        }
        opt.theme = item;
        return Wrapper(opt)
    }
});

export default Wrapper