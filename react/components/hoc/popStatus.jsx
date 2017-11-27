import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types';
import Immutable from 'immutable';

//适用于纯净组件的显示隐藏
//属性代理Props Proxy

export default (PopPartial, tag) => class extends PureComponent {
    static propTypes = {
        pop: PropTypes.bool.isRequired,
        setPopStatus: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.onClose = this.onClose.bind(this)
        PopPartial.displayName = `HOC(${window.util.wrapHOC(PopPartial)})`;
    }
    onClose() {
        let { setPopStatus } = this.props;
        let pop = this.props.pop;
        setPopStatus(tag, false);
        if (tag === 'weixinmask') {
            _zax.ui.mask.hide()
        }
    }
    render() {
        // console.log(this.props.store)
        let pop = this.props.pop;
        return <PopPartial onClose={this.onClose} pop={pop} />
    }
    // shouldComponentUpdate(nextProps, nextState) {
    // 默认必须re-render
    //     //Immutable 可以省略这一步
    //     // return true;
    //     //  return nextProps.store.popStatus.get(tag) != this.props.store.popStatus.get(tag);
    //     // console.log('this.props.store.popStatus,nextProps.store.popStatus', this.props.store.popStatus, nextProps.store.popStatus)
    //     return !(this.props === nextProps || Immutable.is(this.props, nextProps)) || !(this.state === nextState || Immutable.is(this.state, nextState));
    // }
}


