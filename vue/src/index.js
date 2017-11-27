// import './styles/index.scss';
import config from './utils/config';

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
        Vue.component(config.componentNamePrefix + comp.name, comp);
    })

    //inject base components
    Vue.prototype.$toast = null;
    Vue.prototype.$loading = null;
    Vue.prototype.$modal = null;

    const ax = {};
    ax.config = config; //base information
    ax.lang = opts.lang;
    Vue.prototype.$ax = ax;

}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install, //every component must have it's own install func
    ...components,
}