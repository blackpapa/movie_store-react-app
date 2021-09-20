import { AnyAction } from 'redux';
import { AWAITING_CHART_DATA, REJECT_CHART_DATA, SUCCESS_CHART_DATA } from './../actions/getChartData';

const initialState = {
    loading: false,
    data: {
        labels: [],
        datasets: [
          {
            label: "# of Movies",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      error: ''
}

const chartReducer = (state = initialState, action: AnyAction) => {
    const {type, payload} = action;
    switch(type) {
        case AWAITING_CHART_DATA:
            return {
                ...state,
                loading: true
            }
        case SUCCESS_CHART_DATA:
            return {
                ...state,
                loading: false,
                data: {
                    labels: payload.labels,
                    datasets: [
                      {
                        label: "Stock of Movies",
                        data: payload.data,
                        backgroundColor: [
                          "rgba(165, 102, 121, 0.2)",
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 206, 86, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                          "rgba(153, 102, 255, 0.2)",
                          "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                          "rgba(165, 102, 121, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }

            }
            case REJECT_CHART_DATA:
                return {
                    ...state,
                    error: payload
                }
        default:
        return state
    }
}

export default chartReducer
