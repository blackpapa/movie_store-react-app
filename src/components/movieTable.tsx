import  { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Like from "./common/like";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";


interface Movie {
  _id: string,
  title: string,
  genre: Genre,
  numberInStock: number,
  dailyRentalRate: number,
  liked?:boolean
}

interface Genre {
  _id: string,
  name: string,
}

interface SortColumn {
  path: string,
  order: string,
}

interface User {
  _id: string,
  name: string,
  isAdmin? : boolean,
}

interface Props {
  movies: Movie[]
  sortColumn: SortColumn,
  onLike: (movie: Movie) => void
  onDelete: (movie: Movie) => void
  onSort: (sortColumn: SortColumn) => void
}

class MovieTable extends Component<Props> {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie: Movie) => (
        <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie: Movie) => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie: Movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="button btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor(props: Props) {
    super(props);
    const user = getCurrentUser();
    if (user as User) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody columns={this.columns} items={movies} />
      </table>
    );
  }
}

export default MovieTable;
