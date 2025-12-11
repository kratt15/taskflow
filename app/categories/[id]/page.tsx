"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useCategory } from "@/hooks/useCategories";
import { useToast } from "@/hooks/useToast";
import { deleteCategory } from "@/services/category";

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const categoryId = params.id as string;
  const { category, isLoading, error } = useCategory(categoryId);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      toast.success("Catégorie supprimée avec succès !");
      router.push("/categories");
    } catch (err) {
      toast.error("Erreur lors de la suppression de la catégorie " + err);
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
      <div className="max-w-4xl mx-auto space-y-6">
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-sm opacity-70 mt-1">
              Créée le{" "}
              {new Date(category.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/categories/${categoryId}/edit`}
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
          {/* Informations */}
          <Card title="Informations" className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-70 mb-1">Nom</p>
                <p className="font-semibold text-lg">{category.name}</p>
              </div>
              <div className="divider my-2"></div>
              <div>
                <p className="text-sm opacity-70 mb-1">Créée le</p>
                <p className="font-semibold">
                  {new Date(category.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Modifiée le</p>
                <p className="font-semibold">
                  {new Date(category.updatedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Card>

          {/* Tâches associées */}
          <Card title="Tâches associées" className="lg:col-span-2">
            <div className="text-center py-8 opacity-70">
              <p>Fonctionnalité à venir</p>
              <p className="text-sm mt-2">
                Les tâches associées à cette catégorie seront affichées ici
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
