import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";

http.setJwt(getJwt());

export async function login(email: string, password: string) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");

    if (jwt === null)
    return null;
    
    return jwtDecode(jwt);
  } catch (error) {
    //If jwt is null, pass the error
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
};
