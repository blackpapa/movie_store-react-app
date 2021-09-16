import { SET_SEARCH_QUERY } from "../actions";

const initialState = {
    searchQuery : '',
    SortColumn: {
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
        default: 
           return state
    }

}

export default sortReducer