import React from "react";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import logger from "../services/logService";
import Form from "./common/form";
import Joi from "joi";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    defaultOption: "",
    genres: [],
    errors: {},
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(movieId);

      this.setState({
        data: this.mapToViewMovie(movie),
        defaultOption: movie.genre.name,
      });
    } catch (error) {
      logger.log(error);
      this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.populateGenres();
    this.populateMovies();
  }

  schemaObj = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(10).required(),
    dailyRentalRate: Joi.number().required(),
  };
  schema = Joi.object(this.schemaObj);

  mapToViewMovie = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/");
  };

  render() {
    const { match } = this.props;
    const { genres, defaultOption } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-login">
          <h1>{match.params.id}</h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres, defaultOption)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
