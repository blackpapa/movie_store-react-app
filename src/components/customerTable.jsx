import React, { Component } from "react";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

class CustomerTable extends Component {
  state = {};
  columns = [
    { path: "name", label: "Name" },
    { path: "isGold", label: "IsGold" },
    { path: "phone", label: "Phone" },
  ];
  render() {
    const { customers, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody columns={this.columns} items={customers} />
      </table>
    );
  }
}

export default CustomerTable;
