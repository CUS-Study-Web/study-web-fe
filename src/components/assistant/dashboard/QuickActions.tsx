interface QuickActionsProps {
  navigate: (path: string) => void;
}

const QuickActions = ({ navigate }: QuickActionsProps) => {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-default)] rounded-[var(--radius-lg)] p-5.5 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body)] text-[var(--text-primary)] mb-4.5">
        Thao tác nhanh
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* Primary Action */}
        <div
          role="button"
          onClick={() => navigate('/assistant/exams')}
          className="flex items-center gap-3 py-4 px-4.5 rounded-[var(--radius-md)] cursor-pointer text-left transition-all duration-140 hover:-translate-y-0.5 bg-[var(--brand-500)] text-[var(--text-inverse)] border-none shadow-[0_2px_8px_rgba(44,90,49,0.25)]"
        >
          <span className="text-[22px]">📤</span>
          <span className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)]">
            Tải lên tài liệu
          </span>
        </div>

        {/* Secondary Action 1 */}
        <div
          role="button"
          onClick={() => navigate('/assistant/courses')}
          className="flex items-center gap-3 py-4 px-4.5 rounded-[var(--radius-md)] cursor-pointer text-left transition-all duration-140 hover:-translate-y-0.5 bg-[var(--brand-soft-200)] text-[var(--brand-500)] border-[1.5px] border-solid border-[var(--brand-soft-500)]"
        >
          <span className="text-[22px]">📎</span>
          <span className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)]">
            Quản lý nội dung khóa học
          </span>
        </div>

        {/* Secondary Action 2 */}
        <div
          role="button"
          onClick={() => navigate('/assistant/students')}
          className="flex items-center gap-3 py-4 px-4.5 rounded-[var(--radius-md)] cursor-pointer text-left transition-all duration-140 hover:-translate-y-0.5 bg-[var(--brand-soft-200)] text-[var(--brand-500)] border-[1.5px] border-solid border-[var(--brand-soft-500)]"
        >
          <span className="text-[22px]">👥</span>
          <span className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)]">
            Danh sách học viên
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
