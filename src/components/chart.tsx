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
        <h1 className="h2">Dashboard</h1>
        <BtnToolBar />
      </div>
      {state.loading ? <ProgressBar /> : <Bar data={state.data} />};
    </div>
  );
};

export default Chart;
