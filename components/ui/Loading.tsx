interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function Loading({ size = "md", message }: LoadingProps) {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <span className={`loading loading-spinner ${sizeClass}`}></span>
      {message && <p className="mt-4 text-sm opacity-70">{message}</p>}
    </div>
  );
}
