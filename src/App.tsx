import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import NavBar, { User } from "./components/common/navbar";
import Footer from "./components/common/footer";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CustomerFrom from "./components/customerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import "./App.css";

interface State {
  user?: User
}

class App extends Component<{}, State> {
  state = {};

  componentDidMount() {
    const user = getCurrentUser() as User;
    this.setState({ user });
  }

  render() {
    const { user } = this.state as State;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            ></Route>
            <Route path='/customers/:id' component={CustomerFrom} />
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
