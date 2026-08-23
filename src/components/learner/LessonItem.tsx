import { useState } from "react";
import PendingSolutionPopup from "../common/PendingSolutionPopup";

type Lesson = {
  id: number;
  title: string;
  duration: string;
  isLocked: boolean;
  url?: string;
};

type LessonItemProps = {
  lesson: Lesson;
  isLast: boolean;
};

export default function LessonItem({ lesson, isLast }: LessonItemProps) {
  const [showPendingPopup, setShowPendingPopup] = useState(false);

  return (
    <div
      className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${
        !isLast ? "border-b border-[var(--surface-500)]" : "border-none"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Number badge */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            lesson.isLocked ? "bg-[var(--surface-500)]" : "bg-[var(--brand-soft-500)]"
          }`}
        >
          {lesson.isLocked ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="3" fill="#A0AAA2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#A0AAA2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <span className="font-[family:var(--font-heading)] font-bold text-xs text-[var(--brand-base-500)]">
              {String(lesson.id).padStart(2, "0")}
            </span>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div
            className={`font-[family:var(--font-heading)] text-sm leading-snug ${
              lesson.isLocked ? "font-medium text-[#A0AAA2]" : "font-bold text-[#1B1F1C]"
            }`}
          >
            {lesson.title}
          </div>
          <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1">
            ⏱ {lesson.duration}
          </div>
        </div>
      </div>
      {/* Action Right */}
      <div className="mt-2 md:mt-0 self-start md:self-auto shrink-0">
        {lesson.isLocked ? (
          <span className="font-[family:var(--font-heading)] font-semibold text-xs text-[#A0AAA2] whitespace-nowrap">
            🔒 VIP
          </span>
        ) : (
          <button 
            onClick={() => {
              if (lesson.url) {
                window.open(lesson.url, '_blank');
              } else {
                setShowPendingPopup(true);
              }
            }}
            className="transition-all cursor-pointer whitespace-nowrap hover:bg-[#1B1F1C] font-[family:var(--font-heading)] !font-semibold text-[11px] px-4 py-1.5 rounded-full border-none bg-[var(--brand-base-500)] !text-white"
          >
            Xem bài
          </button>
        )}
      </div>

      <PendingSolutionPopup 
        isOpen={showPendingPopup} 
        onClose={() => setShowPendingPopup(false)} 
        title="Link bài giảng đang cập nhật"
        message="Link bài giảng đang được cập nhập. Bạn vui lòng quay lại sau nhé!"
      />
    </div>
  );
}
