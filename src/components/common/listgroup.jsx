import React from "react";

const Listgroup = (props) => {
  const { items, onItemSelect, valueProperty, textProperty } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className="list-group-item"
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
