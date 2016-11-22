/**
 * Created by liu_k on 2016/4/1.
 * sideBar的原始数据
 */
import { combineReducers } from 'redux'

import {CHANGE_MENU_OPEN_STATUS,CHANGE_SHOW_MODE,NORMAL,MINI,OPEN_MANY,OPEN_ONE} from '../actions/SideBar'

function showMode(state = NORMAL, action) {
    switch (action.type) {
        case CHANGE_SHOW_MODE:
            return state == MINI ? NORMAL : MINI;
    }
    return state;
}

/**
 * 根据openMode是单选(OPEN_ONE)或者是多选(OPEN_MANY),返回那些子菜单为展开状态的父菜单数组
 * @param index     要处理的父菜单
 * @param items     当前子菜单为展开状态的父菜单数组
 * @param openMode  当前菜单展开模式
 */
function changeMenuOpenStatus(index, items, openMode) {
    let resultState = [];
    if (openMode == OPEN_MANY) {
        if (items.indexOf(index) == -1) {
            resultState = [...items, index];
        } else {
            for (const i of items) {
                if (i != index) {
                    resultState.push(i);
                }
            }
        }
    } else {
        if (items.length == 0 || items[0] != index) {//即使存在多个打开的子菜单,也只处理第一个
            resultState.push(index);
        }
    }
    return resultState;

}
/**
 * item:包含当前子菜单处于展开状态的父菜单的INDEX数组
 * openMode:当前菜单的展开模式
 *
 * @param state
 * @param action
 * @returns {*}
 */
function openMenu(state = {items: [], openMode: OPEN_MANY}, action) {
    switch (action.type) {
        case CHANGE_MENU_OPEN_STATUS:
            return Object.assign({}, state, {
                items: changeMenuOpenStatus(action.index, state.items, state.openMode)
            })
    }
    return state;
}

const sideBar = combineReducers({
    showMode,
    openMenu
});
export default sideBar