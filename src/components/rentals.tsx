import React, { Component } from "react";
import { getRentals } from "../services/rentalService";
import { Customer } from "./customers";
import { SortColumn } from "./movies";
import RentalTable from "./rentalTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import ProgressBar from "./common/progressBar";

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

interface State {
  rentals: Rental[];
  sortColumn: SortColumn;
  searchQuery: string;
  loadCompleted: boolean;
}

class Rentals extends Component<{}, State> {
  state = {
    rentals: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
    loadCompleted: false,
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

  render() {
    const {
      rentals: allRentals,
      sortColumn,
      searchQuery,
      loadCompleted,
    } = this.state;

    let rentals = allRentals;

    if (searchQuery)
      rentals = allRentals.filter((r: Rental) =>
        r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    rentals = _.orderBy(
      rentals,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );
    return (
      <React.Fragment>
        {!loadCompleted ? (
          <ProgressBar />
        ) : (
          <div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <p>There are {rentals.length} rentals in the store</p>
            <RentalTable
              rentals={rentals}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Rentals;
