/**
 * 适用于本机的配置文件，通常配置好之后，无需git同步，
 */


/**
 * 网络api的根路径
 * @type {string}
 */

const host = 'http://dzxx.cqna.gov.cn:9000'; //生产环境
// const host = 'http://localhost:8080';　//开发环境


//const host = 'http://qtrj77.6655.la:8085';

const downloadHost = 'http://192.168.1.5';

//以/结尾
export const BASE_URI = host + '/api/';

//像hadoop文件系统上传文件的服务器地址，比较特殊，放这里
export const HADOOP_UPLOAD_URI = BASE_URI + 'hadoop/upload';

export const HADOOP_DOWNLOAD_URL = downloadHost + ':50070/webhdfs/v1%s?op=OPEN';