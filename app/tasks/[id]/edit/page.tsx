"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskForm from "@/components/tasks/TaskForm";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useTask } from "@/hooks/useTasks";
import { useToast } from "@/hooks/useToast";
import { updateTask } from "@/services/task";
import { UpdateTaskDto } from "@/types/task";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const taskId = params.id as string;
  const { task, isLoading, error } = useTask(taskId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: UpdateTaskDto) => {
    setIsSubmitting(true);
    try {
      await updateTask(taskId, data);
      toast.success("Tâche modifiée avec succès !");
      router.push(`/tasks/${taskId}`);
    } catch (error) {
      toast.error("Erreur lors de la modification de la tâche");
      setIsSubmitting(false);
      throw error;
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
      <div className="max-w-3xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Link href={`/tasks/${taskId}`} className="btn btn-ghost btn-circle">
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
          <div>
            <h1 className="text-3xl font-bold">Modifier la tâche</h1>
            <p className="text-sm opacity-70 mt-1">{task.title}</p>
          </div>
        </div>

        {/* Formulaire */}
        <Card>
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            submitLabel="Enregistrer les modifications"
            isLoading={isSubmitting}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
