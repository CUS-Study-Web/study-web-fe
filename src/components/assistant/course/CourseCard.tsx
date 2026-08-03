import type { Course } from '../../../types/assistant/models';

interface CourseCardProps {
  course: Course;
  onViewDetail: (key: string) => void;
}

export default function CourseCard({ course, onViewDetail }: CourseCardProps) {
  return (
    <div className="rounded-[16px] overflow-hidden border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-clay-sm)]">
      {/* Dark header */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ backgroundColor: course.accentColor }}
      >
        <div className="w-8 h-8 rounded-[8px] bg-white/15 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[17px] text-white leading-tight">
            {course.name}
          </div>
          <div className="font-[family-name:var(--font-body)] text-[12px] text-white/70 mt-0.5">
            {course.tag}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex border-t border-[var(--border-subtle)]">
        <div className="flex-1 px-5 py-4 text-center border-r border-[var(--border-subtle)]">
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)]">
            {course.subjectCount}
          </div>
          <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)] mt-0.5">
            Môn học
          </div>
        </div>
        <div className="flex-1 px-5 py-4 text-center">
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)]">
            {course.examCount}
          </div>
          <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)] mt-0.5">
            Đề thi
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="px-5 py-3 border-t border-[var(--border-subtle)] flex justify-end">
        <div
          onClick={() => onViewDetail(course.key)}
          className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-600)] cursor-pointer hover:text-[var(--brand-700)] transition-colors select-none"
        >
          Xem chi tiết →
        </div>
      </div>
    </div>
  );
}
