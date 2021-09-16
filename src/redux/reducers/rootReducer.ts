import {combineReducers} from 'redux'
import paginationReducer from './paginationReducer'


const rootReducer = combineReducers({
    pagination: paginationReducer
})

export default rootReducer