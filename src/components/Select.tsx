import React from "react";

type SelectProps = {
  name?: string;
  id?: string;
  options: { label: string | number; value: string | number }[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  initialValue?: string | number | boolean;
};

const Select: React.FC<SelectProps> = ({
  name,
  id,
  options,
  onChange,
  value,
  className,
  initialValue,
}) => {
  return (
    <select
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      className={className}
    >
      {initialValue && (
        <option value="">
          {initialValue === true ? "Select one" : initialValue}
        </option>
      )}
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.displayName = "Select";

export default Select;
