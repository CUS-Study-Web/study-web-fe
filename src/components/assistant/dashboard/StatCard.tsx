import React from 'react';

export interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  icon: string;
  color: string;
  background: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  icon,
  color,
  background,
}) => {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-lg)] py-5.5 px-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3.5">
        <div
          className="w-10.5 h-10.5 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: background }}
        >
          {icon}
        </div>
      </div>
      <div>
        <div className="font-[family-name:var(--font-heading)] font-extrabold text-[length:var(--text-h3)] text-[var(--text-primary)] leading-[1] mb-3.5">
          {value}
        </div>
        <div className="font-[family-name:var(--font-body)] text-[length:var(--text-caption)] text-[var(--text-secondary)] mt-1 mb-0.5">
          {label}
        </div>
        <div
          className="font-[family-name:var(--font-heading)] font-semibold text-[length:var(--text-caption)]"
          style={{ color: color }}
        >
          {delta}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
