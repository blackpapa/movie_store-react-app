import { Component } from "react";
import _ from "lodash";

interface Column {
  path?: string;
  label?: string;
  content?: (item: any) => JSX.Element;
  key?: string;
}

interface Props {
  columns: Column[];
  items: any[];
}

class TableBody extends Component<Props, {}> {
  renderCell = (item: any, column: Column) => {
    if (column.content) return column.content(item);

    let result = _.get(item, column.path as string);
    //Change date-time form with milliseconds and time zone to date-only form
    if (column.path && column.path.includes("date") && result) {
      return result.split("T")[0];
    }

    return typeof result === "boolean" ? result.toString() : result;
  };

  createKey = (column: Column) => {
    return column.path || column.key;
  };

  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
