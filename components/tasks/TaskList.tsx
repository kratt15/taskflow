import Link from "next/link";
import { TaskResponseDto } from "@/types/task";
import { TaskStatus, TaskLevel } from "@/enums/task";

interface TaskListProps {
  tasks: TaskResponseDto[];
  emptyMessage?: string;
}

export default function TaskList({
  tasks,
  emptyMessage = "Aucune tâche disponible",
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 opacity-70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.NOT_STARTED:
        return <span className="badge badge-ghost">Non démarré</span>;
      case TaskStatus.IN_PROGRESS:
        return <span className="badge badge-warning">En cours</span>;
      case TaskStatus.COMPLETED:
        return <span className="badge badge-success">Complété</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getLevelBadge = (level: TaskLevel) => {
    switch (level) {
      case TaskLevel.LOW:
        return <span className="badge badge-info badge-sm">Faible</span>;
      case TaskLevel.MEDIUM:
        return <span className="badge badge-warning badge-sm">Moyen</span>;
      case TaskLevel.HIGH:
        return <span className="badge badge-error badge-sm">Élevé</span>;
      default:
        return <span className="badge badge-sm">{level}</span>;
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Link
          key={task.id}
          href={`/tasks/${task.id}`}
          className="block p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate mb-1">{task.title}</h4>
              {task.description && (
                <p className="text-sm opacity-70 line-clamp-2 mb-2">
                  {task.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 items-center">
                {getStatusBadge(task.status)}
                {getLevelBadge(task.level)}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-50 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
