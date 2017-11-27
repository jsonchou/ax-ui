import Vue from 'vue';
import Format from './format';

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

const format = Format();

// "timePicker.placeholder:'已选 {checked}/{total} 项'"
// "timePicker.placeholder:['列表 1', '列表 2']"

export default {
    t: function (objStr, opts) {
        let lang = opts.lang; //lang/zh-cn object
        let $t = Object.getPrototypeOf(this || Vue).$t;

        //if installed vueI18n plugin
        let i18nStr = $t(arguments);
        if (i18nStr) {
            return i18nStr;
        }

        let arr = objStr.split('.')
        let len = arr.length;
        let snipetObj = lang;

        for (let i = 0; i < len; i++) {
            let key = arr[i];
            let tmp = snipetObj[key];
            if (i === len - 1) {
                return format(tmp, opts)
            }
            if (!snipetObj) {
                return ''
            }
            snipetObj = tmp;
        }
        return ''
    }
}