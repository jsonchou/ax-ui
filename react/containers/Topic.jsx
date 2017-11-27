import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable, { is, fromJS } from 'immutable';

import * as baseActions from '../redux/actions/base';

import pvStatistic from '../components/hoc/pvStatistic';

// alert('测试代码分割');

let page;

class Topic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 1
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentWillMount() {
        // console.log(page + ' page componentWillMount')
    }
    handleClick = () => {
        const preNumber = this.state.num
        this.setState({
            num: this.state.num
        })
    }
    render() {
        console.log(this.state.num)
        return (
            <div>
                <h1 className="f30 p20" onClick={this.handleClick} style={{ margin: 30 }}>{this.state.num}</h1>
            </div>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.num == this.state.num) {
            return false
        }
        return true;
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

export default connect(mapStateToProps, mapDispatchToProps)(pvStatistic(Topic));

