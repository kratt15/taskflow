"use client";

import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryCard from "@/components/categories/CategoryCard";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useCategories } from "@/hooks/useCategories";
import { useTasks } from "@/hooks/useTasks";

export default function CategoriesPage() {
  const { categories, isLoading, error, removeCategory, refetch } =
    useCategories();
  const { tasks } = useTasks();

  // Calculer le nombre de tâches par catégorie
  const getTaskCount = (categoryId: string) => {
    return tasks.filter((task) => task.categoryId === categoryId).length;
  };

  const handleDelete = async (id: string) => {
    try {
      await removeCategory(id);
    } catch (err) {
      alert("Erreur lors de la suppression de la catégorie");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Catégories</h1>
            <p className="text-sm opacity-70 mt-1">
              Organisez vos tâches par catégories
            </p>
          </div>
          <Link href="/categories/new" className="btn btn-primary">
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
            Nouvelle catégorie
          </Link>
        </div>

        {/* Contenu */}
        {isLoading ? (
          <Loading size="lg" message="Chargement des catégories..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : categories.length === 0 ? (
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Aucune catégorie</h3>
            <p className="opacity-70 mb-6">
              Commencez par créer votre première catégorie pour organiser vos
              tâches
            </p>
            <Link href="/categories/new" className="btn btn-primary">
              Créer une catégorie
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm opacity-70">
                {categories.length} catégorie{categories.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  taskCount={getTaskCount(category.id)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
