type Lesson = {
  id: number;
  title: string;
  duration: string;
  isLocked: boolean;
};

type LessonItemProps = {
  lesson: Lesson;
  isLast: boolean;
};

export default function LessonItem({ lesson, isLast }: LessonItemProps) {
  return (
    <div
      className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${
        !isLast ? "border-b border-[#F4F7F4]" : "border-none"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Number badge */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            lesson.isLocked ? "bg-[#F4F7F4]" : "bg-[#DCE9DE]"
          }`}
        >
          {lesson.isLocked ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="3" fill="#A0AAA2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#A0AAA2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <span className="font-[family:var(--font-heading)] font-bold text-xs text-[#2C5A31]">
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
          <button className="transition-colors cursor-pointer whitespace-nowrap hover:bg-[#1B1F1C] font-[family:var(--font-heading)] font-bold text-xs px-4.5 py-2 rounded-full border-none bg-[#2C5A31] !text-white">
            Xem bài
          </button>
        )}
      </div>
    </div>
  );
}
