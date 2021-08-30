import React from "react";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";

class MovieForm extends Form {
  genres = getGenres();

  doSubmit = () => {
    this.props.history.push("/");
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <form className="form-login">
          <h1>{match.params.id}</h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genres", "Genre", this.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          <button onClick={this.handleSave} className="button btn btn-primary">
            save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
