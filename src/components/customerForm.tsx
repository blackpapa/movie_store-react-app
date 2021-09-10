import React from 'react';
import Form from './common/form';

 
class CustomerFrom extends Form {
    state = {data: {}, errors: {} }
    render() { 
        return (  <h1>{this.props.match.params.id}</h1>);
    }
}
 
export default CustomerFrom;