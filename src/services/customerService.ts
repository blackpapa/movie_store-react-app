import { AxiosResponse } from 'axios'
import http from './httpService'

const apiEndPoint = '/customers'

interface Customer {
    _id?: string,
    isGold: boolean,
    name: string
}

export function getCustomers(): Promise<AxiosResponse<any>> {
    return http.get(apiEndPoint)
}

export function getCustomer(customerId: string): Promise<AxiosResponse<any>> {
    return http.get(`${apiEndPoint}/${customerId}`)
}

export function deleteCustomer(customerId: string): Promise<AxiosResponse<any>> {
    return http.delete(`${apiEndPoint}/${customerId}`)
}

export function saveCustomer(customer: Customer): Promise<AxiosResponse<any>> {
    if(customer._id) {
        const body = {...customer};
        delete body._id;
        return http.put( `${apiEndPoint}/${customer._id}`, body)

    }

    //no _id
    return http.post(apiEndPoint, customer);
}