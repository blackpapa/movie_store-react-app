import React  from 'react';
import TableBody from './common/tableBody';
import Rental from './rentals';

interface Props {
    rentals: Rental[]
}
 
 
class RentalTable extends React.Component<Props, {}> {
    coulmns: object[] = []
  
    render() { 
        const { rentals} = this.props
        return (<TableBody columns={} items={rentals} />  );
    }
}
 
export default RentalTable;