import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import profile from './Profile'
import screen from './Screen'
import sideBar from './SideBar'
import app from './App'
import enterprise from './Enterprise'
import user from './User'
import dataDictionary from './DataDictionary'

//import clustersInfo from './Cluster'

function todos(state, action) {
    return [1];
}
const rootReducer = combineReducers({
    todos,
    profile,
    screen,
    sideBar,
    app,
    enterprise,
    user,
    dataDictionary,
    routing
});

export default rootReducer
