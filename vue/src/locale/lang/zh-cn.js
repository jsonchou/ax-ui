import config from '../../utils/config'

export default {
    [config.prefix]: {
        lang: 'zh-cn',
        picker: {
            confirm: '确定',
            cancel: '取消',
        },
        timePicker: {
            placeholder: '选择时间',
        },
        datePicker: {
            placeholder: '请选择日期',
            year: '年',
            lastYear: '上一年',
            nextYear: '下一年',
            lastMonth: '上一月',
            nextMonth: '下一月',
            confirm: '确定',
            selectYear: '选择年份',
            selectMonth: '选择月份',
            selectTime: '选择时间',
            selectDate: '选择日期',
            days: '一,二,三,四,五,六,日',
            months: '1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月',
        },
        modal: {
            confirm: '确定',
            cancel: '取消',
        },
    }
}