import {isPromise} from '../utils';

import {showErrMsg} from '../actions/App';
const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

/**
 * 如果出现程序的逻辑错误，诸如用户名密码错误，用户不存在等等
 * 服务器端最好如下返回：
 *
 * res.status('500').send({'message' : 'Invalid user/password'});
 *
 * @param config
 * @returns {Function}
 */
export default function promiseMiddleware(config = {}) {
    const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;

    return (_ref) => {
        const dispatch = _ref.dispatch;

        return next => action => {
            if (!isPromise(action.payload)) {
                return next(action);
            }

            const {type, payload, meta} = action;
            const {promise, data} = payload;
            const [ PENDING, FULFILLED, REJECTED ] = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;

            /**
             * Dispatch the first async handler. This tells the
             * reducer that an async action has been dispatched.
             */
            next({
                type: `${type}_${PENDING}`,
                ...!!data ? {payload: data} : {},
                ...!!meta ? {meta} : {}
            });

            const isAction = resolved => resolved && (resolved.meta || resolved.payload);
            const isThunk = resolved => typeof resolved === 'function';
            const getResolveAction = isError => ({
                type: `${type}_${isError ? REJECTED : FULFILLED}`,
                ...!!meta ? {meta} : {},
                ...!!isError ? {error: true} : {}
            });

            /**
             * Re-dispatch one of:
             *  1. a thunk, bound to a resolved/rejected object containing ?meta and type
             *  2. the resolved/rejected object, if it looks like an action, merged into action
             *  3. a resolve/rejected action with the resolve/rejected object as a payload
             */
            action.payload.promise = promise.then(
                (resolved = {}) => {
                    //console.log( 'resolved=' + resolved );
                    //for( let x in resolved ){
                    //    console.log(x)
                    //}
                    const resolveAction = getResolveAction();
                    return dispatch(isThunk(resolved) ? resolved.bind(null, resolveAction) : {
                        ...resolveAction,
                        ...isAction(resolved) ? resolved : {
                            ...!!resolved && {payload: resolved}
                        }
                    });
                },
                (rejected = {}) => {
                    //console.log( 'rejected =' + rejected );
                    console.log(JSON.stringify(rejected));//可以查看更加详细的错误信息
                    const resolveAction = getResolveAction(true);


                    if (rejected.body) {
                        if (!action.meta || !action.meta.noSysErrMsg) {//设置此标志则不弹出系统错误提示框
                            const e = rejected.body;
                            dispatch(showErrMsg(e.errId, e.args, rejected.err.response.req.url));//处理服务器返回的404以及500错误
                        }
                    } else if (rejected.err) {
                        if (rejected.err.timeout) {
                            dispatch(showErrMsg(200, '', ''));//超时错误
                        }
                        else if (rejected.err.status == "404" || rejected.err.status == "500") {
                            dispatch(showErrMsg(rejected.err.status, '', rejected.err.response.req.url));////连404错误

                        }
                        else {
                            dispatch(showErrMsg(201, rejected.err.url, rejected.err.url));////连接本地为开启的url则报此错误
                        }


                    }
                    //else {//后端发来的程序执行错误
                    //    //console.log(rejected.response.text);
                    //    //
                    //    //console.log(typeof(rejected.response.text));
                    //    //const e = JSON.parse(rejected.body.text);
                    //    const e = rejected.body;
                    //    dispatch(showErrMsg(e.errId, e.args));
                    //}

                    return dispatch(isThunk(rejected) ? rejected.bind(null, resolveAction) : {
                        ...resolveAction,
                        ...isAction(rejected) ? rejected : {
                            ...!!rejected && {payload: {...rejected}}
                        }
                    });
                }
            );

            return action;
        };
    };
}
