import React from "react";
import { gql, QueryResult, useQuery } from "@apollo/client";
import _ from "lodash";
import ProgressBar from "./common/progressBar";

interface Movie {
  id: string;
  title: string;
  rentalsCount: number;
}

interface MovieTrendData {
  movies: Movie[];
}

interface TrendGroupProps {}

const MOVIES_TREND = gql`
  {
    movies {
      id
      title
      rentalsCount
    }
  }
`;

const TrendGroup: React.FC<TrendGroupProps> = () => {
  const { data, error, loading }: QueryResult =
    useQuery<MovieTrendData>(MOVIES_TREND);
  if (loading) return <ProgressBar />;
  if (error) return <h1>Error: {error}</h1>;

  const trends = _.orderBy(data.movies, "rentalsCount", "desc").slice(0, 5);

  return (
    <div>
      <h5>Trend</h5>
      <ul className="list-group">
        {trends.map((trend) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={trend.id}
          >
            {`#${trend.title}`}
            <small>{trend.rentalsCount}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendGroup;
