import React, { ChangeEvent } from "react";

type Props = {
  name: string,
  label: string,
  items: any[],
  defaultOption: string,
  onChange:(e: ChangeEvent<HTMLSelectElement>) => void,
  error:string
}

const Select: React.FC<Props> = ({ name, label, items, defaultOption, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        className="form-control"
      >
        <option value="">{defaultOption}</option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert  alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
