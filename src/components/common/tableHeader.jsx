import React from "react";

const TableHeader = (props) => {
  const { columns, onSort } = props;

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
};

export default TableHeader;
