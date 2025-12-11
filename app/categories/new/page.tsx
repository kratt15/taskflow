"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryForm from "@/components/categories/CategoryForm";
import Card from "@/components/ui/Card";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/useToast";
import { CreateCategoryDto } from "@/types/category";

export default function NewCategoryPage() {
  const router = useRouter();
  const { addCategory } = useCategories();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateCategoryDto) => {
    setIsLoading(true);
    try {
      await addCategory(data);
      toast.success("Catégorie créée avec succès !");
      router.push("/categories");
    } catch (error) {
      toast.error("Erreur lors de la création de la catégorie");
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Link href="/categories" className="btn btn-ghost btn-circle">
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
            <h1 className="text-3xl font-bold">Nouvelle catégorie</h1>
            <p className="text-sm opacity-70 mt-1">
              Créez une catégorie pour organiser vos tâches
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <Card>
          <CategoryForm
            onSubmit={handleSubmit}
            submitLabel="Créer la catégorie"
            isLoading={isLoading}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
