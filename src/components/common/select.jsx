import React from "react";

const Select = ({ name, label, items }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} id={name} className="custom-select">
        <option selected>Default</option>
        {items.map((item) => (
          <option>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
