import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as baseActions from '../redux/actions/base';

import BackToTop from '../components/common/BackToTop'
import pvStatistic from '../components/hoc/pvStatistic';

let page;

class Test extends Component {
    componentWillMount() {
        // console.log(page + ' page componentWillMount')
    }
    render() {
        return (
            <div className="test">
                <BackToTop actions={this.props.actions} />
                test page
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(page + ' page mapStateToProps', state);
    page = state.page;
    return {
        store: state
    }
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(baseActions, dispatch)
    // console.log(page + ' page mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(pvStatistic(Test));

