/**
 * Created by liu_k on 2016/3/29.
 * 处理用户个人信息,登录，注销等
 */

import api from '../api/index';

export const EDIT_NAME = 'EDIT_NAME';

export function editName( name ){

    return{
        type:EDIT_NAME,
        name
    }
}
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const COUNT = 'COUNT';
export const COUNT_SUCCESS = 'COUNT_SUCCESS';
export const COUNT_ERROR = 'COUNT_ERROR';
/**
 * 用户登录
 * @param username              用户名
 * @param password              密码
 * @param rememberMe           是否保持登录(true:保持登录      false：不保持登录)
 */
export function login(username, password, rememberMe) {
    return {
        type: LOGIN,
        payload: {
            promise: api.get('user/login', {
                params: {
                    username,
                    password,
                    rememberMe
                }
            })
        }
    }
}

export function count() {
    return {
        type: COUNT,
        payload: {
            promise: api.get('user/count', {
                params: {
                    
                }
            })
        }
    }
}



export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT';
/**
 * 用户注销
 * @param uname         用户名
 */
export function logout() {
    return {
        type: LOGOUT,
        payload: {
            promise: api.get('user/logout', {
                params: {
                    
                }
            })
        }
    }
}