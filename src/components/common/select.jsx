import React from "react";

const Select = ({
  name,
  label,
  items,
  defaultOption,
  valueProperty,
  textProperty,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} id={name} className="form-control">
        <option value="">{defaultOption}</option>
        {items.map((item) => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default Select;
