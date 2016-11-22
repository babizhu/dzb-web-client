/**
 * Created by liu_k on 2016/4/14.
 * hadoop文件浏览器的action
 */

import api from '../api/index';

export const SHOW_FILE_LIST = 'SHOW_FILE_LIST';
export const SHOW_FILE_LIST_PENDING = 'SHOW_FILE_LIST_PENDING';
export const SHOW_FILE_LIST_SUCCESS = 'SHOW_FILE_LIST_SUCCESS';
export const SHOW_FILE_LIST_ERROR = 'SHOW_FILE_LIST_ERROR';

export const HADOOP_OPERATION = 'HADOOP_OPERATION';
export const HADOOP_OPERATION_PENDING = 'HADOOP_OPERATION_PENDING';
export const HADOOP_OPERATION_SUCCESS = 'HADOOP_OPERATION_SUCCESS';
export const HADOOP_OPERATION_ERROR = 'HADOOP_OPERATION_ERROR';

export const OPEN_HADOOP_MODAL = 'OPEN_HADOOP_MODAL';


/**
 * 获取path下的文件或者文件夹信息，如果path是一个文件则获取文件的具体内容
 * @param path          要获取信息的文件路径
 * @param readAsText    如果是路径是文件，true：采用文本方式读取，false：采用二进制方式读取
 * @param block         文件的块（文件太大，不可能读取整个文件，而是以块为单位读取，块的大小在服务器端指定）
 * @returns {{type: string, meta: {path: *, noSysErrMsg: boolean, readAsText: boolean}, payload: {promise: *}}}
 */
export function getFilesData(path,readAsText=true,block=0) {
    return {
        type: SHOW_FILE_LIST,
        meta:{
            path,
            noSysErrMsg:false,//设置此标志不弹出系统错误对话框,网络错误不包含在内,如果有需要也可根据情况调整promiseMiddleware.js
            readAsText//显示文件内容专用
        },
        payload: {
            promise: api.get('hadoop/getFilesData', {
                params: {
                    path,
                    readAsText,
                    block
                }
            })
        }
    }
}

/**
 * 文件操作（改名，删除，上传新文件等）统一到这里处理，免得出现太多乱七八糟的东西？
 * @param op            操作类型1、改名 2、删除 3、新建目录
 * @param path          当前要操作的路径
 *
 * @param args          1、改名                新的文件名
 *                      2、删除                无参数（需要支持删除目录吗？）
 *                      3、新建目录            新建目录的名字
 *
 */
export function hadoopOperation(op,path,args) {
    return {
        type: HADOOP_OPERATION,
        meta:{
            //path,
        },
        payload: {
            promise: api.get('hadoop/operation', {
                params: {
                    op,
                    path,
                    args
                }
            })
        }
    }
}

/**
 * 打开某个对话框
 * @param modal         对话框类型1、改名 2、删除 3、新建目录
 */
export function openHadoopModal(modal) {
    return {
        type: OPEN_HADOOP_MODAL,
        modal
    }
}