import React from 'react';
import { ASST_RECENT_ACTIVITIES } from '../../../types/assistant/mockData';

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-lg)] p-5.5 shadow-[0_1px_6px_rgba(0,0,0,0.06)] w-full">
      <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body)] text-[var(--text-primary)] mb-4">
        Hoạt động gần đây
      </div>
      <div className="flex flex-col gap-0">
        {ASST_RECENT_ACTIVITIES.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 py-3 ${
              index !== ASST_RECENT_ACTIVITIES.length - 1
                ? 'border-b border-[var(--border-subtle)]'
                : ''
            }`}
          >
            <div className="w-8.5 h-8.5 rounded-[var(--radius-sm)] bg-[var(--surface-muted)] flex items-center justify-center shrink-0 text-base">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] leading-[1.5]">
                {activity.text}
              </div>
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-caption)] text-[var(--text-secondary)] mt-[3px]">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
