import { useState, useRef, useEffect } from 'react';
import type { FlashcardTopicResponse, FlashcardMetricsResponse } from '../../../types/api/flashcardTopic.api';

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
  metrics?: FlashcardMetricsResponse;
}

export function AssistantSummaryChips({ metrics }: AssistantSummaryChipsProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      <SummaryChip
        label="Tổng chủ đề"
        value={metrics?.totalTopics ?? 0}
        color="var(--brand-500)"
        bg="var(--brand-soft-500)"
      />
      <SummaryChip
        label="Tổng từ vựng"
        value={metrics?.totalWords ?? 0}
        color="var(--info-500)"
        bg="var(--info-100)"
      />
      <SummaryChip
        label="Đang dùng"
        value={metrics?.activeTopics ?? 0}
        color="#9B4E8D"
        bg="#F5E6F3"
      />
    </div>
  );
}

// ─── Kebab Menu — portal-style to avoid table overflow clipping ───────────────

interface KebabMenuProps {
  topicId: string;
  openKebab: string | null;
  setOpenKebab: (id: string | null) => void;
  onDownload: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function KebabMenu({ topicId, openKebab, setOpenKebab, onDownload, onEdit, onDelete }: KebabMenuProps) {
  const isOpen = openKebab === topicId;
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setOpenKebab(isOpen ? null : topicId);
  };

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (btnRef.current?.contains(e.target as Node)) return;
        if (menuRef.current?.contains(e.target as Node)) return;
      }
      setOpenKebab(null);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [isOpen, setOpenKebab]);

  const menuItems = [
    {
      label: 'Tải về',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      color: 'var(--text-primary)',
      action: () => { onDownload(); setOpenKebab(null); },
    },
    {
      label: 'Chỉnh sửa',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      ),
      color: 'var(--text-primary)',
      action: () => { onEdit(); setOpenKebab(null); },
    },
    {
      label: 'Xóa',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      ),
      color: '#DC2626',
      hoverBg: '#FEF2F2',
      action: () => { onDelete(); setOpenKebab(null); },
    },
  ];

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-8 h-8 min-w-8 min-h-8 flex-shrink-0 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {/* Portal-style dropdown — fixed position to escape table overflow:hidden */}
      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPos.top,
            right: menuPos.right,
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          }}
          className="bg-white rounded-[10px] border border-[var(--border-default)] py-1.5 min-w-[160px]"
        >
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-left transition-colors ${i === menuItems.length - 1
                ? 'hover:bg-[#FEF2F2]'
                : 'hover:bg-[var(--surface-500)]'
                }`}
              style={{ color: item.color }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Topic Table ──────────────────────────────────────────────────────────────

interface AssistantTopicTableProps {
  topics: FlashcardTopicResponse[];
  openKebab: string | null;
  setOpenKebab: (id: string | null) => void;
  onDownloadTopic: (id: string) => void;
  onEditTopic: (topic: FlashcardTopicResponse) => void;
  onDeleteTopic: (id: string) => void;
}

const ROW_GRID = 'grid-cols-[2fr_1fr_1fr_1fr_64px]';

const HEADER_COLS = [
  { label: 'Tên chủ đề', align: 'text-left' },
  { label: 'Số từ', align: 'text-center' },
  { label: 'Ngày tạo', align: 'text-left' },
  { label: 'Trạng thái', align: 'text-left' },
  { label: '', align: 'text-right' },
];

export function AssistantTopicTable({
  topics,
  openKebab,
  setOpenKebab,
  onDownloadTopic,
  onEditTopic,
  onDeleteTopic,
}: AssistantTopicTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('vi-VN');
    } catch {
      return isoString;
    }
  };

  return (
    <div
      className="bg-white rounded-[18px] border border-[var(--border-default)]"
      style={{ boxShadow: 'var(--shadow-clay-sm)' }}
    >
      {/* Header row */}
      <div className={`grid ${ROW_GRID} bg-[var(--surface-500)] rounded-t-[18px]`}>
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
              {topic.numWords}
            </div>
            {/* Date */}
            <div className="px-5 py-3.5 font-[family-name:var(--font-body)] text-[13px] text-[var(--neutral-500)] whitespace-nowrap">
              {formatDate(topic.createdAt)}
            </div>
            {/* Status */}
            <div className="px-5 py-3.5 flex items-center">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-[family-name:var(--font-heading)] font-semibold text-[11px] ${topic.status === 'PUBLISH'
                ? 'bg-[var(--success-100)] text-[var(--success-700)]'
                : 'bg-[var(--warning-100)] text-[var(--warning-700)]'
                }`}>
                {topic.status === 'PUBLISH' ? 'Đã xuất bản' : 'Nháp'}
              </span>
            </div>
            {/* Actions */}
            <div className="px-5 py-3.5 flex justify-end">
              <KebabMenu
                topicId={topic.id}
                openKebab={openKebab}
                setOpenKebab={setOpenKebab}
                onDownload={() => onDownloadTopic(topic.id)}
                onEdit={() => onEditTopic(topic)}
                onDelete={() => onDeleteTopic(topic.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
