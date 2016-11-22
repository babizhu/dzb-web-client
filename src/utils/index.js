export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}

export function getCookie(name) {


    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

/**
 * 把数字表示的文件大小转换为人类方便阅读的模式
 * @param size
 * @returns {*}
 */
export function formatFileSize(size) {

    const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'ZB'];
    let prev = 0, i = 0;
    while (Math.floor(size) > 0 && i < UNITS.length) {
        prev = size;
        size /= 1024;
        i += 1;
    }

    if (i > 0 && i < UNITS.length) {
        size = prev;
        i -= 1;
    }
    return Math.round(size * 100) / 100 + ' ' + UNITS[i];
}

export function ignoreClick(e) {
    if( !e ){
        return;
    }
    if (e && e.stopPropagation) {
        //W3C取消冒泡事件
        e.stopPropagation();
    } else {
        //IE取消冒泡事件
        window.event.cancelBubble = true;
    }
}