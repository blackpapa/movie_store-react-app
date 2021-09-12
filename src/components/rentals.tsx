import React, { Component } from "react";
import { Customer } from "./customers";
import { SortColumn } from './movies';
import RentalTable from "./rentalTable";

interface Movie {
  title: string,
  dailyRentalRate: number
}

export interface Rental {
  customer: Customer,
  movie: Movie,
  dateOut?: Date,
  dateReturn?: Date,
  rentalFee?: number
}

interface State {
  rentals: Rental[]
  sortColumn : SortColumn
}

class Rentals extends Component<{}, State> {
  state = {rentals:[], sortColumn: { path: "name", order: "asc" }};
  render() {
    const {rentals} = this.state
    return <RentalTable rentals={rentals} />;
  }
}

export default Rentals;
