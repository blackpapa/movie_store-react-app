import { AnyAction } from 'redux';

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
      }
}

const chartReducer = (state = initialState, action: AnyAction) => {
    const {type, payload} = action;
    switch(type) {

        default:
        return state
    }
}

export default chartReducer
