/**
 * Created by liu_k on 2016/4/1.
 * 当屏幕宽度发生改变时，调用此action通知整个系统
 */
export const CHANGE_SHOW_MODE = 'CHANGE_SHOW_MODE';
export const CHANGE_MENU_OPEN_STATUS = 'CHANGE_MENU_OPEN_STATUS';
export const NORMAL = 'NORMAL';
export const MINI = 'MINI';

/**
 * 同时仅允许展开一个子菜单
 * @type {string}
 */
export const OPEN_ONE = 'OPEN_ONE';

/**
 * 同时允许展开多个子菜单
 * @type {string}
 */
export const OPEN_MANY = 'OPEN_MANY';

/**
 * 改变sideBar的显示模式，只有两个选项
 * NORMAL
 * MINI
 * @returns {{type: string, showMode: *}}
 */
export function changeShowMode( ){

    return{
        type:CHANGE_SHOW_MODE

    }
}

export function changeMenuOpenStatus(index ){
    return{
        type:CHANGE_MENU_OPEN_STATUS,
        index
    }
}
