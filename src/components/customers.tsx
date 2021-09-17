import React, { Component } from "react";
import { getCustomers } from "../services/customerService";
import { Link, RouteComponentProps } from "react-router-dom";
import { deleteCustomer } from "./../services/customerService";
import { toast } from "react-toastify";
import { User } from "./common/navbar";
import { paginate } from "./utils/paginate";
import { connect, RootStateOrAny } from "react-redux";
import {
  setCurrentPageAction,
  setQueryAction,
  setSortColumnAction,
  setLoadingAction,
  SortColumn,
} from "../redux/actions";
import CustomerTable from "./customerTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import Pagination from "./common/pagination";
import _ from "lodash";

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  isGold?: boolean;
}

interface State {
  customers: Customer[];
}

interface Props extends RouteComponentProps {
  user?: User;
  pagination: { pageSize: number; currentPage: number };
  sort: { sortColumn: SortColumn; searchQuery: string };
  loading: { loadCompleted: boolean };
  setCurrentPageAction: (payload: number) => {
    type: string;
    payload: number;
  };
  setQueryAction: (payload: string) => {
    type: string;
    payload: string;
  };
  setSortColumnAction: (payload: SortColumn) => {
    type: string;
    payload: SortColumn;
  };
  setLoadingAction: (payload: boolean) => {
    type: string;
    payload: boolean;
  };
}

class Customers extends Component<Props, State> {
  state = {
    customers: [],
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
    this.props.setLoadingAction(true);
  }

  componentWillUnmount() {
    this.props.setLoadingAction(false);
  }

  handleSort = (sortColumn: SortColumn) => {
    this.props.setSortColumnAction(sortColumn);
  };

  handleSearch = (searchQuery: string) => {
    this.props.setQueryAction(searchQuery);
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
    const { customers: allCustomers } = this.state;

    const { pagination, sort } = this.props;
    const { pageSize, currentPage } = pagination;
    const { searchQuery, sortColumn } = sort;

    let filtered;

    if (searchQuery) {
      filtered = allCustomers.filter((c: Customer) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered = allCustomers;
    }

    filtered = _.orderBy(
      filtered,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    const customers: Customer[] = paginate(filtered, currentPage, pageSize);

    return { customers, totalCount: allCustomers.length };
  };

  render() {
    const { user, pagination, sort, loading } = this.props;
    const { pageSize, currentPage } = pagination;
    const { searchQuery, sortColumn } = sort;

    const { customers, totalCount } = this.getPageData();

    return (
      <React.Fragment>
        {!loading.loadCompleted ? (
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
    loading: state.loading,
  };
};

const mapDispatchToProps = () => {
  return {
    setCurrentPageAction,
    setQueryAction,
    setSortColumnAction,
    setLoadingAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Customers);
