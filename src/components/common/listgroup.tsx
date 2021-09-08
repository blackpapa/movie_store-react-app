import React from "react";

type Item = {
  _id: string,
  name: string,
  [propName: string] : string;
}

type Props = {
  items: Item[],
  onItemSelect : (item: Item) => void
  selectedItem: Item,
  valueProperty: string,
  textProperty: string
}

const Listgroup: React.FC<Props> = (props) => {
  const { items, onItemSelect, selectedItem, valueProperty, textProperty } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            selectedItem.name === item.name
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Listgroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default Listgroup;
