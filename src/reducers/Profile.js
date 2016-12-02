/**
 * Created by liu_k on 2016/3/29.
 * 用户的个人信息,一般登录时加载
 */
//noinspection JSUnresolvedVariable
import { combineReducers } from 'redux'

import {EDIT_NAME,LOGIN,LOGIN_SUCCESS,LOGIN_ERROR,LOGOUT_SUCCESS} from '../actions/Profile'

const initState = {
    name: '',
    iconUrl:'/img/lyy.jpg',
    address:'重庆市 南岸区',
    isLogin:false,
    //components:'c,c/c1,flex,abc,def,home,JobHistory,test'//用户拥有的权限组件的路径
    components:'all'//用户可显示所有的菜单

};
function profile(state = initState, action) {
    switch (action.type) {
        case EDIT_NAME:
            return Object.assign({}, state, {name: action.name});
        case LOGIN:
            return action.data;
        case LOGIN_SUCCESS:
            // console.log( 'LOGIN_SUCCESS!!!!!!!!!!!!!!1' + JSON.stringify(action) );
            // return Object.assign({}, state, {isLogin: true});
            return {
                ...state,
                pending: false,
                error: null,
                name:action.payload.name,
                isLogin: action.payload.ok
            };
            break;
        case LOGOUT_SUCCESS:

            // return Object.assign({}, state, {isLogin: true});
            return {
                ...state,
               isLogin:false
            };
            break;
        case LOGIN_ERROR:
            error: action.payload
            break;
    }
    return state;
}
//const profileReducer = combineReducers({
//    profile
//
//});

export default profile