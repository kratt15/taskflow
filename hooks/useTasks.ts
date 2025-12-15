import { useState, useEffect, useCallback } from "react";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/task";
import {
  TaskResponseDto,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilterDto,
} from "@/types/task";
import { formatApiError } from "@/lib/utils/errorMessages";

export function useTasks(filter?: TaskFilterDto) {
  const [tasks, setTasks] = useState<TaskResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllTasks(filter);
      setTasks(data);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data: CreateTaskDto | UpdateTaskDto) => {
    try {
      // For creating tasks, we need all required fields, so cast to CreateTaskDto
      const newTask = await createTask(data as CreateTaskDto);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw err;
    }
  };

  const modifyTask = async (id: string, data: UpdateTaskDto) => {
    try {
      const updatedTask = await updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      throw err;
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const refetch = () => {
    fetchTasks();
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    modifyTask,
    removeTask,
    refetch,
  };
}

export function useTask(id: string) {
  const [task, setTask] = useState<TaskResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        setError(formatApiError(err));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  return { task, isLoading, error };
}
