import http from "./httpService";

const apiEndPoint = '/rentals'

export function getRentals() {
    return http.get(apiEndPoint);
}

export function createRental(customerId: string, movieId: string) {
    return http.post(apiEndPoint, {customerId, movieId})
}

export function returnRental(customerId: string, movieId: string) {
    return http.post('/returns', {customerId, movieId})
}
