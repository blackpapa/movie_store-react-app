import React, { Component } from "react";
import { getCustomers } from "../services/customerService";
import { Link } from 'react-router-dom';
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

class Customers extends Component<{},State> {
  state = {
    customers: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const {data: customers} = await getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  handleDelete = (customer:Customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(
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
        <Link to ="/customers/new">
          <button className="btn btn-primary">New Customer</button>
        </Link>
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

export default Customers;
