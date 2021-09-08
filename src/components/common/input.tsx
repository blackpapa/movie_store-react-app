import React, { ChangeEvent } from "react";

type Props = {
  type: string,
  label: string,
  name: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error: string
}

const Input: React.FC<Props> = (props) => {
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
