/**
 * 整个SAP程序的实际入口
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {notification,Spin} from 'antd'
import { bindActionCreators } from 'redux';

import Header from './Header';
import SideBar from './SideBar';
import  Breadcrumb from './Breadcrumb';
import {MINI,NORMAL} from '../actions/SideBar';
import * as screenActions from '../actions/Screen';
import * as appActions from '../actions/App';

import {BIG_SCREEN_WIDTH} from '../const/Const';


import 'antd/dist/antd.css'

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize_mixin_callback.bind(this));
        this._resize_mixin_callback();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize_mixin_callback.bind(this));
    }


    /**
     * 实时告知各组件，当前屏幕的宽度
     * 出于性能考虑,只有当前的状态和之前的状态不一样,才重新设置模式
     * 高度让上面的优化似乎无法实现了,再想想
     * @private
     */
    _resize_mixin_callback() {
        const {screen} = this.props;
        const {changeScreenSize} = this.props.screenActions;
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;

        let isBigScreen = width > BIG_SCREEN_WIDTH;
        if (isBigScreen != screen.isBigScreen || height != screen.height) {
            changeScreenSize(width, height);

        }
    }
    render() {
        const { children,componentUrl,screen,sideBar,app,clusterList } = this.props;
        let sideBarHeight = 'auto';
        let contentStyle = {};
        if (screen.isBigScreen) {
            sideBarHeight = screen.height - 44;//44 for height of Header
            let marginLeft = 240;
            if (sideBar && sideBar.showMode == MINI) {
                marginLeft = 59;
            }
            contentStyle = {marginLeft: marginLeft, paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}
        } else {
            contentStyle = {float: 'left', width: '100%', paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}
        }

        return (
            <div>


                <Header />
                <div style={{float:'left',minHeight:sideBarHeight,background:'#263238'}}>
                    <SideBar componentUrl={componentUrl}/>
                </div>

                <div id='content' style={contentStyle}>
                    <div style={{borderBottom: '1px dashed #ccc',paddingBottom:'8px' }}>
                        <Breadcrumb {...this.props} separator="/"/>
                    </div>
                    <div style={{paddingTop:'8px',paddingBottom:'0px'}}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.node,
    componentUrl: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {

    return {
        screen: state.screen,
        sideBar: state.sideBar,
        app: state.app,
        componentUrl: ownProps.location.pathname//当前所使用组件的url,
    }
}


function mapDispatchToProps() {
    return dispatch => ({
        appActions: bindActionCreators(appActions, dispatch),
        screenActions: bindActionCreators(screenActions, dispatch)
    });

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
