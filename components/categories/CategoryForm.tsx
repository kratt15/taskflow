"use client";

import { useState, FormEvent } from "react";
import { CreateCategoryDto, UpdateCategoryDto } from "@/types/category";
import Input from "@/components/ui/Input";

interface CategoryFormProps<T extends CreateCategoryDto | UpdateCategoryDto> {
  initialData?: {
    name: string;
  };
  onSubmit: (data: T) => Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function CategoryForm<
  T extends CreateCategoryDto | UpdateCategoryDto
>({
  initialData,
  onSubmit,
  submitLabel = "Créer",
  isLoading = false,
}: CategoryFormProps<T>) {
  const [name, setName] = useState(initialData?.name || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Le nom est requis");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
      } as T);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
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
          <span>{error}</span>
        </div>
      )}

      <Input
        label="Nom de la catégorie"
        type="text"
        placeholder="Ex: Travail, Personnel, Urgent..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={isLoading}
        helperText="Choisissez un nom court et descriptif"
      />

      <div className="flex gap-4 justify-end pt-2">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading && <span className="loading loading-spinner"></span>}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
