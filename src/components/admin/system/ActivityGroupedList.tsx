import type { AsstActivity } from '../../../types/admin'

type ActivityGroupedListProps = {
  filtered: AsstActivity[]
  asstGroups: [string, AsstActivity[]][]
}

export const ActivityGroupedList = ({
  filtered,
  asstGroups
}: ActivityGroupedListProps) => {
  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-[18px] border border-[var(--border-300)] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[40px_24px] text-center [font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
        Không có hoạt động nào trong khoảng thời gian này.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[18px]">
      {asstGroups.map(([name, items]) => (
        <div
          key={name}
          className="bg-white rounded-[18px] border border-[var(--border-300)] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Group header */}
          <div className="flex items-center gap-[10px] p-[14px_22px] border-b border-[var(--border-100)] bg-[var(--surface-500)]">
            <div className="w-[32px] h-[32px] rounded-full bg-[var(--brand-soft-500)] flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="stroke-[var(--brand-500)]" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
            <div className="[font-family:var(--font-heading)] font-bold text-[14px] text-[var(--text-primary)]">
              {name}
            </div>
            <span className="ml-auto bg-[var(--brand-soft-500)] text-[var(--brand-500)] rounded-full px-[10px] py-[2px] [font-family:var(--font-heading)] font-bold text-[12px]">
              {items.length} hoạt động
            </span>
          </div>

          {/* Items */}
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`flex gap-[14px] items-start p-[13px_22px] ${
                  idx < items.length - 1 ? 'border-b border-[var(--border-100)]' : ''
                }`}
              >
                <div className="w-[7px] h-[7px] rounded-full bg-[var(--brand-500)] shrink-0 mt-[6px]" />
                <span className="[font-family:var(--font-body)] text-[13.5px] text-[var(--text-primary)] flex-1">
                  {item.text}
                </span>
                <span className="[font-family:var(--font-body)] text-[12px] text-[var(--text-secondary-300)] shrink-0">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
