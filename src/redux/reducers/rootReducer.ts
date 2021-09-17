import {combineReducers} from 'redux'
import paginationReducer from './paginationReducer'
import sortReducer from './sortReducer'
import loadingReducer from './loadingReducer';


const rootReducer = combineReducers({
    pagination: paginationReducer,
    sort: sortReducer,
    loading :loadingReducer
})

export default rootReducer