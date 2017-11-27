
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as baseActions from '../redux/actions/base';

import pvStatistic from '../components/hoc/pvStatistic';

// cms component
import CMS from '../components/common/CMS'

let page;

/**
 * (导出组件)
 * 
 * @export
 * @class Index
 * @extends {Component}
 */

class Index extends Component {
    constructor(props) {
        page = props.page;
        super(props);
        this.onPop = this.onPop.bind(this)
        this.onSkip = this.onSkip.bind(this)
        console.log(page + ' page constructor props', props)
    }
    onPop(e) {

        let { tag } = e.target.dataset;

        console.log(page + ' page  onPop', this)

        let { setPopStatus } = this.props.actions;

        setPopStatus(tag, true);

        if (tag === 'weixinmask') {
            _zax.ui.mask.show();
        }
    }
    onSkip(e) {
        let { history } = this.props;
        console.log('special', this)
        history.push('topic')
    }
    componentWillMount() {
        if (!_util.url.get('bizOrigin') || !_util.url.get('activityCode')) {
            if (config.debug && (location.href.indexOf('-uat') > -1 || location.href.indexOf('-test') > -1)) {
                //保险期间
                _zax.ui.mask.show();
                _zax.ui.confirm('<h1 class="f35 lh2 mb10">前端免责声明</h1><p class="tl">1、请自行添加bizOrigin参数和activityCode参数，注意参数大小写，有问题，请联系后端活动盒子配置。</p><p class="tl">2、因参数配置错误（参数大小写，apk包丢失，后台配置code不一致）产生的问题，由事故当事人负责。</p>')
            }
        }
    }
    render() {

        console.log(page + ' page  render');

        return (
            <div className="container-index p20">

                <CMS dataSource={[]} />

                <div className="p10 f30 block" data-tag="rule" onClick={this.onPop}>查看规则</div>
                <div className="p10 f30 block" data-tag="login" onClick={this.onPop}>登录</div>
                <div className="p10 f30 block" data-tag="weixinmask" onClick={this.onPop}>弹出微信遮罩层</div>
                <Link className="p10 f30 block" to="/topic" >路由跳转Link1 topic</Link>
                <div className="p10 f30 block" onClick={this.onSkip}>路由跳转Event1 topic</div>
                <Link className="p10 f30 block" to="/test" >路由跳转Link2  test </Link>
                <Link className="p10 f30 block" to="/cart" >路由跳转Link3  cart </Link>
                <Link className="p10 f30 block" to="/cartImmutable" >路由跳转Link3  cartImmutable </Link>

            </div >
        );
    }
    componentDidMount() {
        //console.log(page + ' page  componentDidMount');
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     // return false;
    //     return !Immutable.is(Immutable.fromJS(this.props.store), Immutable.fromJS(nextProps))
    // }
    componentWillUnmount() {
        //reset popStatus
    }
}

const mapStateToProps = (state) => {
    //console.log(page + ' page  mapStateToProps', state);
    return {
        store: state
    }
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(baseActions, dispatch)
    //console.log(page + ' page  mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(pvStatistic(Index));
