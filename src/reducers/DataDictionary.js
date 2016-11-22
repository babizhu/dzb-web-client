/**
 * Created by liu_k on 2016/11/09 17:18.
 * 数据字典
 */
import { combineReducers } from 'redux'

const initAreaTypeState = {
    0: '茶园片区',
    1: '经开区片区',
    2: '南坪片区'
};
/**
 * 厂商所在区域的数据字典
 */
function areaType(state = initAreaTypeState, action) {
    return state;
}
const dataDictionary = combineReducers({
    areaType
});
export default dataDictionary;