import React, { Component } from "react";
import { getRentals } from "../services/rentalService";
import { Customer } from "./customers";
import { SortColumn } from "./movies";
import RentalTable from "./rentalTable";

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
}

class Rentals extends Component<{}, State> {
  state = { rentals: [], sortColumn: { path: "name", order: "asc" } };

  async componentDidMount() {
    const { data: rentals } = await getRentals();

    this.setState({ rentals });
  }

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { rentals, sortColumn } = this.state;
    return (
      <RentalTable
        rentals={rentals}
        onSort={this.handleSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default Rentals;
