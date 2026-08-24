import type { CourseSummaryResponse } from '../../../types/api/course.api';

interface AssistantCourseCardProps {
  course: CourseSummaryResponse;
  onViewDetail: (id: string) => void;
}

export default function AssistantCourseCard({ course, onViewDetail }: AssistantCourseCardProps) {
  return (
    <div
      onClick={() => onViewDetail(course.id)}
      className="rounded-[16px] overflow-hidden border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-clay-sm)] cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Dark header */}
      <div
        className="px-5 py-4 flex items-center gap-3 relative overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(to right, #2B5830, #1F4224)' }}
      >
        <div className="absolute top-2 right-2">
           <span className={`px-2 py-0.5 rounded-[var(--radius-sm)] text-[10px] font-bold ${course.status === 'PUBLISH' ? 'bg-[#E3F5E7] text-[#1D9A44]' : 'bg-[var(--surface-500)] text-[var(--text-secondary-400)]'}`}>
             {course.status === 'PUBLISH' ? 'Công khai' : 'Bản nháp'}
           </span>
        </div>
        <div className="relative z-10 w-8 h-8 rounded-[8px] bg-white/15 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="font-[family-name:var(--font-heading)] font-bold text-[17px] text-white leading-tight">
            {course.title}
          </div>
          <div className="font-[family-name:var(--font-body)] text-[12px] text-white/70 mt-0.5">
            {course.badgeTitle}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-3 px-5 py-4">
        <div className="flex-1 py-3 text-center bg-[#F4F6F8] rounded-[12px]">
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)]">
            {course.subjectCount || 0}
          </div>
          <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)] mt-0.5">
            Môn học
          </div>
        </div>
        <div className="flex-1 py-3 text-center bg-[#F4F6F8] rounded-[12px]">
          <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)]">
            {course.examCount || 0}
          </div>
          <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)] mt-0.5">
            Đề thi
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="px-5 pb-4 flex justify-end">
        <div className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-600)] transition-colors select-none">
          Xem chi tiết →
        </div>
      </div>
    </div>
  );
}
