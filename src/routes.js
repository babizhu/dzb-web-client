import React from 'react'

import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import AppContainer from './containers/AppContainer'
import EnterpriseContainer from './containers/EnterpriseContainer'
import UserContainer from './containers/UserContainer'
import NotFound from './containers/NotFound'
import Login from './containers/Login'
import Test from './containers/Test'

import {getCookie} from './utils/index'

import DashBoard from './containers/DashBoard'

/**
 * 检测用户是否登录
 * @param next
 * @param replace
 * @param callback
 */
function validateLogin(next, replace, callback) {

    const isLoggedIn = getCookie("isLogin");
    if (!isLoggedIn && next.location.pathname != '/login') {
        replace('/login');
    }
    callback();
}

export default (
    <Route onEnter={validateLogin}>
        <Route path="/appContainer" component={AppContainer}>
            <Route path="/login" component={Login} breadcrumbName="登录模块"/>
            <Route path="/" component={App} >
                <IndexRoute component={DashBoard} breadcrumbName="中控台"/>
                <Route path="enterprise" component={EnterpriseContainer} breadcrumbName="企业管理"/>
                <Route path="user" component={UserContainer} breadcrumbName="用户管理"/>
                <Route path="/test" component={Test} breadcrumbName="测试模块"/>
            </Route>
        </Route>
        <Route path="*" component={NotFound} breadcrumbName="404 Error"/>
    </Route>
)
