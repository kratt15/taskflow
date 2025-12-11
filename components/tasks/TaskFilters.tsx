"use client";

import { TaskStatus, TaskLevel } from "@/enums/task";

interface TaskFiltersProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    level?: TaskLevel;
    search?: string;
  }) => void;
  currentFilters: {
    status?: TaskStatus;
    level?: TaskLevel;
    search?: string;
  };
}

export default function TaskFilters({
  onFilterChange,
  currentFilters,
}: TaskFiltersProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...currentFilters,
      status: value ? (value as TaskStatus) : undefined,
    });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...currentFilters,
      level: value ? (value as TaskLevel) : undefined,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...currentFilters,
      search: e.target.value || undefined,
    });
  };

  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="card bg-base-100 shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Recherche */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rechercher</span>
          </label>
          <input
            type="text"
            placeholder="Titre de la tâche..."
            className="input input-bordered"
            value={currentFilters.search || ""}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filtre par statut */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Statut</span>
          </label>
          <select
            className="select select-bordered"
            value={currentFilters.status || ""}
            onChange={handleStatusChange}
          >
            <option value="">Tous</option>
            <option value={TaskStatus.NOT_STARTED}>Non démarré</option>
            <option value={TaskStatus.IN_PROGRESS}>En cours</option>
            <option value={TaskStatus.COMPLETED}>Complété</option>
          </select>
        </div>

        {/* Filtre par niveau */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Priorité</span>
          </label>
          <select
            className="select select-bordered"
            value={currentFilters.level || ""}
            onChange={handleLevelChange}
          >
            <option value="">Toutes</option>
            <option value={TaskLevel.LOW}>Faible</option>
            <option value={TaskLevel.MEDIUM}>Moyen</option>
            <option value={TaskLevel.HIGH}>Élevé</option>
          </select>
        </div>

        {/* Bouton reset */}
        <div className="form-control">
          <label className="label">
            <span className="label-text opacity-0">Action</span>
          </label>
          <button onClick={handleReset} className="btn btn-outline">
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
