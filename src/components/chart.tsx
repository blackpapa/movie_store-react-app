import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getMovies } from "./../services/movieService";
import _ from "lodash";

interface ChartProps {}

const Chart: React.FC<ChartProps> = () => {
  let data = {
    labels: [] as string[],
    datasets: [
      {
        label: "# of Movies",
        data: [] as number[],
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
  };

  useEffect(() => {
    async function fetchData() {
      const { data: movies } = await getMovies();
      const filtered = _.orderBy(movies, "numberInStock", "desc").slice(0, 6);

      for (let i = 0; i < filtered.length; i++) {
        data.labels.push(filtered[i].title);
        data.datasets[0].data.push(filtered[i].numberInStock);
      }
    }

    fetchData();
  }, []);

  return <Bar data={data} />;
};

export default Chart;
