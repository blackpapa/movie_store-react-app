import http from "./httpService";

const apiEndPoint = '/rentals'

export function getRentals() {
    return http.get(apiEndPoint);
}