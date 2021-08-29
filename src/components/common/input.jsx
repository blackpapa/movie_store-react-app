import React from "react";

const Input = (props) => {
  const { type, label, name, value, onChange, error } = props;
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert  alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
