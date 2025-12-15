import { useState, useEffect, useCallback } from "react";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/category";
import {
  CategoryResponseDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFilterDto,
} from "@/types/category";
import { formatApiError } from "@/lib/utils/errorMessages";

export function useCategories(filter?: CategoryFilterDto) {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllCategories(filter);
      setCategories(data);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (data: CreateCategoryDto) => {
    try {
      const newCategory = await createCategory(data);
      setCategories((prev) => [newCategory, ...prev]);
      return newCategory;
    } catch (err) {
      throw err;
    }
  };

  const modifyCategory = async (id: string, data: UpdateCategoryDto) => {
    try {
      const updatedCategory = await updateCategory(id, data);
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id ? updatedCategory : category
        )
      );
      return updatedCategory;
    } catch (err) {
      throw err;
    }
  };

  const removeCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const refetch = () => {
    fetchCategories();
  };

  return {
    categories,
    isLoading,
    error,
    addCategory,
    modifyCategory,
    removeCategory,
    refetch,
  };
}

export function useCategory(id: string) {
  const [category, setCategory] = useState<CategoryResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (err) {
        setError(formatApiError(err));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  return { category, isLoading, error };
}
