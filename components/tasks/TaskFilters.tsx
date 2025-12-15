"use client";

import { TaskStatus, TaskLevel } from "@/enums/task";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

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
        <Input
          label="Rechercher"
          type="text"
          placeholder="Titre de la tâche..."
          value={currentFilters.search || ""}
          onChange={handleSearchChange}
        />

        <Select
          label="Statut"
          value={currentFilters.status || ""}
          onChange={handleStatusChange}
        >
          <option value="">Tous</option>
          <option value={TaskStatus.NOT_STARTED}>Non démarré</option>
          <option value={TaskStatus.IN_PROGRESS}>En cours</option>
          <option value={TaskStatus.COMPLETED}>Complété</option>
        </Select>

        <Select
          label="Priorité"
          value={currentFilters.level || ""}
          onChange={handleLevelChange}
        >
          <option value="">Toutes</option>
          <option value={TaskLevel.LOW}>Faible</option>
          <option value={TaskLevel.MEDIUM}>Moyen</option>
          <option value={TaskLevel.HIGH}>Élevé</option>
        </Select>

        <div className="flex items-end">
          <button onClick={handleReset} className="btn btn-outline w-full">
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
