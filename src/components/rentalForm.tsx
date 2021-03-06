import React from "react";
import Form from "./common/form";
import { getCustomers } from "../services/customerService";
import { getMovies } from "./../services/movieService";
import { createRental } from "../services/rentalService";
import Joi from "joi";

class RentalForm extends Form {
  state = {
    data: { customerId: "", movieId: "" },
    errors: {},
    options: [],
    secondOptions: [],
  };

  schemaObj = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  schema = Joi.object(this.schemaObj);

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    const { data: movies } = await getMovies();

    this.setState({ options: customers, secondOptions: movies });
  }

  doSubmit = async () => {
    const { customerId, movieId } = this.state.data;
    await createRental(customerId, movieId);

    this.props.history.push("/rentals");
  };

  render() {
    const { options, secondOptions } = this.state;
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit} className="form-login">
          {this.renderSelect("customerId", "Customer", options)}
          {this.renderSelect("movieId", "Movie", secondOptions)}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default RentalForm;
