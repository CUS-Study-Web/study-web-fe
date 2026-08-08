type Exercise = {
  id: number;
  title: string;
  size: string;
  date: string;
};

type ExerciseItemProps = {
  exercise: Exercise;
  isLast: boolean;
};

export default function ExerciseItem({ exercise, isLast }: ExerciseItemProps) {
  return (
    <div
      className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${
        !isLast ? "border-b border-[#F4F7F4]" : "border-none"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Icon Left */}
        <div className="w-[42px] h-[42px] rounded-xl bg-[#DCE9DE] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(44,90,49,0.8)" />
            <polyline points="14,2 14,8 20,8" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-[family:var(--font-heading)] font-bold text-sm text-[#1B1F1C] leading-snug">
            {exercise.title}
          </div>
          <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1">
            PDF · {exercise.size} · Đăng ngày {exercise.date}
          </div>
        </div>
      </div>
      {/* Action Right */}
      <div className="mt-3 md:mt-0 self-start md:self-auto shrink-0">
        <button className="transition-all cursor-pointer whitespace-nowrap hover:bg-[#2C5A31] hover:!text-white font-[family:var(--font-heading)] font-bold text-xs px-4.5 py-2 rounded-full border-[1.5px] border-[#2C5A31] bg-white text-[#2C5A31]">
          ⬇ Tải về
        </button>
      </div>
    </div>
  );
}
