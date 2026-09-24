import React from 'react';
import { Users, Paperclip, FileText, Activity } from 'lucide-react';

export interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  icon: string | React.ReactNode;
  color: string;
  background: string;
}

const renderStatIcon = (icon: string | React.ReactNode, color: string) => {
  if (typeof icon !== 'string') return icon;
  if (icon === '👥' || icon === 'users') return <Users size={20} style={{ color }} />;
  if (icon === '📎' || icon === 'paperclip') return <Paperclip size={20} style={{ color }} />;
  if (icon === '📝' || icon === 'file-text') return <FileText size={20} style={{ color }} />;
  return <Activity size={20} style={{ color }} />;
};

const AssistantStatCard = ({
  label,
  value,
  delta,
  icon,
  color,
  background,
}: StatCardProps) => {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-lg)] py-5.5 px-5 shadow-[0_1px_6px_rgba(0,0,0,0.06)] flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3.5">
        <div
          className="w-10.5 h-10.5 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: background }}
        >
          {renderStatIcon(icon, color)}
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

export default AssistantStatCard;
