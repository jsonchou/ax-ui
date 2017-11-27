import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as baseActions from '../redux/actions/base';

// base component
import BackToTop from '../components/common/BackToTop'
import WeixinMask from '../components/common/WeixinMask'
import Login from '../components/common/Login'
import Rule from '../components/common/Rule'

// 路由根目录组件

class App extends Component {
    constructor(props) {
        super(props)
        // console.log(props.children.props.history)
        console.log('constructor', props)
        props.children.props.history.listen((location, action) => {
            // console.log("router changed");
            // some like vue beforeEach hook
            let { setPopStatus } = this.props.actions;
            setPopStatus('rule', false)
            setPopStatus('login', false)
            setPopStatus('weixinmask', false)
            _zax.ui.mask.hide();
        });
    }
    componentWillMount() {
        //console.log('app page componentWillMount', this.props.children);
    }
    render() {
        console.log('app page render', this.props);

        // let popStatus = this.props.store.get('popStatus');
        let popStatus = this.props.store.popStatus;

        let { setPopStatus } = this.props.actions;
        return (
            <div className="root">

                {/* base component */}
                {/* <BackToTop actions={this.props.actions} /> */}

                <WeixinMask pop={popStatus.weixinmask} setPopStatus={setPopStatus} />
                <Login pop={popStatus.login} setPopStatus={setPopStatus} />
                <Rule pop={popStatus.rule} setPopStatus={setPopStatus} />

                <div className="main">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        console.log('app page componentDidMount');
        // console.log(this)
    }
    componentWillReceiveProps(nextProps) {
        //console.log('app page componentWillReceiveProps ', nextProps)
    }
}

const mapStateToProps = (root) => {
    console.log('app page mapStateToProps', root);
    return {
        store: root//（data,pipe,g,thunk,seed,states,store,scope）
    }
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(baseActions, dispatch)
    //console.log('app page mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

