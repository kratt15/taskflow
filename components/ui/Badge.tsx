import { TaskStatus, TaskLevel } from "@/enums/task";

interface BadgeProps {
  type: "status" | "level";
  value: TaskStatus | TaskLevel;
}

const statusConfig = {
  [TaskStatus.NOT_STARTED]: {
    label: "Non démarré",
    className: "badge-ghost",
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "En cours",
    className: "badge-warning",
  },
  [TaskStatus.COMPLETED]: {
    label: "Complété",
    className: "badge-success",
  },
};

const levelConfig = {
  [TaskLevel.LOW]: {
    label: "Faible",
    className: "badge-info",
  },
  [TaskLevel.MEDIUM]: {
    label: "Moyen",
    className: "badge-warning",
  },
  [TaskLevel.HIGH]: {
    label: "Élevé",
    className: "badge-error",
  },
};

export default function Badge({ type, value }: BadgeProps) {
  const config =
    type === "status"
      ? statusConfig[value as TaskStatus]
      : levelConfig[value as TaskLevel];

  return <span className={`badge ${config.className}`}>{config.label}</span>;
}
