import Joi from 'joi';
import React from 'react';
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

    render() { 
        return (<div>
            <form className="form-login">
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