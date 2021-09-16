import { SET_CURRENTPAGE } from "../actions";

const initialState =  {
    pageSize: 5,
    currentPage: 1
}

const paginationReducer = (state = initialState, action: {type: string, payload: any}) => {
    const {type, payload} = action

    switch(type) {
        case SET_CURRENTPAGE:
            return {
                ...state,
                currentPage: payload
            }
        default:
            return state;
    }

}

export default paginationReducer;