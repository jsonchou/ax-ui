import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types';

//统计页面PV
//属性代理Props Proxy

export default (PageContainer) => class extends PureComponent {
    constructor(props) {
        super(props)
        console.log('pvStatic constructor',this)
        // console.log('pvStatic constructor PageContainer',PageContainer)
        PageContainer.displayName = `HOC(${window.util.wrapHOC(PageContainer)})`;
    }
    componentWillMount() {
        let { setPageName } = this.props.actions;//与mobx有差别，mobx 数据源与事件一体，redux，数据源store与事件actions分离
        console.log('pvStatic componentWillMount', this.props)
        setPageName(this.props.page || 'index');
    }
    componentDidMount() {
        console.log('ilog pv uv')
        window._za && window._za.pushData(); //ilog pv uv 统计
        window.bridge && window.bridge.invoke({});
        window.bridge && window.bridge.ready((boot) => {
            boot.onJSInvokeResult('1', document.title);
        });
    }
    render() {
        return <PageContainer {...this.props} />
    }
}
