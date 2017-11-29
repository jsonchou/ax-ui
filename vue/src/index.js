// import './styles/index.scss';
import config from './utils/config';
import locale from './locale/index';

import calendar from './components/calendar';
import picker from './components/picker';
import scroll from './components/scroll';

const components = {
    calendar,
    picker,
    scroll
}

const install = function (Vue, opts = {}) {

    if (this.installed) {
        return;
    }
    this.installed = true;

    //bind component
    Object.values(components).forEach(comp => {
        Vue.component(config.prefix + comp.name, comp); //standard mode
    })

    //inject base components
    Vue.prototype.$toast = null;
    Vue.prototype.$loading = null;
    Vue.prototype.$modal = null;

    //base information
    const ax = {};
    ax.config = config;
    ax.lang = opts.lang;
    ax.version = config.version;
    Vue.prototype.$ax = ax;

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