import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.push("/");
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>{match.params.id}</h1>
        <button onClick={this.handleSave} className="button btn btn-primary">
          save
        </button>
      </div>
    );
  }
}

export default MovieForm;
