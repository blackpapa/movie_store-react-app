//Constants
export const SET_CURRENTPAGE = "Set currentpage"
export const SET_SEARCH_QUERY = 'Set search query'
export const SET_SORT_COLUMN = 'Set sort column'


//Action creators
export const setCurrentPageAction = (payload: number) => {
    return {
        type: SET_CURRENTPAGE,
        payload
    }
}

export const setQueryAction = (payload: string) => {
    return {
        type: SET_SEARCH_QUERY,
        payload
    }
}

export const setSortColumnAction = (payload: object) => {
    return {
        type: SET_SORT_COLUMN,
        payload
    }
}