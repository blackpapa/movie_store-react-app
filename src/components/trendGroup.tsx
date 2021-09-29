import React from "react";
import ProgressBar from "./common/progressBar";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import _ from "lodash";

interface Movie {
  id: string;
  title: string;
  rentalsCount: number;
}

interface MovieTrendData {
  movies: Movie[];
}

interface TrendGroupProps {}

export const MOVIES_TREND = gql`
  {
    movies {
      _id
      title
      rentalsCount
    }
  }
`;

const TrendGroup: React.FC<TrendGroupProps> = () => {
  const ranks: number[] = [1, 2, 3, 4, 5];
  let i = 0;

  const { data, error, loading }: QueryResult = useQuery<MovieTrendData>(
    MOVIES_TREND,
    { pollInterval: 500 }
  );

  if (loading) return <ProgressBar />;
  if (error) return <h1>Error: {error}</h1>;

  const trends = _.orderBy(data.movies, "rentalsCount", "desc").slice(0, 5);

  return (
    <div>
      <small className="text-muted">(Rank by total rentals)</small>
      <div className="list-group">
        {trends.map((trend) => (
          <Link
            key={trend._id}
            to="/trendChart"
            style={{ textDecoration: "none" }}
          >
            <label
              style={{ cursor: "pointer" }}
              className="list-group-item"
              key={trend._id}
            >
              <span className="d-block small opacity-50">
                {ranks[i++]}. Trend
              </span>
              {`#${trend.title}`}
              <span className="d-block small opacity-50">
                {trend.rentalsCount} total rentals
              </span>
            </label>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendGroup;
