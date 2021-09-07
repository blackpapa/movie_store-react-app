import React, { ChangeEvent } from "react";

interface Props {
  value: string,
  onChange: (e: string) => void
}

const SearchBox: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      style={{ maxWidth: 500 }}
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
