/**
 * Created by liu_k on 2016/4/20.
 * 时间相关的工具函数
 */

/**
 * 格式化时间
 * @param ms    毫秒
 */
export function formatTime(ms) {
    const t = new Date(ms);

    function addPrefix(v) {
        return v < 10 ? '0' + v : v;
    }

    return t.getFullYear()
        + '-' + addPrefix((t.getMonth() + 1))
        + '-' + addPrefix(t.getDate())
        + ' ' + addPrefix(t.getHours())
        + ':' + addPrefix(t.getMinutes())
        + ':' + addPrefix(t.getSeconds());

    //new Date(text).toLocaleString();标准做法，存档
}