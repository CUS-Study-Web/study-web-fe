import React from "react";

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (val: string) => void;
};

export default function InfoRow({
  icon,
  label,
  value,
  isEditing,
  onChange,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-[8px] bg-[var(--surface-300)] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[9px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider">
          {label}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full text-body-sm font-bold text-[var(--text-primary-500)] mt-0.5 bg-transparent border-x-0 border-t-0 border-b border-[var(--brand-base-600)] px-0 py-0.5 focus:border-[var(--brand-base-400)] focus:ring-0 focus:outline-none shadow-none transition-colors"
          />
        ) : (
          <div className="w-full text-body-sm font-bold text-[var(--text-primary-500)] mt-0.5 border-b border-transparent px-0 py-0.5">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}
