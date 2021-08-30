import React from "react";

const Select = ({ name, label, items }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} id={name} className="form-control">
        <option value="">Default</option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
