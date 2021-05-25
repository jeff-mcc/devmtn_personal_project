import {createStore,combineReducers} from 'redux'
import authReducer from './authReducer'
import projectReducer from './projectReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    projectInfo: projectReducer
})

export default createStore(rootReducer)