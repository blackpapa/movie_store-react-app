import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getMoviesChartData } from "../redux/actions/getMoviesChartData";
import { toast } from "react-toastify";
import ProgressBar from "./common/progressBar";

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

  return state.loading ? <ProgressBar /> : <Bar data={state.data} />;
};

export default Chart;
