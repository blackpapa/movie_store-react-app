import React, { Component } from "react";
import { getRentals, returnRental } from "../services/rentalService";
import { Customer } from "./customers";
import { paginate } from "./utils/paginate";
import { Link } from "react-router-dom";
import { User } from "./common/navbar";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router";
import { connect, RootStateOrAny } from "react-redux";
import {
  setCurrentPageAction,
  setLoadingAction,
  setQueryAction,
  SortColumn,
} from "../redux/actions";
import RentalTable from "./rentalTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import Pagination from "./common/pagination";
import moment from "moment";
import _ from "lodash";
import { setSortColumnAction } from "./../redux/actions/index";

interface Movie {
  _id: string;
  title: string;
  dailyRentalRate: number;
}

export interface Rental {
  _id: string;
  customer: Customer;
  movie: Movie;
  dateOut?: string;
  dateReturn?: string;
  rentalFee?: number;
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

interface State {
  rentals: Rental[];
}

class Rentals extends Component<Props, State> {
  state = {
    rentals: [],
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
    this.props.setLoadingAction(true);
  }

  handleSort = (sortColumn: SortColumn) => {
    this.props.setSortColumnAction(sortColumn);
  };

  handleSearch = (searchQuery: string) => {
    this.props.setQueryAction(searchQuery);
  };

  handlePage = (page: number) => {
    this.props.setCurrentPageAction(page);
  };

  handleReturn = async (rental: Rental): Promise<void> => {
    console.log(rental);

    const originalRentals = this.state.rentals;

    const rentals: Rental[] = [...this.state.rentals];
    const index = rentals.indexOf(rental);
    rentals[index] = { ...rental };
    rentals[index].dateReturn = moment().toISOString().split("T")[0];
    const rentalDays =
      moment().diff(rental.dateOut, "days") === 0
        ? 1
        : moment().diff(rental.dateOut, "days");
    rentals[index].rentalFee = rentalDays * rental.movie.dailyRentalRate;
    this.setState({ rentals });

    try {
      await returnRental(rental.customer._id, rental.movie._id);
    } catch (error: any) {
      if (error.response) toast.error(error.response.data);
      this.setState({ rentals: originalRentals });
    }
  };

  getPageData = () => {
    const { rentals: allRentals } = this.state;
    const { sortColumn, searchQuery } = this.props.sort;
    const { pageSize, currentPage } = this.props.pagination;

    let filtered;

    if (searchQuery) {
      filtered = allRentals.filter((r: Rental) =>
        r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered = allRentals;
    }

    filtered = _.orderBy(
      filtered,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    const rentals: Rental[] = paginate(filtered, currentPage, pageSize);

    return { rentals, totalCount: allRentals.length };
  };

  render() {
    const { user, pagination, sort, loading } = this.props;
    const { sortColumn, searchQuery } = sort;
    const { pageSize, currentPage } = pagination;
    const { rentals, totalCount } = this.getPageData();

    return (
      <React.Fragment>
        {!loading.loadCompleted ? (
          <ProgressBar />
        ) : (
          <div>
            {user && (
              <Link to="/rentals/new">
                <button className="btn btn-primary">New Rental</button>
              </Link>
            )}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <p>There are {totalCount} rentals in the store</p>
            <RentalTable
              rentals={rentals}
              onSort={this.handleSort}
              onReturn={this.handleReturn}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
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

export default connect(mapStateToProps, mapDispatchToProps())(Rentals);
