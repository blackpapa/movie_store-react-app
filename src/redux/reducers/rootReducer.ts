import {combineReducers} from 'redux'
import paginationReducer from './paginationReducer'
import sortReducer from './sortReducer'
import loadingReducer from './loadingReducer';
import chartReducer from './chartReducer';


const rootReducer = combineReducers({
    pagination: paginationReducer,
    sort: sortReducer,
    loading :loadingReducer,
    chart: chartReducer
})

export default rootReducer