const initialState = {
    searchQuery : '',
    SortColumn: {
        path: 'name',
        order: 'asc'
    }
}

const sortReducer = (state = initialState, action: {type: string, payload: any}) => {
    const {type, payload} = action;

    return state;
}

export default sortReducer