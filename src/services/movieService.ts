import http from "./httpService";

const apiEndPoint = "/movies";

interface Movie {
  _id?: string,
  title: string,
  genreId: string,
  numberInStock: string,
  dailyRentalRate: string,
  liked?:boolean
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId: string) {
  return http.get(`${apiEndPoint}/${movieId}`);
}

export function deleteMovie(movieId: string) {
  return http.delete(`${apiEndPoint}/${movieId}`);
}

export function saveMovie(movie: Movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return http.put(`${apiEndPoint}/${movie._id}`, body);
  }

  return http.post(apiEndPoint, movie);
}
