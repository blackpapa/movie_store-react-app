//Interfaces
export interface SortColumn {
    path: string;
    order: string;
  }

//Constants
export const SET_CURRENTPAGE = "SET_CURRENT_PAGE"
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_SORT_COLUMN = 'SET_SORT_COLUMN'
export const SET_LOADING = 'SET_LOADING'


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

export const setSortColumnAction = (payload: SortColumn) => {
    return {
        type: SET_SORT_COLUMN,
        payload
    }
}

export const setLoadingAction = (payload: boolean) => {
    return {
        type: SET_LOADING,
        payload
    }
}