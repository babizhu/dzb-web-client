import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from '../middlewares/promiseMiddleware'
import rootReducer from '../reducers/index'

export default function configureStore(initialState) {
    console.log("production configureStore");
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk,promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']}))
    )
}
