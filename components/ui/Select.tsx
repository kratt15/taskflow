import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
  options?: SelectOption[];
}

export default function Select({
  label,
  error,
  helperText,
  required,
  containerClassName = "",
  className = "",
  id,
  options,
  children,
  ...props
}: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`form-control w-full ${containerClassName}`}>
      {label && (
        <label className="label" htmlFor={selectId}>
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <select
        id={selectId}
        className={`select select-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          error ? "select-error" : ""
        } ${className}`}
        required={required}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
      {(error || helperText) && (
        <label className="label">
          <span className={`label-text-alt ${error ? "text-error" : ""}`}>
            {error || helperText}
          </span>
        </label>
      )}
    </div>
  );
}
