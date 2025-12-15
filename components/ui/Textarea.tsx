import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
}

export default function Textarea({
  label,
  error,
  helperText,
  required,
  containerClassName = "",
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId =
    id || `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`form-control w-full ${containerClassName}`}>
      {label && (
        <label className="label" htmlFor={textareaId}>
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <textarea
        id={textareaId}
        className={`textarea textarea-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          error ? "textarea-error" : ""
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
