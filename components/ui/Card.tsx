import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  actions?: ReactNode;
}

export default function Card({
  children,
  className = "",
  title,
  actions,
}: CardProps) {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <div className="card-body">
        {(title || actions) && (
          <div className="flex justify-between items-center mb-4">
            {title && <h2 className="card-title">{title}</h2>}
            {actions && <div className="card-actions">{actions}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
