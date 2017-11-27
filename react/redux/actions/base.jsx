import fetch from 'isomorphic-fetch'

export const STD_REQUEST = 'STD_REQUEST';
export const STD_RECEIVE = "STD_RECEIVE";

export const PAGE_NAME = 'PAGE_NAME';
export const USER_CODE = "USER_CODE";

export const POP_STATUS = 'POP_STATUS';
export const LOTTERY_INFO = "LOTTERY_INFO";

// credentials ={omit,same-origin,include}
// Content-Type:{application/x-www-form-urlencoded |application/json}

//标准获取数据
export const stdFetch = (ajaxParams, actionType) => {
    let { url, method = "POST", body, headers = { "Content-Type": "application/json" }, cache = false, mode = 'cors', credentials = "include" } = ajaxParams;
    if (body && typeof body === 'object') {
        body = Object.keys(body).map(c => `${c}=${body[c]}`).join('&');
    }

    //标准发送
    let _stdRequest = ajaxParams => {
        return { type: actionType['request'].toUpperCase(), ajaxParams, }
    }

    //标准接收
    let _stdReceive = data => {
        return { type: actionType['receive'].toUpperCase(), data, }
    }

    //标准错误
    let _stdError = error => {
        console.log("stdError status", error);
        return { type: actionType['error'].toUpperCase(), error, }
    }

    return async dispatch => {
        dispatch(_stdRequest(ajaxParams));
        try {
            let res = await fetch(url, { method, mode, body, headers, credentials, cache })
            if (res.ok) {
                let data = await res.json();
                dispatch(_stdReceive(data))
            } else {
                dispatch(_stdError(res.status))
            }
        } catch (e) {
            dispatch(_stdError(e))
        }
    }
}

//标准弹窗
export const setPopStatus = (tag, status) => {

    if (_zax.device.app && tag == 'login' && status) {
        location.href = "https://login.zhongan.com/mobile/login.htm?sourceApp=8&target=" + location.href;
        return;
    }

    return {
        type: POP_STATUS,
        tag,
        status
    }
}

//修改用户状态
export const setUserCode = code => {
    return {
        type: USER_CODE,
        code,
    }
}

//修改pageName
export const setPageName = name => {
    return {
        type: PAGE_NAME,
        name,
    }
}

//中奖信息
export const setLotteryInfo = info => {
    return {
        type: LOTTERY_INFO,
        info,
    }
}
