
import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

import * as baseActions from '../redux/actions/base';
import * as cartActions from '../redux/actions/cart';

import pvStatistic from '../components/hoc/pvStatistic';

let page;

class Header extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('Header render');
        let { checkAll } = this.props;
        return (
            <div className="container-cart-head p20">
                <div className="head">
                    <label htmlFor="selectAll" className="head-item"><input id="selectAll" type="checkbox" checked={checkAll || false} onChange={e => this.props.onCheckAll(e)} /> 全选</label>
                    <div className="head-item c-name">商品</div>
                    <div className="head-item">单价</div>
                    <div className="head-item c-buyNum">数量</div>
                    <div className="head-item">小计</div>
                    <div className="head-item">操作</div>
                </div>
            </div >
        )
    }
}

class Footer extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('Footer render');
        return (
            <div className="footer">
                <p>合计: {this.props.totalPrice}元</p>
            </div>
        )
    }
}

class Item extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('Item render');
        let { onSub, onAdd, onRemove, onCheck, data } = this.props;
        return (
            <div className="cart-item">
                <label htmlFor={`check${data.id}`} className="cart-item-box c-select">
                    <input className="p30" id={`check${data.id}`} type="checkbox" checked={data.checked || false} onChange={(e) => onCheck(e, data.id)} />
                </label>

                <div className="cart-item-box c-name">{data.name}</div>
                <div className="cart-item-box c-price">¥{data.price}</div>
                <div className="cart-item-box c-buyNum">
                    <div onClick={(e) => onSub(e, data.id)}>-</div>
                    <input className="p30" value={data.buyNum} readOnly />
                    <div onClick={(e) => onAdd(e, data.id)}>+</div>
                </div>
                <div className="cart-item-box c-subTotal tc">¥{data.price * data.buyNum}</div>
                <div className="cart-item-box c-delete tc " onClick={(e) => onRemove(e, data.id)}>&times;</div>
            </div>
        )
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.nextProps.data.get('id') != this.props.data.get('id')
    // }
}

class Cart extends Component {
    constructor(props) {
        page = props.page;
        super(props)
        this.state = {
            checkAll: false,
            productList: [],
            totalPrice: 0,
        }
        this._init = this._init.bind(this)
        this._sum = this._sum.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.onSub = this.onSub.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onRemove = this.onRemove.bind(this)
    }
    onCheckAll(e) {
        //全选
        let { productList } = this.state;
        productList = productList.map(c => {
            let tmp = Object.assign({}, c)
            tmp.checked = e.target.checked
            return tmp
        })
        this.setState({
            checkAll: e.target.checked,
            productList,
            totalPrice: this._sum(productList)
        })
    }
    onCheck(e, id) {
        //单选
        let { productList } = this.state;
        let idx = productList.indexOf(productList.filter(c => c.id == id)[0]);
        productList[idx] = Object.assign({}, productList[idx])
        productList[idx].checked = e.target.checked;
        //reset check all
        this.setState({
            productList,
            checkAll: productList.every(c => c.checked),
            totalPrice: this._sum(productList)
        });
    }
    _sum(productList) {
        let sum = 0;
        productList.map(c => {
            if (c.checked) {
                sum += c.price * c.buyNum;
            }
        })
        return sum;
    }
    // -
    onSub(e, id) {
        let { productList } = this.state;
        let idx = productList.indexOf(productList.filter(c => c.id == id)[0]);
        if (idx > -1) {
            productList[idx] = Object.assign({}, productList[idx])
            if (productList[idx].buyNum > 0) {
                productList[idx].buyNum -= 1;
            }
            this.setState({ productList, totalPrice: this._sum(productList) })
        }
    }
    // +
    onAdd(e, id) {
        let { productList } = this.state;
        let idx = productList.indexOf(productList.filter(c => c.id == id)[0]);
        if (idx > -1) {
            productList[idx] = Object.assign({}, productList[idx])
            if (productList[idx].buyNum < 10) {
                productList[idx].buyNum += 1;
            } else {
                alert('最多10')
                return;
            }
            this.setState({ productList, totalPrice: this._sum(productList) })
        }
    }
    // x
    onRemove(e, id) {

        let { productList } = this.state;

        let idx = productList.indexOf(productList.filter(c => c.id == id)[0]);
        if (idx > -1) {
            productList.splice(idx, 1);
            this.setState({ productList, totalPrice: this._sum(productList) })
        }
    }
    _init = () => {
        let { checkAll, productList } = this.state;

        if (checkAll) {
            let sum = 0;
            productList = productList.map((c, idx) => {
                sum += c.price * c.buyNum;
                let tmp = Object.assign({}, c)
                tmp.checked = true;
                return tmp
            })
            this.setState({ totalPrice: sum, productList })
        }

    }
    componentWillMount() {

        //fetch data
        fetch('./mock/data.json').then(res => res.json()).then(data => {
            console.log('fetch data', data)
            this.setState({ productList: data || [] }, () => {
                this._init();
            })

        }, err => {
            console.log('err', err)
        });

        console.log(page + ' page componentWillMount', this.props)

        this.props.actions.setCartInfo({ foo: 'foo2' });

    }
    render() {
        console.log(page + ' page render', this.props.store);
        let { checkAll, totalPrice, productList } = this.state;

        return (
            <div className="container-cart p20 f22">
                <Header checkAll={checkAll} onCheckAll={this.onCheckAll} />
                <div className="item-rows">
                    {
                        productList.map((item, index) => <Item data={item} key={index} onCheck={this.onCheck} onSub={this.onSub} onAdd={this.onAdd} onRemove={this.onRemove} />)
                    }
                </div>
                <Footer totalPrice={totalPrice} />

                <Link className="p10 f30 block" to="/cartImmutable" >跳转到 immutable version</Link>

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(page + ' page  mapStateToProps', state);
    return {
        store: state
    }
};

const mapDispatchToProps = dispatch => {
    let creators = bindActionCreators(Object.assign({}, baseActions, cartActions), dispatch)
    //console.log(page + ' page  mapDispatchToProps', creators);
    return {
        actions: creators
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(pvStatistic(Cart));

// Immutable 缺点
// 1，适合老手
// 2，数据读取修改方式怪异冗长
// 3，不利于团队合作

// Immutable 优点
// 1，完全忽视引用类型数据
// 2，性能优化明显