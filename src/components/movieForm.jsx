import React from "react";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";
import Joi from "joi";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreName: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
  };

  componentDidMount() {
    this.setState({ data: this.loadMovie() });
  }

  schemaObj = {
    title: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(10).required(),
    dailyRentalRate: Joi.number().required(),
  };
  schema = Joi.object(this.schemaObj);

  loadMovie = () => {
    const movie = getMovie(this.props.match.params.id);
    const genreName = movie.genre.name;
    const title = movie.title;
    const numberInStock = movie.numberInStock;
    const dailyRentalRate = movie.dailyRentalRate;
    return { title, genreName, numberInStock, dailyRentalRate };
  };

  doSubmit = () => {
    this.props.history.push("/");
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-login">
          <h1>{match.params.id}</h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genres",
            "Genre",
            getGenres(),
            this.state.data.genreName
          )}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
