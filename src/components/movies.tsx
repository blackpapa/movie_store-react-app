import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "./utils/paginate";
import { toast } from "react-toastify";
import { connect, RootStateOrAny } from "react-redux";
import {
  setCurrentPageAction,
  setLoadingAction,
  setQueryAction,
  setSortColumnAction,
  SortColumn,
} from "../redux/actions/index";
import Pagination from "./common/pagination";
import Listgroup from "./common/listgroup";
import MovieTable from "./movieTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import _ from "lodash";
import TrendGroup from "./trendGroup";

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

interface User {
  _id: string;
  name: string;
  isAdmin?: boolean;
}

interface Props extends RouteComponentProps {
  user?: User;
  pagination: { pageSize: number; currentPage: number };
  loading: { loadCompleted: boolean };
  sort: { searchQuery: string; sortColumn: SortColumn };
  movies: Movie[];
  genres: Genre[];
  setCurrentPageAction: (payload: number) => {
    type: string;
    payload: number;
  };
  setLoadingAction: (payload: boolean) => {
    type: string;
    payload: boolean;
  };
  setQueryAction: (payload: string) => {
    type: string;
    payload: string;
  };
  setSortColumnAction: (payload: SortColumn) => {
    type: string;
    payload: SortColumn;
  };
}

interface State {
  movies: Movie[];
  genres: Genre[];
  selectedGenre: Genre | {};
}

class Movies extends Component<Props, State> {
  state = {
    movies: [],
    genres: [],
    selectedGenre: { _id: "", name: "All Genres" },
  };

  async componentDidMount() {
    const { movies, genres: data } = this.props;

    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({
      movies,
      genres,
    });
    this.props.setSortColumnAction({ path: "title", order: "asc" });
    this.props.setLoadingAction(true);
  }

  componentWillUnmount() {
    this.props.setLoadingAction(false);
    this.props.setCurrentPageAction(1);
    this.props.setQueryAction("");
    this.props.setSortColumnAction({ path: "name", order: "asc" });
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
    this.props.setCurrentPageAction(page);
  };

  handleSelectedGenre = (genre: Genre): void => {
    this.props.setCurrentPageAction(1);
    this.props.setQueryAction("");
    this.setState({ selectedGenre: genre });
  };

  handleSort = (sortColumn: SortColumn): void => {
    this.props.setSortColumnAction(sortColumn);
  };

  handleSearch = (searchQuery: string): void => {
    this.props.setCurrentPageAction(1);
    this.props.setQueryAction(searchQuery);
    this.setState({ selectedGenre: {} });
  };

  getPageData = (): {
    movies: Movie[];
    totalCount: number;
  } => {
    const { movies: allMovies, selectedGenre } = this.state;

    const { pageSize, currentPage } = this.props.pagination;
    const { searchQuery, sortColumn } = this.props.sort;

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
    const { genres, selectedGenre } = this.state;
    const { user, pagination, loading, sort } = this.props;
    const { searchQuery, sortColumn } = sort;
    const { pageSize, currentPage } = pagination;

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
          <br />
          <TrendGroup />
        </div>
        {!loading.loadCompleted ? (
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

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    pagination: state.pagination,
    sort: state.sort,
    loading: state.loading,
  };
};

const mapDispatchToProps = () => {
  return {
    setCurrentPageAction,
    setQueryAction,
    setLoadingAction,
    setSortColumnAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Movies);
