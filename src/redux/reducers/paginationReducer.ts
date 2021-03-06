import { AnyAction } from "redux";
import { SET_CURRENTPAGE } from "../actions";

const initialState =  {
    pageSize: 7,
    currentPage: 1
}

const paginationReducer = (state = initialState, action: AnyAction) => {
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