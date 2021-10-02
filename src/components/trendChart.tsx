import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { QueryResult, useQuery } from "@apollo/client";
import { MOVIES_TREND } from "./trendGroup";
import { Bar, Doughnut } from "react-chartjs-2";
import { SUCCESS_MOVIES_CHART_DATA } from "../redux/actions/chartActions";
import { Dispatch } from "redux";
import ProgressBar from "./common/progressBar";
import _ from "lodash";

interface TrendChartProps {}

const TrendChart: React.FC<TrendChartProps> = () => {
  const chart = useSelector((state: RootStateOrAny) => state.chart);
  const dispatch: Dispatch = useDispatch();
  const {
    data: glData,
    loading,
    error,
  }: QueryResult = useQuery(MOVIES_TREND, { pollInterval: 100 });

  useEffect(() => {
    dispatch({
      type: SUCCESS_MOVIES_CHART_DATA,
      payload: {
        labels: labels,
        data: data,
        path: "RentalsCount",
      },
    });
  }, []);

  if (loading) return <ProgressBar />;
  if (error) return <h1>Error: {error}</h1>;

  const labels: string[] = [];
  const data: number[] = [];
  const filtered = _.orderBy(glData.movies, "rentalsCount", "desc").slice(0, 5);
  for (let i = 0; i < filtered.length; i++) {
    labels.push(filtered[i].title);
    data.push(filtered[i].rentalsCount);
  }

  return (
    <div>
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

export default TrendChart;
