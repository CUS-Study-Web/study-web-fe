import type { CSSProperties } from "react";

type ProgressBarProps = {
  progress: number;
  heightClass?: string;
  bgClass?: string;
  fillStyle?: CSSProperties;
};

export default function ProgressBar({
  progress,
  heightClass = "h-1.5",
  bgClass = "bg-[var(--brand-base-900)]",
  fillStyle = { background: "linear-gradient(to right, var(--success-300), white)" },
}: ProgressBarProps) {
  return (
    <div className={`w-full rounded-full overflow-hidden ${heightClass} ${bgClass}`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${progress}%`, ...fillStyle }}
      />
    </div>
  );
}
