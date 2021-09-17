import { SET_SEARCH_QUERY } from "../actions";
import { SET_SORT_COLUMN } from './../actions/index';

const initialState = {
    searchQuery : '',
    sortColumn: {
        path: 'name',
        order: 'asc'
    }
}

const sortReducer = (state = initialState, action: {type: string, payload: any}) => {
 
    const {type, payload} = action;

    switch(type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: payload
            }
        case SET_SORT_COLUMN:
            return {
                ...state,
                sortColumn: payload
            }
        default: 
           return state
    }

}

export default sortReducer