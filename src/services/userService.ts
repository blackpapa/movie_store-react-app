import http from "./httpService";

const apiEndPoint = "/users";

interface User {
  name: string,
  username: string,
  password: string
}

export function register(user: User) {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
