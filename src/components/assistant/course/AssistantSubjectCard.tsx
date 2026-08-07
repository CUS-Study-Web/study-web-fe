interface AssistantSubjectCardProps {
  name: string;
  topics: number;
  lectures: number;
  exercises: number;
  onViewDetail: (subjectName: string) => void;
}

export default function AssistantSubjectCard({ name, topics, lectures, exercises, onViewDetail }: AssistantSubjectCardProps) {
  return (
    <div 
      onClick={() => onViewDetail(name)}
      className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-clay-sm)] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Subject name */}
      <div className="px-5 pt-4 pb-3 bg-[#F2F5F3]">
        <div className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
          {name}
        </div>
      </div>

      {/* Stat row */}
      <div className="flex gap-2 px-5 py-4">
        {[
          { value: topics, label: 'Chuyên đề' },
          { value: lectures, label: 'Bài giảng' },
          { value: exercises, label: 'Bài tập' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-1 py-3 text-center bg-[#F4F6F8] rounded-[10px]"
          >
            <div className="font-[family-name:var(--font-heading)] font-bold text-[20px] text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="font-[family-name:var(--font-body)] text-[11px] text-[var(--text-secondary)] mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 flex justify-end">
        <div className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-600)] transition-colors select-none">
          Xem chi tiết →
        </div>
      </div>
    </div>
  );
}
