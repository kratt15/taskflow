"use client";

import { useMemo } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useTasks } from "@/hooks/useTasks";
import { TaskStatus, TaskLevel } from "@/enums/task";

export default function DashboardPage() {
  const { tasks, isLoading, error, refetch } = useTasks();

  // Calcul des statistiques
  const stats = useMemo(() => {
    const total = tasks.length;
    const notStarted = tasks.filter(
      (t) => t.status === TaskStatus.NOT_STARTED
    ).length;
    const inProgress = tasks.filter(
      (t) => t.status === TaskStatus.IN_PROGRESS
    ).length;
    const completed = tasks.filter(
      (t) => t.status === TaskStatus.COMPLETED
    ).length;
    const highPriority = tasks.filter((t) => t.level === TaskLevel.HIGH).length;

    return { total, notStarted, inProgress, completed, highPriority };
  }, [tasks]);

  // Tâches récentes (5 dernières)
  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [tasks]);

  // Tâches prioritaires
  const priorityTasks = useMemo(() => {
    return tasks
      .filter(
        (t) => t.level === TaskLevel.HIGH && t.status !== TaskStatus.COMPLETED
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm opacity-70 mt-1">
              Vue d&apos;ensemble de vos tâches
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

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-linear-to-br from-primary to-primary-focus text-primary-content">
            <div className="stat">
              <div className="stat-title text-primary-content opacity-80">
                Total des tâches
              </div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-desc text-primary-content opacity-70">
                Toutes les tâches
              </div>
            </div>
          </Card>

          <Card className="bg-linear-to-br from-warning to-warning-focus text-warning-content">
            <div className="stat">
              <div className="stat-title text-warning-content opacity-80">
                En cours
              </div>
              <div className="stat-value">{stats.inProgress}</div>
              <div className="stat-desc text-warning-content opacity-70">
                Tâches actives
              </div>
            </div>
          </Card>

          <Card className="bg-linear-to-br from-success to-success-focus text-success-content">
            <div className="stat">
              <div className="stat-title text-success-content opacity-80">
                Complétées
              </div>
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-desc text-success-content opacity-70">
                Tâches terminées
              </div>
            </div>
          </Card>

          <Card className="bg-linear-to-br from-error to-error-focus text-error-content">
            <div className="stat">
              <div className="stat-title text-error-content opacity-80">
                Priorité haute
              </div>
              <div className="stat-value">{stats.highPriority}</div>
              <div className="stat-desc text-error-content opacity-70">
                Tâches urgentes
              </div>
            </div>
          </Card>
        </div>

        {/* Contenu principal */}
        {isLoading ? (
          <Loading size="lg" message="Chargement des tâches..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tâches récentes */}
            <Card
              title="Tâches récentes"
              actions={
                <Link href="/tasks" className="btn btn-sm btn-ghost">
                  Voir tout
                </Link>
              }
            >
              {recentTasks.length === 0 ? (
                <div className="text-center py-8 opacity-70">
                  <p>Aucune tâche pour le moment</p>
                  <Link
                    href="/tasks/new"
                    className="btn btn-sm btn-primary mt-4"
                  >
                    Créer votre première tâche
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/tasks/${task.id}`}
                      className="block p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <div className="flex gap-2">
                          <Badge type="status" value={task.status} />
                          <Badge type="level" value={task.level} />
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-sm opacity-70 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Tâches prioritaires */}
            <Card
              title="Tâches prioritaires"
              actions={
                <Link href="/tasks?level=HIGH" className="btn btn-sm btn-ghost">
                  Voir tout
                </Link>
              }
            >
              {priorityTasks.length === 0 ? (
                <div className="text-center py-8 opacity-70">
                  <p>Aucune tâche prioritaire en cours</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {priorityTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/tasks/${task.id}`}
                      className="block p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <Badge type="status" value={task.status} />
                      </div>
                      {task.description && (
                        <p className="text-sm opacity-70 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Progression */}
        {!isLoading && !error && stats.total > 0 && (
          <Card title="Progression globale">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tâches complétées</span>
                  <span className="font-semibold">
                    {stats.completed} / {stats.total} (
                    {Math.round((stats.completed / stats.total) * 100)}%)
                  </span>
                </div>
                <progress
                  className="progress progress-success w-full"
                  value={stats.completed}
                  max={stats.total}
                ></progress>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
