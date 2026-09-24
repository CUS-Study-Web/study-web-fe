interface ActivityItem {
  id: string;
  type: string;
  text: string;
  timestamp: string;
}

interface AssistantRecentActivityProps {
  activities?: ActivityItem[];
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'student':
      return '🎓';
    case 'course':
      return '📚';
    case 'material':
      return '📄';
    default:
      return '🔔';
  }
};

const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Vừa xong';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  return date.toLocaleDateString('vi-VN');
};

const AssistantRecentActivity = ({ activities = [] }: AssistantRecentActivityProps) => {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-lg)] p-5.5 shadow-[0_1px_6px_rgba(0,0,0,0.06)] w-full">
      <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body)] text-[var(--text-primary)] mb-4">
        Hoạt động gần đây
      </div>
      <div className="flex flex-col gap-0">
        {activities.length === 0 && (
          <div className="text-center text-[var(--text-secondary)] py-4">
            Không có hoạt động nào gần đây.
          </div>
        )}
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 py-3 ${index !== activities.length - 1
                ? 'border-b border-[var(--border-subtle)]'
                : ''
              }`}
          >
            <div className="w-8.5 h-8.5 rounded-[var(--radius-sm)] bg-[var(--surface-muted)] flex items-center justify-center shrink-0 text-base">
              {getIconForType(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] leading-[1.5]">
                {activity.text}
              </div>
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-caption)] text-[var(--text-secondary)] mt-[3px]">
                {formatTimeAgo(activity.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistantRecentActivity;
