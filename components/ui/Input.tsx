import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  helperText,
  required,
  containerClassName = "",
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`form-control w-full ${containerClassName}`}>
      {label && (
        <label className="label" htmlFor={inputId}>
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <input
        id={inputId}
        className={`input input-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          error ? "input-error" : ""
        } ${className}`}
        required={required}
        {...props}
      />
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
