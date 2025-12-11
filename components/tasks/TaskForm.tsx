"use client";

import { useState, FormEvent } from "react";
import { TaskStatus, TaskLevel } from "@/enums/task";
import { CreateTaskDto, UpdateTaskDto } from "@/types/task";

interface TaskFormProps {
  initialData?: {
    title: string;
    description: string | null;
    status: TaskStatus;
    level: TaskLevel;
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
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Titre */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">
            Titre <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="text"
          placeholder="Ex: Finaliser le rapport mensuel"
          className="input input-bordered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Description */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Détails de la tâche..."
          className="textarea textarea-bordered h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* Statut et Niveau */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Statut */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Statut</span>
          </label>
          <select
            className="select select-bordered"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            disabled={isLoading}
          >
            <option value={TaskStatus.NOT_STARTED}>Non démarré</option>
            <option value={TaskStatus.IN_PROGRESS}>En cours</option>
            <option value={TaskStatus.COMPLETED}>Complété</option>
          </select>
        </div>

        {/* Niveau */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Priorité</span>
          </label>
          <select
            className="select select-bordered"
            value={level}
            onChange={(e) => setLevel(e.target.value as TaskLevel)}
            disabled={isLoading}
          >
            <option value={TaskLevel.LOW}>Faible</option>
            <option value={TaskLevel.MEDIUM}>Moyen</option>
            <option value={TaskLevel.HIGH}>Élevé</option>
          </select>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-4 justify-end">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading && <span className="loading loading-spinner"></span>}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
