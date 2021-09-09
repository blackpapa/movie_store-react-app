import { Component } from "react";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

interface Customer {
  _id:string,
  name: string,
  phone: string,
  isGold?: boolean
}

interface SortColumn {
  path: string,
  order: string,
}

interface Props {
  customers: Customer[],
  sortColumn: SortColumn,
  onDelete: (customer: Customer) => void
  onSort: (sortColumn: SortColumn) => void
}

class CustomerTable extends Component<Props,{}> {
  state = {};
  columns = [
    { path: "name", label: "Name" },
    { path: "isGold", label: "IsGold" },
    { path: "phone", label: "Phone" },
    {
      key: "delete",
      content: (customer: Customer) => (
        <button
          onClick={() => this.props.onDelete(customer)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { customers, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody columns={this.columns} items={customers} />
      </table>
    );
  }
}

export default CustomerTable;
