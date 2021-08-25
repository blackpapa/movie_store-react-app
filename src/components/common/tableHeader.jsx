import React, { Component } from "react";

class TableHeader extends Component {
  state = {};

  render() {
    const { columns, onSort } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => onSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
