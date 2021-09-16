import {combineReducers} from 'redux'
import paginationReducer from './paginationReducer'
import sortReducer from './sortReducer'


const rootReducer = combineReducers({
    pagination: paginationReducer,
    sort: sortReducer
})

export default rootReducer