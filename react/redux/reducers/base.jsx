//import const param

import { STD_REQUEST, STD_RECEIVE, PAGE_NAME, USER_CODE, POP_STATUS, LOTTERY_INFO, } from '../actions/base'

const baseState = {
    userCode: '',
    pageName: 'index',
    popStatus: {
        'weixinmask': false,
        'login': false, //login pop box
        'rule': false, //总则
        'lottery': false, //优惠券 弹窗
    },
    lotteryInfo: {
        'type': '',
        'activityCode': '',
        'code': 0,
        'lotteryDetailId': 0,
        'message': '',
        'moduleDetailId': 0,
        'offerPackageProCode': '',
        'prizeCode': '',
        'prizeName': '',
        'result': '',
    }
}

const popStatus = (state = baseState.popStatus, action = {}) => {
    switch (action.type) {
        case POP_STATUS:
            return Object.assign({}, state, { [action.tag]: action.status });
        default:
            return state
    }
}

const pageName = (state = baseState.pageName, action = {}) => {
    switch (action.type) {
        case PAGE_NAME:
            return action.name
        default:
            return state;
    }
}

const userCode = (state = baseState.userCode, action = {}) => {
    switch (action.type) {
        case USER_CODE:
            return action.code
        default:
            return state;
    }
}

const lotteryInfo = (state = baseState.lotteryInfo, action = {}) => {
    switch (action.type) {
        case LOTTERY_INFO:
            return Object.assign({}, state, action);
        default:
            return state;
    }
}

export default {
    popStatus,
    pageName,
    userCode,
    lotteryInfo,
}