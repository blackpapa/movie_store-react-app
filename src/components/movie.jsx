import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import Listgroup from "./common/listgroup";
import { paginate } from "./utils/paginate";
import MovieTable from "./movieTable";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies, genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movie.liked = !movie.liked;
    this.setState(movies);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelectedGenre = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    if (count === 0) return <p>There is no movie in the store</p>;
    return (
      <div className="row">
        <div className="col-2">
          <Listgroup
            items={genres}
            onItemSelect={this.handleSelectedGenre}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>There are {filtered.length} movies in the store</p>
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
