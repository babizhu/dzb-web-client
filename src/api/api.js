import superagent from 'superagent';
import {NET_TIMEOUT_MS} from '../const/Const'
const methods = [
    'get',
    'head',
    'post',
    'put',
    'del',
    'options',
    'patch'
];

class _Api {

    constructor(opts) {

        this.opts = opts || {};

        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');

    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path);

                if (params) {
                    request.query(params);
                }
                request.set('X-Requested-With', 'XMLHttpRequest');
                request.withCredentials();
                //if (this.opts.headers) {
                //    request.set(this.opts.headers);
                //}

                if (data) {
                    request.send(data);
                }
                request.timeout(NET_TIMEOUT_MS);
                request.end((err, { body } = {}) =>{
                    //console.log( 'liukun:body=' + body + ',error=' + err );

                    return err ? reject({body,err}) : resolve(body)
                });
            })
        );

    }

}

const Api = _Api;

export default Api;
