import Link from "next/link";
import { TaskResponseDto } from "@/types/task";
import Badge from "@/components/ui/Badge";

interface TaskCardProps {
  task: TaskResponseDto;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      onDelete &&
      confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")
    ) {
      onDelete(task.id);
    }
  };

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
        <div className="card-body">
          <div className="flex justify-between items-start mb-2">
            <h3 className="card-title text-lg">{task.title}</h3>
            <div className="flex gap-2">
              <Badge type="status" value={task.status} />
              <Badge type="level" value={task.level} />
            </div>
          </div>

          {task.description && (
            <p className="text-sm opacity-70 line-clamp-3 mb-4">
              {task.description}
            </p>
          )}

          <div className="card-actions justify-between items-center">
            <span className="text-xs opacity-50">
              {new Date(task.createdAt).toLocaleDateString("fr-FR")}
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
