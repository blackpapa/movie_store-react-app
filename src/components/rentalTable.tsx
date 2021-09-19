import React from "react";
import { SortColumn } from "../redux/actions";
import { Rental } from "./rentals";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

interface Props {
  rentals: Rental[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
  onReturn: (rental: Rental) => void;
}

class RentalTable extends React.Component<Props, {}> {
  columns: object[] = [
    { path: "customer.name", label: "Customer" },
    { path: "movie.title", label: "Movie" },
    { path: "dateOut", label: "DateOut" },
    { path: "dateReturn", label: "DateReturn" },
    { path: "rentalFee", label: "RentalFee" },
    {
      key: "return",
      content: (rental: Rental) =>
        rental.dateReturn ? null : (
          <button
            onClick={() => this.props.onReturn(rental)}
            className="btn btn-primary btn-sm"
          >
            Return
          </button>
        ),
    },
  ];

  render() {
    const { rentals, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} items={rentals} />
      </table>
    );
  }
}

export default RentalTable;
