interface SubjectCardProps {
  title: string;
  duration: string;
  lessons: number;
  cardHeaderBg: string;
  cardBtnColor: string;
  onSelect: () => void;
}

export default function SubjectCard({
  title,
  duration,
  lessons,
  cardHeaderBg,
  cardBtnColor,
  onSelect,
}: SubjectCardProps) {
  return (
    <div className="bg-white rounded-[var(--radius-xl)] shadow-sm border border-[var(--border-300)] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
      {/* Top Header Row with Course Color Tint */}
      <div className={`p-5 md:p-6 ${cardHeaderBg} border-b border-[var(--border-200)]`}>
        <h3
          className="text-xl md:text-2xl font-black !text-[var(--text-primary-500)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-[var(--surface-200)] border border-[var(--border-300)] rounded-[var(--radius-md)] p-2.5 text-center">
            <div
              className="font-extrabold text-[var(--text-primary-500)] text-sm md:text-base"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {duration}
            </div>
            <div className="text-xs text-[var(--text-secondary-300)] font-semibold mt-0.5">
              Thời lượng
            </div>
          </div>

          <div className="bg-[var(--surface-200)] border border-[var(--border-300)] rounded-[var(--radius-md)] p-2.5 text-center">
            <div
              className="font-extrabold text-[var(--text-primary-500)] text-sm md:text-base"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {lessons}
            </div>
            <div className="text-xs text-[var(--text-secondary-300)] font-semibold mt-0.5">
              Số bài học
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onSelect}
          className={`w-full py-3 ${cardBtnColor} !text-white font-extrabold rounded-[var(--radius-md)] text-sm shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer`}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
