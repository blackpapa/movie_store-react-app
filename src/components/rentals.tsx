import React, { Component } from "react";
import { getRentals } from "../services/rentalService";
import { Customer } from "./customers";
import { SortColumn } from "./movies";
import RentalTable from "./rentalTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import { User } from "./common/navbar";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

interface Movie {
  title: string;
  dailyRentalRate: number;
}

export interface Rental {
  customer: Customer;
  movie: Movie;
  dateOut?: Date;
  dateReturn?: Date;
  rentalFee?: number;
}

interface Props {
  user?: User;
}

interface State {
  rentals: Rental[];
  sortColumn: SortColumn;
  searchQuery: string;
  loadCompleted: boolean;
  currentPage: number;
  pageSize: number;
}

class Rentals extends Component<Props, State> {
  state = {
    rentals: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
    loadCompleted: false,
    currentPage: 1,
    pageSize: 4,
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();

    this.setState({ rentals, loadCompleted: true });
  }

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  handlePage = (page: number) => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const {
      rentals: allRentals,
      sortColumn,
      searchQuery,
      currentPage,
      pageSize,
    } = this.state;

    let filtered;

    if (searchQuery)
      filtered = allRentals.filter((r: Rental) =>
        r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    filtered = _.orderBy(
      allRentals,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    const rentals: Rental[] = paginate(filtered, currentPage, pageSize);

    return { rentals, totalCount: allRentals.length };
  };

  render() {
    const { sortColumn, searchQuery, loadCompleted, currentPage, pageSize } =
      this.state;

    const { rentals, totalCount } = this.getPageData();

    return (
      <React.Fragment>
        {!loadCompleted ? (
          <ProgressBar />
        ) : (
          <div>
            <Link to="/rentals/new">
              <button className="btn btn-primary">New Rental</button>
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <p>There are {totalCount} rentals in the store</p>
            <RentalTable
              rentals={rentals}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePage}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Rentals;
