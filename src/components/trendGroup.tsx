import React from "react";
import { gql, useQuery } from "@apollo/client";

interface TrendGroupProps {}

const TrendGroup: React.FC<TrendGroupProps> = () => {
  const MOVIES_TREND = gql`
    {
      movies {
        title
        rentalsCount
      }
    }
  `;

  const result = useQuery(MOVIES_TREND);
  console.log(result);

  return <h1>Trend group</h1>;
};

export default TrendGroup;
