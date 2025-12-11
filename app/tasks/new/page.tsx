"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskForm from "@/components/tasks/TaskForm";
import Card from "@/components/ui/Card";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "@/hooks/useToast";
import { CreateTaskDto, UpdateTaskDto } from "@/types/task";

export default function NewTaskPage() {
  const router = useRouter();
  const { addTask } = useTasks();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateTaskDto | UpdateTaskDto) => {
    setIsLoading(true);
    try {
      // In the new task page, all fields are required, so we can safely cast to CreateTaskDto
      await addTask(data as CreateTaskDto);
      toast.success("Tâche créée avec succès !");
      router.push("/tasks");
    } catch (error) {
      toast.error("Erreur lors de la création de la tâche");
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
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
          <div>
            <h1 className="text-3xl font-bold">Nouvelle tâche</h1>
            <p className="text-sm opacity-70 mt-1">
              Créez une nouvelle tâche pour votre projet
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <Card>
          <TaskForm
            onSubmit={handleSubmit}
            submitLabel="Créer la tâche"
            isLoading={isLoading}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
