import React from "react";
import Movies from "../components/movies";
import { User } from "./common/navbar";
import { RouteComponentProps } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ProgressBar from "./common/progressBar";

interface GqlMoviesProps extends RouteComponentProps {
  user?: User;
}

const getMoviesAndGenresQuery = gql`
  {
    movies {
      _id
      title
      genre {
        _id
        name
      }
      numberInStock
      dailyRentalRate
      liked
    }

    genres {
      _id
      name
    }
  }
`;

const GqlMovies: React.FC<GqlMoviesProps> = ({ user, ...rest }) => {
  const { data, error, loading } = useQuery(getMoviesAndGenresQuery);

  if (loading) return <ProgressBar />;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <Movies user={user} {...rest} movies={data.movies} genres={data.genres} />
  );
};

export default GqlMovies;
