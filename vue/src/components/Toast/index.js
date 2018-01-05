import Vue from 'vue';
import Comp from './index.vue'

let EX = Vue.extend(Comp); //默认实例

const Wrapper = function (opt = {}) {

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = Object.assign({}, params, opt);

    params.duration = parseInt(opt.duration || 1600);
    params.content = typeof opt === 'string' ? opt : (opt.content || opt.msg || opt.message);

    let _ex = new EX({
        data: params
    });

    // console.log('params', _ex)

    _ex.$mount();

    document.body.appendChild(_ex.$el);

    _ex.visible = true;

    return _ex;
};

["info", "warn", "error", "success", "loading"].map(item => {
    Wrapper[item] = (opt = {}) => {
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