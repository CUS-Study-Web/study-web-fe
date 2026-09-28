import { useState } from "react";
import PendingSolutionPopup from "../common/PendingSolutionPopup";
import { Lock, Check, Clock } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  duration: string;
  isLocked: boolean;
  url?: string;
  isClicked?: boolean;
};

type LessonItemProps = {
  lesson: Lesson;
  isLast: boolean;
  onWatch?: () => void;
};

export default function LessonItem({ lesson, isLast, onWatch }: LessonItemProps) {
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
            <Lock className="w-3.5 h-3.5 text-[#A0AAA2]" />
          ) : (
            <span className="font-[family:var(--font-heading)] font-bold text-xs text-[var(--brand-base-500)]">
              {String(lesson.id).padStart(2, "0")}
            </span>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div
            className={`font-[family:var(--font-heading)] text-sm leading-snug flex items-center gap-2 ${
              lesson.isLocked ? "font-medium text-[#A0AAA2]" : "font-bold text-[#1B1F1C]"
            }`}
          >
            <span>{lesson.title}</span>
            {lesson.isClicked && (
              <Check className="w-3.5 h-3.5 text-[#1D9A44] stroke-[2.5]" />
            )}
          </div>
          <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>
      {/* Action Right */}
      <div className="mt-2 md:mt-0 self-start md:self-auto shrink-0">
        {lesson.isLocked ? (
          <span className="font-[family:var(--font-heading)] font-semibold text-xs text-[#A0AAA2] whitespace-nowrap inline-flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>VIP</span>
          </span>
        ) : (
          <button 
            onClick={() => {
              onWatch?.();
              if (lesson.url) {
                window.open(lesson.url, '_blank');
              } else {
                setShowPendingPopup(true);
              }
            }}
            className={`transition-all cursor-pointer whitespace-nowrap font-[family:var(--font-heading)] !font-semibold text-[11px] px-4 py-1.5 rounded-full border-none ${
              lesson.isClicked 
                ? "bg-[var(--surface-500)] text-[var(--text-secondary-600)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)]" 
                : "bg-[var(--brand-base-500)] !text-white hover:bg-[#1B1F1C]"
            }`}
          >
            {lesson.isClicked ? 'Xem lại' : 'Xem bài'}
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
