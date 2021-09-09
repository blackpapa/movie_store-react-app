import { Component } from "react";
import _ from "lodash";

interface Column {
  path?: string,
  label?: string,
  content?: (item: any) => JSX.Element;
  key?: string,
}

interface Props {
  columns: Column[],
  items: any[],
}

class TableBody extends Component<Props,{}> {
  renderCell = (item: any, column: Column) => {
    if (column.content) return column.content(item);

    return typeof _.get(item, column.path as string) === "boolean"
      ? _.get(item, column.path as string).toString()
      : _.get(item, column.path as string);
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
