import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import { Provider } from "react-redux";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import NavBar, { User } from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CustomerFrom from "./components/customerForm";
import RentalForm from "./components/rentalForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import store from "./store";
import Chart from "./components/chart";
import TrendChart from "./components/trendChart";
import "./App.css";
import GqlCustomers from "./components/gqlCustomers";
import GqlMovies from "./components/gqlMovies";

interface State {
  user?: User;
}

class App extends Component<{}, State> {
  state = {};

  componentDidMount() {
    document.title = "Movie Store";
    const user = getCurrentUser() as User;
    this.setState({ user });
  }

  render() {
    const { user } = this.state as State;
    return (
      <React.Fragment>
        <Provider store={store}>
          <ToastContainer />
          <NavBar user={user} />
          <main className="container">
            <Switch>
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={(props) => <GqlMovies {...props} user={user} />}
              ></Route>
              <ProtectedRoute path="/customers/:id" component={CustomerFrom} />
              <Route
                path="/customers"
                render={(props) => <GqlCustomers {...props} user={user} />}
              ></Route>
              <ProtectedRoute path="/rentals/:id" component={RentalForm} />
              <Route
                path="/rentals"
                render={(props) => <Rentals {...props} user={user} />}
              ></Route>
              <Route path="/chart" component={Chart}></Route>
              <Route path="/trendchart" component={TrendChart}></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Route path="/login" component={LoginForm}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/register" component={RegisterForm}></Route>
              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
