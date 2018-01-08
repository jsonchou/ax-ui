import Vue from 'vue';
import Comp from './index.vue'

let EX = Vue.extend(Comp); //默认实例

const Wrapper = function (opt = {}) {

    if (Vue.prototype.$isServer) {
        // ssr
        return;
    }

    let params = Object.assign({}, params, opt);

    //缺省配置
    params.content = typeof opt === 'string' ? opt : (opt.content || opt.msg || opt.message);

    let _ex = new EX({
        data: params
    });

    // console.log('params', _ex)

    _ex.$mount();

    let parent = document.querySelector(`.${params.cls}-skeleton.${params.placement}`);
    console.log('parent', parent, `.${params.cls}-skeleton.${params.placement}`)
    if (!parent) {
        parent = document.createElement('div');
        parent.classList.add(`${params.cls}-skeleton`, `${params.placement}`);
        document.body.appendChild(parent);
    }

    parent.appendChild(_ex.$el);

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