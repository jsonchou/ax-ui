import './styles/index.scss';
import config from './utils/config';
import locale from './locale/index';

// BASE UI
import Button from './components/Button';

import Mask from './components/Mask';
import Toast from './components/Toast';
import Modal from './components/Modal';
import Notify from './components/Notify';

import Calendar from './components/Calendar';
import Picker from './components/Picker';
import Scroll from './components/Scroll';

const components = {
    Button,

    Mask,
    Toast,
    Modal,
    Notify,

    Calendar,
    Picker,
    Scroll,
}

const install = function (Vue, opts = {}) {

    if (this.installed) {
        return;
    }
    this.installed = true;

    //base information
    const ax = {};
    Object.assign(config, opts);
    Object.assign(ax, config);
    Vue.prototype.$ax = window.$ax = ax;

    console.log('config', config)
    console.log('ax', ax)

    //bind component
    Object.values(components).forEach(comp => {
        console.log(comp.name)
        Vue.component(comp.name, comp); //standard mode
    })

    //inject base components
    Vue.prototype.$toast = Toast;
    Vue.prototype.$modal = Modal;
    Vue.prototype.$mask = Mask;
    Vue.prototype.$notify = Notify;
}

// auto install & browser import mode
if (typeof window !== 'undefined' && window.Vue) {
    console.log('install', Vue.prototype)
    install(window.Vue);
}

export default {
    dddddddddd: 'hehe',
    install, //every component must have it's own install func
    ...components,
}