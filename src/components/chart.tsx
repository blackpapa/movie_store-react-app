import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getMoviesChartData } from "../redux/actions/getMoviesChartData";
import { toast } from "react-toastify";
import ProgressBar from "./common/progressBar";
import BtnToolBar from "./common/btnToolBar";

interface ChartProps {}

const Chart: React.FC<ChartProps> = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStateOrAny) => state.chart);

  useEffect(() => {
    dispatch(getMoviesChartData());
  }, []);

  if (state.error) {
    toast.error(state.error);
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-3 border-bottom">
        <h1 className="h2">Chart</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              type="button"
              onClick={() => dispatch(getMoviesChartData())}
              className="btn btn-sm btn-outline-secondary"
            >
              Stocks
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Prices
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-calendar"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            This week
          </button>
        </div>
      </div>
      {state.loading ? (
        <ProgressBar />
      ) : (
        <Bar data={state.data} style={{ maxHeight: 500 }} />
      )}
    </div>
  );
};

export default Chart;
