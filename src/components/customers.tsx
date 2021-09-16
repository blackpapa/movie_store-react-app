import React, { Component } from "react";
import { getCustomers } from "../services/customerService";
import { Link, RouteComponentProps } from "react-router-dom";
import CustomerTable from "./customerTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import { deleteCustomer } from "./../services/customerService";
import { toast } from "react-toastify";
import { User } from "./common/navbar";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import { connect, RootStateOrAny } from "react-redux";
import { setCurrentPageAction } from "../redux/actions";

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

interface Props extends RouteComponentProps {
  user?: User;
  pagination: { pageSize: number; currentPage: number };
  setCurrentPageAction: (payload: number) => {
    type: string;
    payload: number;
  };
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

  handlePage = (page: number) => {
    this.props.setCurrentPageAction(page);
  };

  getPageData = () => {
    const { sortColumn, searchQuery, customers: allCustomers } = this.state;

    const { pageSize, currentPage } = this.props.pagination;

    let filtered;

    if (searchQuery) {
      filtered = allCustomers.filter((c: Customer) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    filtered = _.orderBy(
      allCustomers,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    const customers: Customer[] = paginate(filtered, currentPage, pageSize);

    return { customers, totalCount: allCustomers.length };
  };

  render() {
    const { sortColumn, searchQuery, loadCompleted } = this.state;

    const { user, pagination } = this.props;
    const { pageSize, currentPage } = pagination;

    const { customers, totalCount } = this.getPageData();

    return (
      <React.Fragment>
        {!loadCompleted ? (
          <ProgressBar />
        ) : (
          <div>
            {user && (
              <Link to="/customers/new">
                <button className="btn btn-primary">New Customer</button>
              </Link>
            )}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <p>There are {totalCount} customers in the store</p>
            <CustomerTable
              customers={customers}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePage}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    pagination: state.pagination,
    sort: state.sort,
  };
};

const mapDispatchToProps = () => {
  return {
    setCurrentPageAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Customers);
