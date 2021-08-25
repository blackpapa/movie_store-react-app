import React from "react";

const TableHeader = (props) => {
  const { columns, onSort } = props;

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.path} onClick={() => onSort(column.path)}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
