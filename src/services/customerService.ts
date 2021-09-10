import http from './httpService'

const apiEndPoint = '/customers'

interface Customer {
    _id?: string,
    isGold: boolean,
    name: string
}

export function getCustomers(): Promise<Response> {
    return http.get(apiEndPoint)
}

export function getCustomer(customerId): Promise<Response> {
    return http.get(`${apiEndPoint}/${customerId}`)
}

export function deleteCustomer(customerId): Promise<Response> {
    return http.delete(`${apiEndPoint}/${customerId}`)
}

export function saveCustomer(customer: Customer): Promise<Response> {
    if(customer._id) {
        const body = {...customer};
        delete body._id;
        return http.put( `${apiEndPoint}/${customer._id}`, body)

    }

    //no _id
    return http.post(apiEndPoint, customer);
}