import { api } from "@/lib/api/config";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilterDto,
  CategoryResponseDto,
} from "@/types/category";

/**
 * Récupère toutes les catégories avec filtrage optionnel
 */
export async function getAllCategories(
  filter?: CategoryFilterDto
): Promise<CategoryResponseDto[]> {
  const response = await api.get<CategoryResponseDto[]>("/categories", {
    params: filter,
  });
  return response.data;
}

/**
 * Récupère une catégorie par son ID
 */
export async function getCategoryById(id: string): Promise<CategoryResponseDto> {
  const response = await api.get<CategoryResponseDto>(`/categories/${id}`);
  return response.data;
}

/**
 * Crée une nouvelle catégorie
 */
export async function createCategory(
  data: CreateCategoryDto
): Promise<CategoryResponseDto> {
  const response = await api.post<CategoryResponseDto>("/categories", data);
  return response.data;
}

/**
 * Met à jour une catégorie existante
 */
export async function updateCategory(
  id: string,
  data: UpdateCategoryDto
): Promise<CategoryResponseDto> {
  const response = await api.patch<CategoryResponseDto>(`/categories/${id}`, data);
  return response.data;
}

/**
 * Supprime une catégorie
 */
export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
