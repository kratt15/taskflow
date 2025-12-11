"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFilters from "@/components/tasks/TaskFilters";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "@/hooks/useToast";
import { TaskStatus, TaskLevel } from "@/enums/task";

export default function TasksPage() {
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    level?: TaskLevel;
    search?: string;
  }>({});

  const { tasks, isLoading, error, removeTask, refetch } = useTasks();
  const toast = useToast();

  // Filtrage côté client
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.level && task.level !== filters.level) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [tasks, filters]);

  const handleDelete = async (id: string) => {
    try {
      await removeTask(id);
      toast.success("Tâche supprimée avec succès !");
    } catch {
      toast.error("Erreur lors de la suppression de la tâche");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mes Tâches</h1>
            <p className="text-sm opacity-70 mt-1">
              Gérez toutes vos tâches en un seul endroit
            </p>
          </div>
          <Link href="/tasks/new" className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nouvelle tâche
          </Link>
        </div>

        {/* Filtres */}
        <TaskFilters onFilterChange={setFilters} currentFilters={filters} />

        {/* Contenu */}
        {isLoading ? (
          <Loading size="lg" message="Chargement des tâches..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto opacity-30 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Aucune tâche trouvée</h3>
            <p className="opacity-70 mb-6">
              {tasks.length === 0
                ? "Commencez par créer votre première tâche"
                : "Aucune tâche ne correspond à vos filtres"}
            </p>
            {tasks.length === 0 && (
              <Link href="/tasks/new" className="btn btn-primary">
                Créer une tâche
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm opacity-70">
                {filteredTasks.length} tâche
                {filteredTasks.length > 1 ? "s" : ""} trouvée
                {filteredTasks.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
