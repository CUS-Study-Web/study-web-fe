import { useState } from 'react';
import type { SubjectTopic } from '../../../types/assistant/models';

interface TopicAccordionProps {
  topic: SubjectTopic;
  mode: 'lecture' | 'exercise';
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onDownload?: (id: number) => void;
}

export default function TopicAccordion({
  topic,
  mode,
  onEdit,
  onDelete,
  onView,
  onDownload,
}: TopicAccordionProps) {
  const [open, setOpen] = useState(true);
  const items = mode === 'lecture' ? topic.lectures : topic.exercises;
  const count = items.length;

  return (
    <div className="rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-card)] overflow-hidden">
      {/* Accordion header */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--brand-500)] shrink-0" />
          <span className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)]">
            {topic.name}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[var(--brand-soft-300)] text-[var(--brand-700)] font-[family-name:var(--font-heading)] font-semibold text-[11px]">
            {count} bài
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-[var(--text-tertiary)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Accordion body */}
      {open && (
        <div className="border-t border-[var(--border-subtle)]">
          {mode === 'lecture' &&
            topic.lectures.map((lec) => (
              <div
                key={lec.id}
                className="flex items-start justify-between px-5 py-4 border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-400)] transition-colors"
              >
                <div>
                  <div className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)]">
                    {lec.title}
                  </div>
                  <a
                    href={lec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-body)] text-[12px] text-[var(--brand-500)] hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {lec.link}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <div
                    onClick={() => onEdit?.(lec.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-[6px] border border-[var(--border-default)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                    Sửa
                  </div>
                  <div
                    onClick={() => onDelete?.(lec.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[#DC2626] cursor-pointer hover:bg-[#FEE2E2] transition-colors select-none"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Xóa
                  </div>
                </div>
              </div>
            ))}

          {mode === 'exercise' &&
            topic.exercises.map((ex) => (
              <div
                key={ex.id}
                className="flex items-start justify-between px-5 py-4 border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-400)] transition-colors"
              >
                <div>
                  <div className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)] mb-1">
                    {ex.title}
                  </div>
                  <div className="flex items-center gap-1.5 font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)]">
                    <span>Môn học</span>
                    <span className="font-semibold text-[var(--brand-600)]">{ex.subject}</span>
                    <span>·</span>
                    <span>{ex.questions} câu hỏi</span>
                    <span>·</span>
                    <span className="font-semibold">{ex.fileType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <div
                    onClick={() => onView?.(ex.id)}
                    className="px-3 py-1.5 rounded-[6px] border border-[var(--border-default)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
                  >
                    Xem
                  </div>
                  <div
                    onClick={() => onDownload?.(ex.id)}
                    className="px-3 py-1.5 rounded-[6px] border border-[var(--border-default)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
                  >
                    Tải
                  </div>
                  <div
                    onClick={() => onEdit?.(ex.id)}
                    className="px-3 py-1.5 rounded-[6px] border border-[var(--border-default)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
                  >
                    Sửa
                  </div>
                  <div
                    onClick={() => onDelete?.(ex.id)}
                    className="px-3 py-1.5 rounded-[6px] border border-[#FCA5A5] bg-[#FEF2F2] font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[#DC2626] cursor-pointer hover:bg-[#FEE2E2] transition-colors select-none"
                  >
                    Xóa
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
