import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getChartData } from "../redux/actions/getChartData";
import ProgressBar from "./common/progressBar";
import _ from "lodash";

interface ChartProps {}

const Chart: React.FC<ChartProps> = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStateOrAny) => state.chart);

  useEffect(() => {
    dispatch(getChartData());
  }, []);

  return state.loading ? <ProgressBar /> : <Bar data={state.data} />;
};

export default Chart;
