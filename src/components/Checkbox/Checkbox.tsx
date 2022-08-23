import React from "react";

interface ICheckbox {
  label: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;