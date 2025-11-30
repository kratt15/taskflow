import { api } from "@/lib/api/config";
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilterDto,
  TaskResponseDto,
} from "@/types/task";

/**
 * Récupère toutes les tâches avec filtrage optionnel
 */
export async function getAllTasks(
  filter?: TaskFilterDto
): Promise<TaskResponseDto[]> {
  const response = await api.get<TaskResponseDto[]>("/tasks", {
    params: filter, // Axios gère automatiquement la sérialisation des query params
  });
  return response.data;
}

/**
 * Récupère une tâche par son ID
 */
export async function getTaskById(id: string): Promise<TaskResponseDto> {
  const response = await api.get<TaskResponseDto>(`/tasks/${id}`);
  return response.data;
}

/**
 * Crée une nouvelle tâche
 */
export async function createTask(
  data: CreateTaskDto
): Promise<TaskResponseDto> {
  const response = await api.post<TaskResponseDto>("/tasks", data);
  return response.data;
}

/**
 * Met à jour une tâche existante
 */
export async function updateTask(
  id: string,
  data: UpdateTaskDto
): Promise<TaskResponseDto> {
  const response = await api.patch<TaskResponseDto>(`/tasks/${id}`, data);
  return response.data;
}

/**
 * Supprime une tâche
 */
export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
