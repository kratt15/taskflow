"use client";

import { useCategories } from "@/hooks/useCategories";
import Select from "@/components/ui/Select";

interface CategorySelectorProps {
  value?: string;
  onChange: (categoryId: string | undefined) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

export default function CategorySelector({
  value,
  onChange,
  required = false,
  disabled = false,
  label = "Catégorie",
  placeholder = "Sélectionner une catégorie",
}: CategorySelectorProps) {
  const { categories, isLoading, error } = useCategories();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue === "" ? undefined : selectedValue);
  };

  return (
    <div>
      {error ? (
        <div className="alert alert-error alert-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs">{error}</span>
        </div>
      ) : (
        <Select
          label={label}
          value={value || ""}
          onChange={handleChange}
          disabled={disabled || isLoading}
          required={required}
          helperText={
            !required
              ? "Optionnel - Laissez vide pour aucune catégorie"
              : undefined
          }
        >
          <option value="">{isLoading ? "Chargement..." : placeholder}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
}
