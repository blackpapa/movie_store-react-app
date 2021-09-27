import { ThunkAction } from "redux-thunk";
import { RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { getMovies } from "../../services/movieService";
import _ from 'lodash'

export const AWAITING_MOVIES_CHART_DATA = 'AWAITNG_MOVIES_CHART_DATA'
export const SUCCESS_MOVIES_CHART_DATA = 'SUCCESS_MOVIES_CHART_DATA'
export const REJECT_MOVIES_CHART_DATA = 'REJECT_MOVIES_CHART_DATA'

export const getMoviesChartData = (path: string): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => async dispatch => {

    
    try {
        dispatch({
            type: AWAITING_MOVIES_CHART_DATA
        })
        
        const labels:string[] = []
        const data:number[] = []
        const { data: movies } = await getMovies();

        if (path === 'Stocks') {
            const filtered = _.orderBy(movies, "numberInStock", "desc").slice(0, 6);
      
            for (let i = 0; i < filtered.length; i++) {
              labels.push(filtered[i].title);
              data.push(filtered[i].numberInStock);
            }
        } else if (path === 'Prices') {
            const filtered = _.orderBy(movies, "dailyRentalRate", "desc").slice(0, 6);
        
            for (let i = 0; i < filtered.length; i++) {
              labels.push(filtered[i].title);
              data.push(filtered[i].dailyRentalRate);
            } 
        } 
        
      dispatch({
          type: SUCCESS_MOVIES_CHART_DATA,
          payload: {
              labels,
              data,
              path
          }
      })

    } catch (error: any) {
        if(error.response) {
            dispatch({
                type:REJECT_MOVIES_CHART_DATA,
                payload: error.response.data
            })

        }
    }

}