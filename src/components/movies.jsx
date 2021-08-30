import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import Listgroup from "./common/listgroup";
import { paginate } from "./utils/paginate";
import MovieTable from "./movieTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { _id: "", name: "All Genres" },
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies,
      genres,
    });
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    console.log(searchQuery);
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    filtered = _.orderBy(filtered, sortColumn.path, sortColumn.order);

    const movies = paginate(filtered, currentPage, pageSize);

    return { movies, totalCount: filtered.length };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    const { movies, totalCount } = this.getPageData();

    if (count === 0) return <p>There is no movie in the store</p>;
    return (
      <div className="row">
        <div className="col-2">
          <Listgroup
            items={genres}
            onItemSelect={this.handleSelectedGenre}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <Link to="/movies/new">
            <button className="btn btn-primary">New Movie</button>
          </Link>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <p>There are {totalCount} movies in the store</p>
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
