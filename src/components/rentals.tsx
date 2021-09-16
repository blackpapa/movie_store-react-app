import React, { Component } from "react";
import { getRentals, returnRental } from "../services/rentalService";
import { Customer } from "./customers";
import { SortColumn } from "./movies";
import { paginate } from "./utils/paginate";
import { Link } from "react-router-dom";
import { User } from "./common/navbar";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router";
import RentalTable from "./rentalTable";
import SearchBox from "./common/searchBox";
import ProgressBar from "./common/progressBar";
import Pagination from "./common/pagination";
import moment from "moment";
import _ from "lodash";
import { connect, RootStateOrAny } from "react-redux";
import { setCurrentPageAction } from "../redux/actions";

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
  setCurrentPageAction: (payload: number) => {
    type: string;
    payload: number;
  };
}

interface State {
  rentals: Rental[];
  sortColumn: SortColumn;
  searchQuery: string;
  loadCompleted: boolean;
  currentPage: number;
  pageSize: number;
}

class Rentals extends Component<Props, State> {
  state = {
    rentals: [],
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
    loadCompleted: false,
    currentPage: 1,
    pageSize: 5,
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();

    this.setState({ rentals, loadCompleted: true });
  }

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  handlePage = (page: number) => {
    this.setState({ currentPage: page });
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
    const {
      rentals: allRentals,
      sortColumn,
      searchQuery,
      currentPage,
      pageSize,
    } = this.state;

    let filtered;

    if (searchQuery)
      filtered = allRentals.filter((r: Rental) =>
        r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    filtered = _.orderBy(
      allRentals,
      sortColumn.path,
      sortColumn.order as "asc" | "desc"
    );

    const rentals: Rental[] = paginate(filtered, currentPage, pageSize);

    return { rentals, totalCount: allRentals.length };
  };

  render() {
    const { sortColumn, searchQuery, loadCompleted, currentPage, pageSize } =
      this.state;

    const { user } = this.props;
    const { rentals, totalCount } = this.getPageData();

    return (
      <React.Fragment>
        {!loadCompleted ? (
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
  };
};

const mapDispatchToProps = () => {
  return {
    setCurrentPageAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Rentals);
