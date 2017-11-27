import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

const tag = 'login';

let myticker;

export default class Login extends Component {
    static propTyps = {
        pop: PropTypes.bool.isRequired,
        actions: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            ticker: '获取验证码',
            verifycode: window.config.debug ? '666666' : '',
            mobile: window.config.debug ? '13472792921' : '',
        }
        this.onLogin = this.onLogin.bind(this)
        this.onGetVerifyCode = this.onGetVerifyCode.bind(this)
        this.onInput = this.onInput.bind(this)
        this.onClose = this.onClose.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }
    onLogin() {

        let { mobile, verifycode, ticker } = this.state;

        if (!mobile) {
            _zax.ui.toast('请填写手机号');
            return;
        } else if (!_zax.regexForm.mobile(mobile)) {
            _zax.ui.toast('请填写正确的手机号');
            return;
        } else if (!verifycode) {
            _zax.ui.toast('请填写短信验证码');
            return;
        }

        window.service.userLogin(this, mobile, verifycode, () => {

        });
    }
    onGetVerifyCode(e) {

        //发送验证码
        let { mobile, verifycode, ticker } = this.state;

        if (!mobile) {
            _zax.ui.toast('请填写手机号');
            return;
        } else if (!_zax.regexForm.mobile(mobile)) {
            _zax.ui.toast('请填写正确的手机号');
            return;
        } else {
            if (ticker != '获取验证码') {
                return;
            } else {
                this.setState({ ticker: '60 s' }, () => {
                    console.log('this.state.ticker', this.state.ticker)
                    window.service.sendVerifyCode(this, mobile);
                    myticker = setInterval(() => {
                        let { ticker } = this.state;
                        let tck = parseInt(ticker.replace(' s', ''));
                        if (tck > 0) {
                            this.setState({ ticker: ((tck - 1) + ' s') });
                        } else {
                            clearInterval(myticker);
                            this.setState({ ticker: '获取验证码' })
                        }
                    }, 1000);
                });
            }
        }
    }
    onInput(e) {
        let { name } = e.target.dataset;
        let val = e.target.value;
        this.setState({
            [name]: val
        })
    }
    resetTimer() {
        clearInterval(myticker);
        this.setState({ ticker: '获取验证码' })
    }
    onClose(e) {
        let { setPopStatus } = this.props;
        console.log(tag + ' tmpl onClose', this.props)
        // reset ticker
        this.resetTimer();
        setPopStatus(tag, false);
    }
    componentWillMount() {
        // console.log(tag + ' tmpl componentWillMount');
    }
    render() {
        console.log(tag + ' tmpl render log')

        let { mobile, verifycode, ticker } = this.state;

        let pop = this.props.pop;
        return (
            <div className="template-login f30">
                <div className={`md-popup md-popup-login ${pop ? 'on' : ''}`}  >
                    <i className="popup-close f30 p20" onClick={this.onClose}>关闭&times;</i>
                    <h3 className="popup-hd tc f36 b">输入手机号领福利</h3>
                    <form id="j_getCouponForm">
                        <menu className="info-list">
                            <li className="list-item"><input type="tel" defaultValue={this.state.mobile} name="mobile" data-name="mobile" onChange={this.onInput} autoComplete="off" className="textbox f30" maxLength="11" placeholder="输入手机号" /></li>
                            <li className="list-item">
                                <input type="tel" name="verifycode" data-name="verifycode" onChange={this.onInput} maxLength="6" className="textbox f30" placeholder="输入验证码" />
                                <span className={`get-captcha tc f26 ${ticker.indexOf('s') > -1 ? 'send-fade' : ''}`} onClick={this.onGetVerifyCode}>{ticker}</span>
                            </li>
                        </menu>
                        <p className="btn-bar tc"><input type="button" data-tag="login" onClick={this.onLogin} value="立即前往" className="btn-buy f32 b" /></p>
                    </form>
                </div>
            </div>
        )
    }
    componentDidMount() {
        console.log(tag + ' tmpl componentDidMount');
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(tag + ' tmpl componentWillReceiveProps ', nextProps)
    // }
    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.store.popStatus[tag] != this.props.store.popStatus[tag] || nextState.ticker !== this.state.ticker;
        // return !Immutable.is(Immutable.fromJS(this.props.store.get('popStatus').get(tag)), Immutable.fromJS(nextProps.store.get('popStatus').get(tag))) || !Immutable.is(Immutable.fromJS(this.state.ticker), Immutable.fromJS(nextState.ticker))
        // console.log('nextProps, nextState', nextState)
        return nextProps.pop != this.props.pop || nextState.ticker !== this.state.ticker;

    }
    componentDidUpdate() {
        this.props.pop === false && this.resetTimer()
    }
    componentWillUnmount() {
        alert('componentWillUnmount');
        console.log(tag + ' tmpl componentWillUnmount')
    }

}


// React.propTypes has deprecated in 16.0