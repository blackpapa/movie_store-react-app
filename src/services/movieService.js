import http from "./httpService";

const apiEndPoint = "http://localhost:3900/api/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(`${apiEndPoint}/${movieId}`);
}

export function deleteMovie(movieId) {
  return http.delete(`${apiEndPoint}/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return http.put(`${apiEndPoint}/${movie._id}`, body);
  }

  return http.post(apiEndPoint, movie);
}
