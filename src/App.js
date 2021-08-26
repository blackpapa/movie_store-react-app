import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";

function App() {
  return (
    <main style={{ paddingTop: "20px" }} className="container">
      <Switch>
        <Route path="/movies/:id" component={MovieForm}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
