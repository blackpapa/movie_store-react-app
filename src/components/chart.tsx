import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getMoviesChartData } from "../redux/actions/chartActions";
import { toast } from "react-toastify";
import ProgressBar from "./common/progressBar";
import BtnToolBar from "./common/btnToolBar";

interface ChartProps {}

const Chart: React.FC<ChartProps> = () => {
  const dispatch = useDispatch();
  const chart = useSelector((state: RootStateOrAny) => state.chart);

  const handleChart = (path: string): void => {
    dispatch(getMoviesChartData(path));
  };

  useEffect(() => {
    dispatch(getMoviesChartData("Stocks"));
  }, []);

  if (chart.error) {
    toast.error(chart.error);
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-3 border-bottom">
        <h1 className="h2">Chart</h1>
        <BtnToolBar onChart={handleChart} />
      </div>
      {chart.loading ? (
        <ProgressBar />
      ) : (
        <div>
          <Bar data={chart.data} style={{ maxHeight: 500 }} />
          <Doughnut
            data={chart.data}
            style={{ maxHeight: 300, marginTop: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
