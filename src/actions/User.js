/**
 * Created by liulaoye on 2016-11-09 11:38:08.
 */

import api from '../api/index';

export const USER_LIST_QUERY = 'USER_LIST_QUERY';
export const USER_LIST_QUERY_PENDING = 'USER_LIST_QUERY_PENDING';
export const USER_LIST_QUERY_SUCCESS = 'USER_LIST_QUERY_SUCCESS';
export const USER_LIST_QUERY_ERROR = 'USER_LIST_QUERY_ERROR';

export const USER_OPERATION = 'USER_OPERATION';
export const USER_OPERATION_PENDING = 'USER_OPERATION_PENDING';
export const USER_OPERATION_SUCCESS = 'USER_OPERATION_SUCCESS';
export const USER_OPERATION_ERROR = 'USER_OPERATION_ERROR';
export const OPEN_USER_MODAL = 'OPEN_USER_MODAL';

/**
 * 获取User的列表信息
 * @param cnd               查询条件
 * @param pageNumber        当前页数
 * @param pageSize          每页的记录数量
 *
 */
export function queryUserList(cnd = null, pageNumber = 0, pageSize = 20) {
    return {
        type: USER_LIST_QUERY,
        meta: {
            cnd,
            pageNumber,
            pageSize
        },
        payload: {
            promise: api.get('user/query', {
                params: {
                    cnd,
                    pageNumber,
                    pageSize
                }
            })
        }
    }
}
/**
 * 打开某个对话框
 * 添加和修改对象统一到一个对话框中处理

 * @param modal         对话框类型   1:增 改 2:删除
 */
export function openUserModal(modal) {
    return {
        type: OPEN_USER_MODAL,
        modal
    }
}
/**
 *
 * 添加和修改对象统一到一个操作中处理
 * @param op            操作类型1:增 改 2:、删除
 * @param item          当前要操作的User
 */
export function doUserOperation(op, item) {
    return {
        type: USER_OPERATION,
        meta: {
            op,
            item
            //path,
        },
        payload: {
            promise: api.get('user/operation', {
                params: {
                    op,
                    ...item
                }
            })
        }
    }
}

export function resetPassword(userName, newPassword){
    return {
        type: USER_OPERATION,
        meta: {
            op:3,
  
            //path,
        },
        payload: {
            promise: api.get('user/resetPassword', {
                params: {

                    userName,
                    newPassword
                }
            })
        }
    }
}