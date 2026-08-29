import { useState, useRef, useEffect } from 'react';

export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: 'createdAt,desc', label: 'Mới nhất' },
  { value: 'createdAt,asc', label: 'Cũ nhất' },
  { value: 'title,asc', label: 'Tên A-Z' },
  { value: 'title,desc', label: 'Tên Z-A' },
  { value: 'downloadCount,desc', label: 'Lượt tải nhiều nhất' },
  { value: 'downloadCount,asc', label: 'Lượt tải ít nhất' },
];

interface AssistantMaterialSortPopupProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export default function AssistantMaterialSortPopup({
  currentSort,
  onSortChange,
}: AssistantMaterialSortPopupProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (containerRef.current?.contains(e.target as Node)) return;
      }
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [open]);

  const activeOption = SORT_OPTIONS.find(opt => opt.value === currentSort) || SORT_OPTIONS[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-4 py-2 rounded-[10px] bg-white border border-[var(--border-default)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary)] shadow-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5h10M11 9h7M11 13h4M3 17l4 4 4-4M7 21V3"/>
        </svg>
        Sắp xếp: <span className="text-[var(--text-primary)]">{activeOption.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 bg-white rounded-[12px] border border-[var(--border-default)] py-2 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSortChange(opt.value);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-left transition-colors hover:bg-[var(--surface-500)] ${
                currentSort === opt.value ? 'text-[var(--brand-600)] bg-[var(--brand-50)] hover:bg-[var(--brand-50)]' : 'text-[var(--text-primary)]'
              }`}
            >
              {currentSort === opt.value ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <div className="w-[16px]" />
              )}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
