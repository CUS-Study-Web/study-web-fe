import { useState } from 'react';
import type { FlashcardTopic } from '../../../types/assistant/models';

// ─── Summary Chips ────────────────────────────────────────────────────────────

interface SummaryChipProps {
  label: string;
  value: number;
  color: string;
  bg: string;
}

function SummaryChip({ label, value, color, bg }: SummaryChipProps) {
  return (
    <div
      className="flex items-baseline gap-2 px-[18px] py-[10px] rounded-xl"
      style={{ background: bg }}
    >
      <span
        className="font-[family-name:var(--font-heading)] font-black text-[20px]"
        style={{ color }}
      >
        {value}
      </span>
      <span
        className="font-[family-name:var(--font-body)] text-[12px]"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

interface AssistantSummaryChipsProps {
  topics: FlashcardTopic[];
}

export function AssistantSummaryChips({ topics }: AssistantSummaryChipsProps) {
  const totalWords = topics.reduce((s, t) => s + t.words, 0);
  const activeCount = topics.filter(t => t.status === 'Đang dùng').length;

  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      <SummaryChip
        label="Tổng chủ đề"
        value={topics.length}
        color="var(--brand-500)"
        bg="var(--brand-soft-500)"
      />
      <SummaryChip
        label="Tổng từ vựng"
        value={totalWords}
        color="var(--info-500)"
        bg="var(--info-100)"
      />
      <SummaryChip
        label="Đang dùng"
        value={activeCount}
        color="#9B4E8D"
        bg="#F5E6F3"
      />
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

// function StatusBadge({ status }: { status: FlashcardTopic['status'] }) {
//   const isDangDung = status === 'Đang dùng';
//   return (
//     <div
//       className="inline-block rounded-full px-3 py-1 font-[family-name:var(--font-heading)] font-bold text-[11px] whitespace-nowrap"
//       style={{
//         background: isDangDung ? 'var(--brand-soft-500)' : 'var(--surface-500)',
//         color: isDangDung ? 'var(--brand-500)' : 'var(--neutral-500)',
//       }}
//     >
//       {status}
//     </div>
//   );
// }

// ─── Kebab Menu ───────────────────────────────────────────────────────────────

interface KebabMenuProps {
  topicId: number;
  openKebab: number | null;
  setOpenKebab: (id: number | null) => void;
  onEdit: () => void;
}

function KebabMenu({ topicId, openKebab, setOpenKebab, onEdit }: KebabMenuProps) {
  const isOpen = openKebab === topicId;

  const menuItems = [
    { label: 'Tải về', icon: '⬇', color: 'var(--info-500)', action: () => setOpenKebab(null) },
    {
      label: 'Chỉnh sửa',
      icon: '✏️',
      color: 'var(--text-secondary)',
      action: () => {
        onEdit();
        setOpenKebab(null);
      },
    },
    { label: 'Xóa', icon: '🗑️', color: 'var(--error-500)', action: () => setOpenKebab(null) },
  ];

  return (
    <div className="relative inline-block" onClick={e => e.stopPropagation()}>
      {/* Trigger button */}
      <button
        onClick={() => setOpenKebab(isOpen ? null : topicId)}
        className="w-8 h-8 rounded-lg border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 z-[200] bg-white rounded-xl border border-[var(--border-default)] py-1.5 min-w-[160px]"
          style={{ top: 'calc(100% + 4px)', boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
        >
          {menuItems.map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-left hover:bg-[var(--surface-500)] transition-colors"
              style={{ color: item.color }}
            >
              <span className="text-[14px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Topic Table ──────────────────────────────────────────────────────────────

interface AssistantTopicTableProps {
  topics: FlashcardTopic[];
  openKebab: number | null;
  setOpenKebab: (id: number | null) => void;
  onEditTopic: (topic: FlashcardTopic) => void;
}

const ROW_GRID = 'grid-cols-[2fr_1fr_1fr_64px]';

const HEADER_COLS = [
  { label: 'Tên chủ đề', align: 'text-left' },
  { label: 'Số từ', align: 'text-center' },
  { label: 'Ngày tạo', align: 'text-left' },
  { label: '', align: 'text-right' },
];

export function AssistantTopicTable({
  topics,
  openKebab,
  setOpenKebab,
  onEditTopic,
}: AssistantTopicTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div
      className="bg-white rounded-[18px] border border-[var(--border-default)] overflow-hidden"
      style={{ boxShadow: 'var(--shadow-clay-sm)' }}
    >
      {/* Header row */}
      <div className={`grid ${ROW_GRID} bg-[var(--surface-500)]`}>
        {HEADER_COLS.map((col, i) => (
          <div
            key={i}
            className={`px-5 py-3 font-[family-name:var(--font-heading)] font-bold text-[11px] text-[var(--neutral-500)] uppercase tracking-[0.4px] whitespace-nowrap ${col.align}`}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {topics.length === 0 ? (
        <div className="px-5 py-8 text-center font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-400)]">
          Chưa có chủ đề nào. Nhấn &ldquo;Tạo chủ đề&rdquo; để bắt đầu.
        </div>
      ) : (
        topics.map(topic => (
          <div
            key={topic.id}
            className={`grid ${ROW_GRID} items-center border-t border-[var(--surface-500)] transition-colors`}
            style={{ background: hoveredRow === topic.id ? '#FAFCFA' : '' }}
            onMouseEnter={() => setHoveredRow(topic.id)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Title */}
            <div className="px-5 py-3.5 font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--text-primary)] truncate">
              {topic.title}
            </div>
            {/* Word count */}
            <div className="px-5 py-3.5 text-center font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--brand-500)]">
              {topic.words}
            </div>
            {/* Date */}
            <div className="px-5 py-3.5 font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-500)] whitespace-nowrap">
              {topic.created}
            </div>
            {/* Actions */}
            <div className="px-5 py-3.5 flex justify-end relative">
              <KebabMenu
                topicId={topic.id}
                openKebab={openKebab}
                setOpenKebab={setOpenKebab}
                onEdit={() => onEditTopic(topic)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
