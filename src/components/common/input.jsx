import React from "react";

const Input = (props) => {
  const { label, name, value, onChange } = props;
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        autoFocus
        value={value}
        onChange={onChange}
        type="text"
        name={name}
        id={name}
        className="form-control"
      />
    </div>
  );
};

export default Input;
