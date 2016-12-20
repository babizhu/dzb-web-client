/**
 * Created by liu_k on 2016-11-09 11:46:58.
 * reducer
 */


import { combineReducers } from 'redux'
import { OPERATION_DEL_ITEM} from '../const/Const';


import {
    USER_LIST_QUERY_PENDING ,
    USER_LIST_QUERY_SUCCESS,
    USER_LIST_QUERY_ERROR,

    USER_OPERATION_PENDING,
    USER_OPERATION_SUCCESS,
    USER_OPERATION_ERROR,
    OPEN_USER_MODAL


} from '../actions/User'


const initUserListState = {
    pending: false,
    data: []
};
/**
 * 获取所有集群列表
 */
function userList(state = initUserListState, action) {
    switch (action.type) {

        case USER_LIST_QUERY_PENDING:
            return {
                ...state,
                pending: true
            };
        case USER_LIST_QUERY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                // pager: action.payload.page,
                pending: false,
                error: null
            };
        case USER_LIST_QUERY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case USER_OPERATION_SUCCESS://根据增删改操作的返回结果更新客户端内存的业务数据

            //console.log('USER_LIST_OPERATION_SUCCESS 之后' + JSON.stringify(action.payload));
            return {
                ...state,
                data: updateUserList(state.data, action.payload, action.meta.op )
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
 */
function updateUserList(initData, changeData, op) {

    if( !op ){
        return initData;
    }
    const isDelete  = op === OPERATION_DEL_ITEM;
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
        case OPEN_USER_MODAL:
            return {
                ...state,
                currentOpenModal: state.currentOpenModal == action.modal ? -1 : action.modal
            };
        case USER_OPERATION_PENDING:
            return {
                ...state,
                pending: true
            };
        case USER_OPERATION_SUCCESS:
            return {
                ...state,
                currentOpenModal: -1,
                pending: false,
                error: null
            };
        case USER_OPERATION_ERROR:

            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}


const user = combineReducers({
    userList,
    operationData
});
export default user;