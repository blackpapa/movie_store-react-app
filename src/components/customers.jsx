import React, { Component } from "react";
import { getCustomers } from "./../services/fakeCustomerService";
import CustomerTable from "./customerTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Customer extends Component {
  state = {
    customers: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    const customers = getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery });
  };

  handleDelete = (customer) => {
    const customers = this.state.customers.filter(
      (c) => c._id !== customer._id
    );
    this.setState({ customers });
  };

  render() {
    const { sortColumn, searchQuery, customers: allCustomers } = this.state;

    let customers = allCustomers;

    if (searchQuery) {
      customers = allCustomers.filter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    customers = _.orderBy(customers, sortColumn.path, sortColumn.order);

    return (
      <React.Fragment>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
