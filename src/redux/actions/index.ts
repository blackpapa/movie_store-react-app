//Constants
export const SET_CURRENTPAGE = "Set currentpage"


//Action creators
export const setCurrentPageAction = (payload: number) => {
    return {
        type: SET_CURRENTPAGE,
        payload
    }
}