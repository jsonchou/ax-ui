;
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
    }
})(this, function (module, exports) {
    'use strict';

    let debug = true;

    let jsapis = ["getZAToken", "getSystemInfo", "setNavigationBarTitle", "setNavigationBarColor",
        "setNavigationBarRightButton", "showShareView", "share", "setNavigationBarMenu", "login", "register",
        "startFaceDetectService", "startIDCardDetect", "startTelecomCheat",
        "navigateToZAService", "closeWebView",
        "getLocationInfo", "storeReviewWithinApp", "queryAppInstalledById", "goNavigationServiceById",
    ];

    debug && console.log(jsapis)

    exports.__esModule = true;
    exports.default = function (event, params, cb) {
        let prefix = "ZAJSSDK_";
        let cbName = prefix + event + '_CALLBACK'

        let paramsObj = {
            functionName: event,
            params: params,
            complete: cbName
        }
        window[cbName] = function (data) {
            cb && cb(JSON.parse(data));
            debug && console.info(item + 'Callback callback info：', JSON.parse(data))
            delete window[cbName];
        }
        window.prompt(JSON.stringify(paramsObj))
    }
    module.exports = exports['default'];
});