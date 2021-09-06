import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import Listgroup from "./common/listgroup";
import { paginate } from "./utils/paginate";
import MovieTable from "./movieTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

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

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({
      movies,
      genres,
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("The movie has already been deleted ");
      } else if (error.response && error.response.status === 400) {
        toast.error("Please login to do the operation !!");
      } else if (error.response) {
        toast.error(error.response.data);
      }

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, selectedGenre: "", currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

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
    const { user } = this.props;

    const { movies, totalCount } = this.getPageData();

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
          {user && (
            <Link to="/movies/new">
              <button className="btn btn-primary">New Movie</button>
            </Link>
          )}
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
