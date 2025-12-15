"use client";

import { useState, FormEvent } from "react";
import { TaskStatus, TaskLevel } from "@/enums/task";
import { CreateTaskDto, UpdateTaskDto } from "@/types/task";
import CategorySelector from "@/components/ui/CategorySelector";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

interface TaskFormProps {
  initialData?: {
    title: string;
    description: string | null;
    status: TaskStatus;
    level: TaskLevel;
    categoryId?: string;
  };
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function TaskForm({
  initialData,
  onSubmit,
  submitLabel = "Créer",
  isLoading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialData?.status || TaskStatus.NOT_STARTED
  );
  const [level, setLevel] = useState<TaskLevel>(
    initialData?.level || TaskLevel.MEDIUM
  );
  const [categoryId, setCategoryId] = useState<string | undefined>(
    initialData?.categoryId
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Le titre est requis");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        status,
        level,
        categoryId,
      });
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
        label="Titre"
        type="text"
        placeholder="Ex: Finaliser le rapport mensuel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={isLoading}
      />

      <Textarea
        label="Description"
        placeholder="Détails de la tâche..."
        className="h-32"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Statut"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          disabled={isLoading}
        >
          <option value={TaskStatus.NOT_STARTED}>Non démarré</option>
          <option value={TaskStatus.IN_PROGRESS}>En cours</option>
          <option value={TaskStatus.COMPLETED}>Complété</option>
        </Select>

        <Select
          label="Priorité"
          value={level}
          onChange={(e) => setLevel(e.target.value as TaskLevel)}
          disabled={isLoading}
        >
          <option value={TaskLevel.LOW}>Faible</option>
          <option value={TaskLevel.MEDIUM}>Moyen</option>
          <option value={TaskLevel.HIGH}>Élevé</option>
        </Select>
      </div>

      <CategorySelector
        value={categoryId}
        onChange={setCategoryId}
        disabled={isLoading}
        placeholder="Aucune catégorie"
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
