import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable';

const tag = "backtotop"

class Tmp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.goTop = this.goTop.bind(this)
        this.evtScroll = this.evtScroll.bind(this)
    }
    evtScroll() {
        if ($(window).scrollTop() > 200) {
            this.setState({ show: true })
        } else {
            this.setState({ show: false })
        }
    }
    goTop() {
        $('html,body').animate({
            scrollTop: 0
        }, 800, () => {
            this.setState({ show: false })
        });
    }
    render() {
        console.log(tag + ' tmpl render log')
        return (
            <div className="template-backtotop" ref="backtotop" >
                <span className={`md-backtotop ${this.state.show ? 'on' : ''}`} onClick={this.goTop}></span>
            </div >
        )
    }
    componentDidMount() {
        if (!this.refs.backtotop) {
            return;
        }
        $(window).on('scroll', this.evtScroll).trigger('scroll');

    }
    shouldComponentUpdate(nextProps, nextState) {
        // return nextState.show != this.state.show
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentWillUnmount() {
        $(window).off('scroll', this.evtScroll);
        this.setState({ show: false })
    }
}

export default Tmp