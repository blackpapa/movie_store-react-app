import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndPoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
