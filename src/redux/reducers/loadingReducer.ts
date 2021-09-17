import { SET_LOADING } from "../actions";

const initialState = {
    loadCompleted: false
}

const loadingReducer = (state = initialState, action: {type: string, payload: boolean}) => {
    const {type, payload} = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loadCompleted: payload
            }
        default:
            return state
    }
}

export default loadingReducer