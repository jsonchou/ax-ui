import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types';

import hocPopStatus from '../hoc/popStatus';

const tag = 'rule';

class Rule extends PureComponent {
    static propTyps = {
        pop: PropTypes.bool.isRequired,
        actions: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            more: false,
            num: 1//设state中Number值为1
        }
        this.onMore = this.onMore.bind(this)
    }

    onMore() {
        this.setState({ more: !this.state.more })
    }

    render() {
        let { more } = this.state;
        let pop = this.props.pop;
        let onClose = this.props.onClose;
        console.log(tag + ' tmpl render log', this.props)
        return (
            <div className="template-rule">
                <div className={`md-popup-rule ${pop ? 'on' : ''} `} >
                    <span className="close f30 p20" onClick={onClose}>关闭&times;</span>
                    <div className="txt">
                        <p>用户参与股价竞猜活动期间，有5次竞猜的机会，以9月29日当天最高成交价为最终正确金额（金额准确度精确到分位），用户任意一次价格与最终价一致可获得积分，竞猜截止时间：2017.09.28 23:59:59。</p>
                        <p>获得股价竞猜积分的用户需在众安APP完成实名认证后领取，否则视为无效。</p>
                        <p>本次活动所有奖品采取后发机制，我们会在活动结束后10个工作日内发放至用户账户。</p>
                        <p>如出现任何违规行为（如利用漏洞、机器、小程序等刷积分或其他奖品的现象），众安有权取消用户参与资格并拒绝发放积分及其他奖品。如已发放者，一旦核实将扣除其账户中的积分，必要时将追究其法律责任。</p>
                        <p>本活动不与其他活动同享，众安保险保留在法律规定的范围内对上述规则进行解释的权利。</p>
                        <button className="f30 p20" onClick={this.onMore}>{!more ? "没点" : "已点"}</button>
                    </div>
                </div >
            </div >
        )
    }
}

export default hocPopStatus(Rule, tag)