import { Component } from "react";


interface SortColumn {
  path: string,
  order: string,
}

interface Column {
    path?: string,
    label?: string,
    content?: (item: any) => JSX.Element;
    key?: string,
}

interface Props {
  columns: Column[],
  sortColumn: SortColumn,
  onSort: (sortColumn: SortColumn) => void

}

class TableHeader extends Component<Props,{}> {
  raiseSort = (path: string ) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    return this.props.onSort(sortColumn);
  };

  renderSortIcon = (column: Column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path as string)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
