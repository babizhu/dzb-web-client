/**
 * Created by liukun on 16/4/17.
 * 程序主入口
 *
 */

export const SHOW_ERROR_MSG = 'SHOW_ERROR_MSG';
export const RESET_ERROR_MSG = 'RESET_ERROR_MSG';
export function showErrMsg(errId,args,url) {
    return {
        type: SHOW_ERROR_MSG,
        errId,
        args,
        url
    }
}

export function resetErrMsg() {
    return {
        type: RESET_ERROR_MSG

    }
}