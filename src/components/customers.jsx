import React, { Component } from "react";
import { getCustomers } from "./../services/fakeCustomerService";
import CustomerTable from "./customerTable";
import _ from "lodash";

class Customer extends Component {
  state = { customers: [], sortColumn: { path: "name", order: "asc" } };

  componentDidMount() {
    const customers = getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = (customer) => {
    const customers = this.state.customers.filter(
      (c) => c._id !== customer._id
    );
    this.setState({ customers });
  };

  render() {
    const { sortColumn } = this.state;

    let customers = _.orderBy(
      this.state.customers,
      sortColumn.path,
      sortColumn.order
    );
    return (
      <React.Fragment>
        <CustomerTable
          customers={customers}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
          sortColumn={sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default Customer;
