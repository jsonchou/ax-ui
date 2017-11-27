import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types';

import hocPopStatus from '../hoc/popStatus';

const tag = 'weixinmask';

class WeixinMask extends PureComponent {
    static propTyps = {
        popStatus: PropTypes.bool.isRequired,
        actions: PropTypes.func.isRequired
    }
    render() {
        let pop = this.props.pop;
        let onClose = this.props.onClose;
        console.log(tag + ' tmpl render log')
        return (
            <div className="template-weixinmask" onClick={onClose} >
                <div className={`md-weixinmask ${pop ? 'on' : ''}`}>
                    <img src="//static.zhongan.com/website/assets/subject/vue/20161221/assets/images/weixin-mask.png" alt="" />
                </div>
            </div>
        )
    }
}

export default hocPopStatus(WeixinMask, tag)