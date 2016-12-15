/**
 * Created by liu_k on 2016/4/14.
 * reducer
 */


import { combineReducers } from 'redux'
import { OPERATION_DEL_ITEM} from '../const/Const';


import {
    ENTERPRISE_LIST_QUERY ,
    ENTERPRISE_LIST_QUERY_PENDING ,
    ENTERPRISE_LIST_QUERY_SUCCESS,
    ENTERPRISE_LIST_QUERY_ERROR,


    ENTERPRISE_OPERATION,
    ENTERPRISE_OPERATION_PENDING,
    ENTERPRISE_OPERATION_SUCCESS,
    ENTERPRISE_OPERATION_ERROR,
    OPEN_ENTERPRISE_MODAL


} from '../actions/Enterprise'


const initEnterpriseListState = {
    pending: false,
    data: []
};
/**
 * 获取所有集群列表
 */
function enterpriseList(state = initEnterpriseListState, action) {
    switch (action.type) {

        case ENTERPRISE_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case ENTERPRISE_LIST_QUERY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                // pager: action.payload.page,
                pending: false,
                error: null
            };
        case ENTERPRISE_LIST_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case ENTERPRISE_OPERATION_SUCCESS://根据增删改操作的返回结果更新客户端内存的业务数据

            console.log('ENTERPRISE_LIST_OPERATION_SUCCESS 之后' + JSON.stringify(action.payload));
            return {
                ...state,
                data: updateEnterpriseList(state.data, action.payload, action.meta.op === OPERATION_DEL_ITEM)
            };
        default:
            return state;
    }
}

/**
 * 根据增删改操作的返回结果更新客户端内存的业务数据
 * @param initData      原始内容
 * @param changeData    变化的数据
 * @param isDelete      是否删除操作导致的变化
 * @returns {Array}
 */
function updateEnterpriseList(initData, changeData, isDelete) {
    //console.log('是否删除？ ' + isDelete);
    if (!changeData) {
        return;
    }
    let result = [];
    let isExist = false;
    for (const oldData of initData) {
        if (oldData.id === changeData.id ) {//更新或者删除
            if (!isDelete) {//更新

                result.push({...oldData, ...changeData});
            }
            isExist = true;//找到了此数据，意味着不是修改，就是删除
        } else {
            result.push(oldData);
        }
    }
    if (!isExist) {//新增
        result.unshift(changeData);
    }

    return result;

}

const operationInitState = {
    currentOpenModal: -1,
    pending: false,
    error: null
};

function operationData(state = operationInitState, action) {
    switch (action.type) {
        case OPEN_ENTERPRISE_MODAL:
            return {
                ...state,
                currentOpenModal: state.currentOpenModal == action.modal ? -1 : action.modal
            };
        case ENTERPRISE_OPERATION_PENDING:
            return {
                ...state,
                pending: true
            };
        case ENTERPRISE_OPERATION_SUCCESS:
            return {
                ...state,
                currentOpenModal: -1,
                pending: false,
                error: null
            };
        case ENTERPRISE_OPERATION_ERROR:

            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}


const enterprise = combineReducers({
    enterpriseList,
    operationData
});
export default enterprise;