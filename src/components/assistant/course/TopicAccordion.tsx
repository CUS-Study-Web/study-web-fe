import { useState } from 'react';
import type { SubjectTopic } from '../../../types/assistant/models';

interface TopicAccordionProps {
  topic: SubjectTopic;
  mode: 'lecture' | 'exercise';
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onDownload?: (id: number) => void;
  index?: number;
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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const items = mode === 'lecture' ? topic.lectures : topic.exercises;
  const count = items.length;

  return (
    <div className={`rounded-[12px] border ${open ? 'border-[var(--brand-base-600)]' : 'border-[var(--border-default)]'} bg-[var(--surface-card)] transition-colors`}>
      {/* Accordion header */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors select-none ${open ? 'bg-[var(--brand-base-50)] rounded-t-[11px]' : 'bg-transparent rounded-[11px]'}`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full shrink-0 ${open ? 'bg-[var(--brand-500)]' : 'bg-[var(--border-strong)]'}`} />
          <span className={`font-[family-name:var(--font-heading)] font-semibold text-[14px] ${open ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
            {topic.name}
          </span>
          <span className={`px-2 py-0.5 rounded-full font-[family-name:var(--font-heading)] font-semibold text-[11px] ${open ? 'bg-[var(--brand-soft-300)] text-[var(--brand-700)]' : 'bg-[var(--surface-muted)] text-[var(--text-secondary)]'}`}>
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
                className="flex items-start justify-between px-5 py-2.5 border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-400)] transition-colors last:rounded-b-[11px]"
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
                <div className="flex items-center gap-2 shrink-0 ml-4 relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenuId(null); }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === `lec-${lec.id}` ? null : `lec-${lec.id}`); }}
                    className="p-1.5 rounded-full hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                  </button>
                  {openMenuId === `lec-${lec.id}` && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-[var(--border-default)] rounded-[8px] shadow-lg z-10 py-1 overflow-hidden">
                      <button
                        onClick={() => { onEdit?.(lec.id); setOpenMenuId(null); }}
                        className="w-full text-left px-4 py-2 font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => { onDelete?.(lec.id); setOpenMenuId(null); }}
                        className="w-full text-left px-4 py-2 font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {mode === 'exercise' &&
            topic.exercises.map((ex) => (
              <div
                key={ex.id}
                className="flex items-start justify-between px-5 py-2.5 border-b border-[var(--border-subtle)] last:border-b-0 hover:bg-[var(--surface-400)] transition-colors last:rounded-b-[11px]"
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
                    <span>·</span>
                    <span>
                      Link bài giải: {ex.solutionLink ? (
                        <a href={ex.solutionLink} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-500)] hover:underline" onClick={e => e.stopPropagation()}>{ex.solutionLink}</a>
                      ) : 'chưa có'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4 relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenuId(null); }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === `ex-${ex.id}` ? null : `ex-${ex.id}`); }}
                    className="p-1.5 rounded-full hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                  </button>
                  {openMenuId === `ex-${ex.id}` && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-[var(--border-default)] rounded-[8px] shadow-lg z-10 py-1 overflow-hidden">
                      <button
                        onClick={() => { onView?.(ex.id); setOpenMenuId(null); }}
                        className="w-full text-left px-4 py-2 font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => { onDownload?.(ex.id); setOpenMenuId(null); }}
                        className="w-full text-left px-4 py-2 font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors"
                      >
                        Tải
                      </button>
                      <button
                        onClick={() => { onEdit?.(ex.id); setOpenMenuId(null); }}
                        className="w-full text-left px-4 py-2 font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => { onDelete?.(ex.id); setOpenMenuId(null); }}
                        className="w-full text-left px-4 py-2 font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
