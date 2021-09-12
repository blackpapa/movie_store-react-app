import React from "react";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";
import { SortColumn } from "./movies";
import Rental from "./rentals";

interface Props {
  rentals: Rental[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

class RentalTable extends React.Component<Props, {}> {
  columns: object[] = [
    { path: "customer.name", label: "Customer" },
    { path: "movie.title", label: "Movie" },
    { path: "dateOut", label: "DateOut" },
    { path: "dateReturn", label: "DateReturn" },
    { path: "rentalFee", label: "RentalFee" },
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
