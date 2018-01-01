import Vue from 'vue';
import Confirm from './index.vue'

let EX = Vue.extend(Confirm); //默认实例

let _ex;

const Wrapper = function (opt = {}) {

    _ex = null;

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = Object.assign({}, params, opt);

    //缺省配置
    params.title = opt.title || '提示';
    params.content = typeof opt === 'string' ? opt : (opt.content || opt.msg || opt.message);
    params.icon = opt.icon || 'info';

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