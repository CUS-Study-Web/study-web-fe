interface SubjectCardProps {
  name: string;
  topics: number;
  lectures: number;
  exercises: number;
  onViewDetail: (subjectName: string) => void;
}

export default function SubjectCard({ name, topics, lectures, exercises, onViewDetail }: SubjectCardProps) {
  return (
    <div className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-clay-sm)] overflow-hidden">
      {/* Subject name */}
      <div className="px-5 pt-4 pb-3">
        <div className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
          {name}
        </div>
      </div>

      {/* Stat row */}
      <div className="flex border-t border-[var(--border-subtle)]">
        {[
          { value: topics, label: 'Chuyên đề' },
          { value: lectures, label: 'Bài giảng' },
          { value: exercises, label: 'Bài tập' },
        ].map((stat, i, arr) => (
          <div
            key={stat.label}
            className={`flex-1 px-3 py-4 text-center ${i < arr.length - 1 ? 'border-r border-[var(--border-subtle)]' : ''}`}
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
      <div className="px-5 py-3 border-t border-[var(--border-subtle)] flex justify-end">
        <div
          onClick={() => onViewDetail(name)}
          className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--brand-600)] cursor-pointer hover:text-[var(--brand-700)] transition-colors select-none"
        >
          Xem chi tiết →
        </div>
      </div>
    </div>
  );
}
