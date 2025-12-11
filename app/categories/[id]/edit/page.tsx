"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryForm from "@/components/categories/CategoryForm";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useCategory } from "@/hooks/useCategories";
import { useToast } from "@/hooks/useToast";
import { updateCategory } from "@/services/category";
import { UpdateCategoryDto } from "@/types/category";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const categoryId = params.id as string;
  const { category, isLoading, error } = useCategory(categoryId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: UpdateCategoryDto) => {
    setIsSubmitting(true);
    try {
      await updateCategory(categoryId, data);
      toast.success("Catégorie modifiée avec succès !");
      router.push(`/categories/${categoryId}`);
    } catch (error) {
      toast.error("Erreur lors de la modification de la catégorie");
      setIsSubmitting(false);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loading size="lg" message="Chargement de la catégorie..." />
      </DashboardLayout>
    );
  }

  if (error || !category) {
    return (
      <DashboardLayout>
        <ErrorMessage
          message={error || "Catégorie introuvable"}
          onRetry={() => router.push("/categories")}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Link
            href={`/categories/${categoryId}`}
            className="btn btn-ghost btn-circle"
          >
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
            <h1 className="text-3xl font-bold">Modifier la catégorie</h1>
            <p className="text-sm opacity-70 mt-1">{category.name}</p>
          </div>
        </div>

        {/* Formulaire */}
        <Card>
          <CategoryForm
            initialData={category}
            onSubmit={handleSubmit}
            submitLabel="Enregistrer les modifications"
            isLoading={isSubmitting}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
