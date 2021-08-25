import React from "react";
import _ from "lodash";

const TableBody = (props) => {
  const { items, columns } = props;

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td>{_.get(item, column.path)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
