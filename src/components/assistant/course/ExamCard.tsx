import type { CourseExam } from '../../../types/assistant/models';

interface ExamCardProps {
  exam: CourseExam;
  onEdit?: (exam: CourseExam) => void;
}

export default function ExamCard({ exam, onEdit }: ExamCardProps) {
  const isPublished = exam.status === 'published';

  return (
    <div
      onClick={() => onEdit?.(exam)}
      className={`rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-clay-sm)] p-5 ${
        onEdit ? 'cursor-pointer hover:border-[var(--brand-300)] hover:shadow-md transition-all duration-150' : ''
      }`}
    >
      {/* Title */}
      <div className="font-[family-name:var(--font-heading)] font-bold text-[15px] text-[var(--text-primary)] mb-4">
        {exam.title}
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="px-4 py-3 rounded-[8px] bg-[var(--surface-muted)]">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Khóa học
          </div>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)]">
            {exam.courseKey}
          </div>
        </div>
        <div className="px-4 py-3 rounded-[8px] bg-[var(--surface-muted)]">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Số câu
          </div>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)]">
            {exam.questions} câu
          </div>
        </div>
        <div className="px-4 py-3 rounded-[8px] bg-[var(--surface-muted)]">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Thời gian
          </div>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)]">
            {exam.duration}
          </div>
        </div>
        <div className="px-4 py-3 rounded-[8px] bg-[var(--surface-muted)]">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Ngày đăng
          </div>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)]">
            {exam.date}
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-[family-name:var(--font-heading)] font-semibold text-[12px] ${
            isPublished
              ? 'bg-[var(--success-100)] text-[var(--success-700)]'
              : 'bg-[var(--warning-100)] text-[var(--warning-700)]'
          }`}
        >
          {isPublished ? 'Đã xuất bản' : 'Nháp'}
        </span>
      </div>
    </div>
  );
}
