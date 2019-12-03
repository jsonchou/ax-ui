/* global __codeSplitType__ */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// router lib
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history'

import store from './redux/store';

import AsyncComponent from './components/AsyncComponent';

//main containers
import App from './containers/App';
import NoMatch from './containers/NoMatch';

//前置注入全局常量
import config from './api/config';
import service from './api/service';
import util from './api/util';

//前置信息

//config 补充
config.bizOrigin = _util.url.get('bizOrigin');
config.activityCode = _util.url.get('activityCode');
config.appUrl += config.bizOrigin.toUpperCase();

if (config.machine.indexOf('-uat') > -1) {
    config.assetsPath = `//staticdaily.demo.com/website/assets/subject/__spaMode__/__spaDir__/assets`;
    config.cmsApi = `//mgw-uat.demo.com`;
    config.wxApi = `//weixin.demo.com/weixin_qa`;
}

config.antifraud.tail.bizOrigin = config.bizOrigin;
config.antifraud.tail.activityCode = config.activityCode;

_zax.biz.antifraud(true, config.antifraud.provider, "webactivity", config.env, config.activityCode, () => {
    let tail = config.antifraud.provider == 'seraph' ? { seraph_did: $('#seraph_did').val(), seraph_token: $('#seraph_token').val() } : { afs_scene: $('#afs_scene').val(), afs_token: $('#afs_token').val() }
    Object.assign(config.antifraud.tail, tail)
});

if (typeof Object.assign != 'function') {
    _util.file.load('https://static.demo.com/website/assets/libs/polyfills/object-assign.js')
}

window.config = config;
window.service = service;
window.util = util;

const { mode, split } = window.config.router;

const history = mode === 'hash' ? createHashHistory() : createBrowserHistory();

import routes from './router/__routerMode__'

// store.subscribe(() => {
//     console.log(store.getState());
// })

const routeConfig = (routeTable = routes) => {
    return (
        <App >
            <Router history={history} >
                <Switch>
                    {
                        routeTable.map((item, index) => <Route key={index} path={item.path} exact={item.exact} render={(props) => <item.component history={props.history} page={item.page} />} />)
                    }
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </App >
    )
}

render(
    <Provider store={store}>
        {routeConfig()}
    </Provider>,
    document.getElementById('app')
);
