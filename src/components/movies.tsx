import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "./utils/paginate";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import Listgroup from "./common/listgroup";
import MovieTable from "./movieTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import _ from "lodash";

export interface Movie {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
  liked?: boolean;
}

export interface Genre {
  _id: string;
  name: string;
}

export interface SortColumn {
  path: string;
  order: string;
}

interface User {
  _id: string;
  name: string;
  isAdmin?: boolean;
}

interface Props extends RouteComponentProps {
  user?: User;
}

interface State {
  movies: Movie[];
  genres: Genre[];
  pageSize: number;
  currentPage: number;
  selectedGenre: Genre | {};
  searchQuery: string;
  sortColumn: SortColumn;
  loadCompleted: boolean;
}

class Movies extends Component<Props, State> {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    selectedGenre: { _id: "", name: "All Genres" },
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    loadCompleted: false,
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({
      movies,
      genres,
      loadCompleted: true,
    });
  }

  handleDelete = async (movie: Movie): Promise<void> => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m: Movie) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error: any) {
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

  handleLike = (movie: Movie): void => {
    const movies: Movie[] = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;

    this.setState({ movies });
  };

  handlePageChange = (page: number): void => {
    this.setState({ currentPage: page });
  };

  handleSelectedGenre = (genre: Genre): void => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn: SortColumn): void => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery: string): void => {
    this.setState({ searchQuery, selectedGenre: {}, currentPage: 1 });
  };

  getPageData = (): {
    movies: Movie[];
    totalCount: number;
  } => {
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
      filtered = allMovies.filter((m: Movie) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m: Movie) => m.genre._id === selectedGenre._id)
          : allMovies;
    }

    filtered = _.orderBy(
      filtered,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    const movies: Movie[] = paginate(filtered, currentPage, pageSize);

    return { movies, totalCount: filtered.length };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn,
      selectedGenre,
      searchQuery,
      loadCompleted,
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
            valueProperty={"_id"}
            textProperty={"name"}
          />
        </div>
        {!loadCompleted ? (
          <ProgressBar />
        ) : (
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
        )}
      </div>
    );
  }
}

export default Movies;
