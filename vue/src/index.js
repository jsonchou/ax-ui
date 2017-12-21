import './styles/index.scss';
import config from './utils/config';
import locale from './locale/index';

import Calendar from './components/Calendar';
import Picker from './components/Picker';
import Scroll from './components/Scroll';
import Toast from './components/Toast';

const components = {
    Calendar,
    Picker,
    Scroll,
    Toast
}

const install = function (Vue, opts = {}) {

    if (this.installed) {
        return;
    }
    this.installed = true;

    //base information
    const ax = {};
    ax.config = config;
    ax.lang = opts.lang;
    ax.version = config.version;
    Vue.prototype.$ax = ax;

    //bind component
    Object.values(components).forEach(comp => {
        Vue.component(config.prefix + comp.name, comp); //standard mode
        console.log('Toast', comp)
    })

    //inject base components
    Vue.prototype.$toast = Toast;
    Vue.prototype.$loading = null;
    Vue.prototype.$modal = null;
}

// auto install & browser import mode
if (typeof window !== 'undefined' && window.Vue) {
    console.log('install', Vue.prototype)
    install(window.Vue);
}

export default {
    install, //every component must have it's own install func
    ...components,
}