"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useTask } from "@/hooks/useTasks";
import { useToast } from "@/hooks/useToast";
import { deleteTask } from "@/services/task";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const taskId = params.id as string;
  const { task, isLoading, error } = useTask(taskId);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      return;
    }

    try {
      await deleteTask(taskId);
      toast.success("Tâche supprimée avec succès !");
      router.push("/tasks");
    } catch {
      toast.error("Erreur lors de la suppression de la tâche");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loading size="lg" message="Chargement de la tâche..." />
      </DashboardLayout>
    );
  }

  if (error || !task) {
    return (
      <DashboardLayout>
        <ErrorMessage
          message={error || "Tâche introuvable"}
          onRetry={() => router.push("/tasks")}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Link href="/tasks" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{task.title}</h1>
            <p className="text-sm opacity-70 mt-1">
              Créée le {new Date(task.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/tasks/${taskId}/edit`}
              className="btn btn-primary btn-outline"
            >
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Modifier
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Supprimer
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Détails principaux */}
          <div className="lg:col-span-2">
            <Card title="Description">
              {task.description ? (
                <p className="whitespace-pre-wrap">{task.description}</p>
              ) : (
                <p className="opacity-50 italic">Aucune description</p>
              )}
            </Card>
          </div>

          {/* Informations */}
          <div className="space-y-4">
            <Card title="Informations">
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-70 mb-1">Statut</p>
                  <Badge type="status" value={task.status} />
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Priorité</p>
                  <Badge type="level" value={task.level} />
                </div>
                <div className="divider my-2"></div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Créée le</p>
                  <p className="font-semibold">
                    {new Date(task.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">Modifiée le</p>
                  <p className="font-semibold">
                    {new Date(task.updatedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
