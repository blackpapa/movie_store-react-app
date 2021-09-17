const initialState = {
    loadCompleted: false
}

const loadingReducer = (state = initialState, action: {type: string, payload: boolean}) => {
    const {type, payload} = action;
    switch (type) {
        default:
            return state
    }
}

export default loadingReducer