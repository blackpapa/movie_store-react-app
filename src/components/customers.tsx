import React, { Component } from "react";
import { getCustomers } from "../services/fakeCustomerService";
import CustomerTable from "./customerTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";

interface Customer {
  _id:string,
  name: string,
  phone: string,
  isGold?: boolean
}

interface SortColumn {
  path: string,
  order: string,
}

interface State {
  customers: Customer[],
  sortColumn: SortColumn,
  searchQuery: string,
}

class Customer extends Component<State> {
  state = {
    customers: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    const customers = getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  handleDelete = (customer:Customer) => {
    const customers = this.state.customers.filter(
      (c: Customer) => c._id !== customer._id
    );
    this.setState({ customers });
  };

  render() {
    const { sortColumn, searchQuery, customers: allCustomers } = this.state;

    let customers = allCustomers;

    if (searchQuery) {
      customers = allCustomers.filter((c: Customer) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    customers = _.orderBy(customers, sortColumn.path, sortColumn.order as ("asc" | "desc"));

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
