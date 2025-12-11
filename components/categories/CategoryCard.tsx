import Link from "next/link";
import { CategoryResponseDto } from "@/types/category";

interface CategoryCardProps {
  category: CategoryResponseDto;
  taskCount?: number;
  onDelete?: (id: string) => void;
}

export default function CategoryCard({
  category,
  taskCount = 0,
  onDelete,
}: CategoryCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      onDelete &&
      confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      onDelete(category.id);
    }
  };

  return (
    <Link href={`/categories/${category.id}`}>
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
        <div className="card-body">
          <div className="flex justify-between items-start mb-2">
            <h3 className="card-title text-lg">{category.name}</h3>
            <div className="badge badge-primary">
              {taskCount} tâche{taskCount !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="card-actions justify-between items-center mt-4">
            <span className="text-xs opacity-50">
              Créée le{" "}
              {new Date(category.createdAt).toLocaleDateString("fr-FR")}
            </span>

            {onDelete && (
              <button
                onClick={handleDelete}
                className="btn btn-sm btn-ghost btn-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
