import Joi from 'joi';
import React from 'react';
import { getCustomer, saveCustomer } from '../services/customerService';
import { Customer } from './customers';
import logger from '../services/logService'
import Form from './common/form';

 
class CustomerFrom extends Form {
    state = {data: {name: "", isGold: "", phone: ""}, errors: {} }
    
    schemaObj = {
        _id: Joi.string(),
        name: Joi.string().required(),
        isGold: Joi.boolean(),
        phone: Joi.string().required()
    }
    schema = Joi.object(this.schemaObj)

    mapToViewCustomer = (customer: Customer) => {
        return {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        }
    }

    populateCustomers = async (): Promise<void> => {
        const customerId = this.props.match.params.id
        if(customerId === 'new')
        return ;

        try {
           const {data: customer} = await getCustomer(customerId as string);
           
           this.setState({data: this.mapToViewCustomer(customer as Customer)})
        } catch (error: any) {
            logger.log(error)
            this.props.history.replace('/not-found')
        }

    }

    doSubmit = async() => {
        await saveCustomer(this.state.data);
        this.props.history.push('/customers')
    }

    async componentDidMount() {
        this.populateCustomers()
    }

    render() { 
        return (<div>
            <form onSubmit={this.handleSubmit} className="form-login">
                <h1>{this.props.match.params.id}</h1>
                {this.renderInput('name', 'Name')}
                {this.renderInput('isGold', 'IsGold')}
                {this.renderInput('phone', 'Phone')}
                {this.renderButton('Save')}
            </form>
        </div>);
    }
}
 
export default CustomerFrom;