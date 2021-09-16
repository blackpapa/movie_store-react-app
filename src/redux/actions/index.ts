//Constants
export const SET_CURRENTPAGE = "Set currentpage"
export const SET_SEARCH_QUERY = 'Set search query'


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