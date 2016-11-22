/**
 * Created by liulaoye on 16-11-1.
 */

import api from '../api/index';

export const ENTERPRISE_LIST_QUERY = 'ENTERPRISE_LIST_QUERY';
export const ENTERPRISE_LIST_QUERY_PENDING = 'ENTERPRISE_LIST_QUERY_PENDING';
export const ENTERPRISE_LIST_QUERY_SUCCESS = 'ENTERPRISE_LIST_QUERY_SUCCESS';
export const ENTERPRISE_LIST_QUERY_ERROR = 'ENTERPRISE_LIST_QUERY_ERROR';

export const ENTERPRISE_OPERATION = 'ENTERPRISE_OPERATION';
export const ENTERPRISE_OPERATION_PENDING = 'ENTERPRISE_OPERATION_PENDING';
export const ENTERPRISE_OPERATION_SUCCESS = 'ENTERPRISE_OPERATION_SUCCESS';
export const ENTERPRISE_OPERATION_ERROR = 'ENTERPRISE_OPERATION_ERROR';
export const OPEN_ENTERPRISE_MODAL = 'OPEN_ENTERPRISE_MODAL';

/**
 * 获取企业的列表信息
 * @param cnd               查询条件
 * @param pageNumber        当前页数
 * @param pageSize          每页的记录数量
 *
 */
export function queryEnterpriseList(cnd = null, pageNumber = 0, pageSize = 20) {
    return {
        type: ENTERPRISE_LIST_QUERY,
        meta: {
            cnd,
            pageNumber,
            pageSize
        },
        payload: {
            promise: api.get('enterprise/query', {
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
export function openEnterpriseModal(modal) {
    return {
        type: OPEN_ENTERPRISE_MODAL,
        modal
    }
}
/**
 *
 * 添加和修改对象统一到一个操作中处理
 * @param op            操作类型1:增 改 2:、删除
 * @param item          当前要操作的集群
 */
export function doEnterpriseOperation(op, item) {
    return {
        type: ENTERPRISE_OPERATION,
        meta: {
            op,
            item
            //path,
        },
        payload: {
            promise: api.get('enterprise/operation', {
                params: {
                    op,
                    ...item
                }
            })
        }
    }
}