/**
 * 处理登录界面和正常的程序操作界面共有的内容，比如错误提示
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {notification, Button} from 'antd'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router'

import * as appActions from '../actions/App';


import 'antd/dist/antd.css'

const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    btnClick(key){
        const currentPath = this.props.currentPath;
        this.context.router.replace('/login?redirectPath='+ currentPath);
        notification.close(key);
    }
    componentDidUpdate(prevProps, prevState) {
        const {errMsg} = this.props.app;

        const key = `open${Date.now()}`;

        const btn = (
            <Button type="primary" size="small" onClick={this.btnClick.bind(this,key)}>
                立刻登录
            </Button>
        );
        if (errMsg) {
            notification.error({
                message: "出故障啦",
                description: <span><span
                    style={{fontWeight:'bold'}}>url:</span> {errMsg.url}<br /><br />{errMsg.msg}</span>,
                duration: 1000,
                key,
                btn:errMsg.errId==101?btn:null
            });

            const {resetErrMsg} = this.props.appActions;
            resetErrMsg();

        }

    }

    render() {

        return (
            <div>


                {this.props.children}
            </div>
        )
    }
}

AppContainer.propTypes = {
    children: PropTypes.node,
    
};

AppContainer.contextTypes = contextTypes;

function mapStateToProps(state, ownProps) {


    return {
        app: state.app,
        currentPath: ownProps.location.pathname//当前所使用组件的url,
    }
}

function mapDispatchToProps() {
    return dispatch => ({
        appActions: bindActionCreators(appActions, dispatch)

    });
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
