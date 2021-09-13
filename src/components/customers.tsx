import React, { Component } from "react";
import { getCustomers } from "../services/customerService";
import { Link } from "react-router-dom";
import CustomerTable from "./customerTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import ProgressBar from "./common/progressBar";
import { deleteCustomer } from "./../services/customerService";
import { toast } from "react-toastify";
import { User } from "./common/navbar";

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  isGold?: boolean;
}

interface SortColumn {
  path: string;
  order: string;
}

interface State {
  customers: Customer[];
  sortColumn: SortColumn;
  searchQuery: string;
  loadCompleted: boolean;
}

interface Props {
  user?: User;
}

class Customers extends Component<Props, State> {
  state = {
    customers: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
    loadCompleted: false,
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers, loadCompleted: true });
  }

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  handleDelete = async (customer: Customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(
      (c: Customer) => c._id !== customer._id
    );
    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.error("The movie has already been deleted ");
      } else if (error.response && error.response.status === 400) {
        toast.error("Please login to do the operation !!");
      } else if (error.response) {
        toast.error(error.response.data);
      }
      this.setState({ customers: originalCustomers });
    }
  };

  getPageData = () => {
    const { sortColumn, searchQuery, customers: allCustomers } = this.state;

    let customers = allCustomers;

    if (searchQuery) {
      customers = allCustomers.filter((c: Customer) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    customers = _.orderBy(
      customers,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    return { customers, totalCount: customers.length };
  };

  render() {
    const { sortColumn, searchQuery, loadCompleted } = this.state;

    const { customers, totalCount } = this.getPageData();

    return (
      <React.Fragment>
        {!loadCompleted ? (
          <ProgressBar />
        ) : (
          <div>
            <Link to="/customers/new">
              <button className="btn btn-primary">New Customer</button>
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <p>There are {totalCount} customers in the store</p>
            <CustomerTable
              customers={customers}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              sortColumn={sortColumn}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Customers;
