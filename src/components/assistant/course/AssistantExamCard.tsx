import { useState, useRef, useEffect } from 'react';
import type { CourseExam } from '../../../types/assistant';
import AssistantConfirmPopup from '../AssistantConfirmPopup';
import AssistantViewExamPopup from './AssistantViewExamPopup';
import AssistantFeatureInDevPopup from '../AssistantFeatureInDevPopup';
import { useDeleteAssessmentMutation } from '../../../hooks/queries/useAssessments';
import { useNotification } from '../../common/NotificationProvider';

interface ExamActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

function ExamActionMenu({ onView, onEdit, onDownload, onDelete }: ExamActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const handleClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      if (e instanceof MouseEvent) {
        if (btnRef.current?.contains(e.target as Node)) return;
        if (menuRef.current?.contains(e.target as Node)) return;
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

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-7 h-7 rounded-full border border-transparent bg-transparent cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-muted)] transition-colors absolute top-3 right-3 z-10"
        aria-label="Tùy chọn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--neutral-500)">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
          className="bg-white rounded-[10px] border border-[var(--border-default)] py-1.5 min-w-[160px]"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); onView(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Xem
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); onDownload(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải về
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); onEdit(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); onDelete(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa
          </button>
        </div>
      )}
    </>
  );
}

interface AssistantExamCardProps {
  exam: CourseExam;
  onEdit?: (exam: CourseExam) => void;
}

export default function AssistantExamCard({ exam, onEdit }: AssistantExamCardProps) {
  const isPublished = exam.status === 'published';
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { showSuccess, showError } = useNotification();
  const deleteMutation = useDeleteAssessmentMutation();

  return (
    <>
      <div
        onClick={() => onEdit?.(exam)}
        className="relative cursor-pointer rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-clay-sm)] p-4 hover:border-[var(--brand-300)] hover:shadow-md transition-all duration-150"
      >
        <ExamActionMenu
          onView={() => setShowViewPopup(true)}
          onEdit={() => onEdit?.(exam)}
          onDownload={() => setShowDevPopup(true)}
          onDelete={() => setShowDeleteConfirm(true)}
        />
        {/* Title */}
        <div className="font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--text-primary)] mb-3 pr-8 leading-tight line-clamp-2">
          {exam.title}
        </div>

        {/* Metadata list */}
        <div className="flex flex-col gap-2 mb-3.5">
          <div className="flex flex-wrap items-center text-[12px] text-[var(--text-secondary)] gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
              <span className="font-medium text-[var(--text-primary)]">{exam.courseName || exam.courseKey}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
              <span className="font-medium text-[var(--text-primary)]">{exam.questions} câu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <span className="font-medium text-[var(--text-primary)]">{exam.duration} phút</span>
            </div>
          </div>

          <div className="flex items-center text-[12px] text-[var(--text-secondary)] gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <span>Đăng ngày <span className="font-medium text-[var(--text-primary)]">{exam.date}</span></span>
          </div>


        </div>

        {/* Status & Access badges */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-[family-name:var(--font-heading)] font-semibold text-[11px] ${isPublished
            ? 'bg-[var(--success-100)] text-[var(--success-700)]'
            : 'bg-[var(--warning-100)] text-[var(--warning-700)]'
            }`}
          >
            {isPublished ? 'Đã xuất bản' : 'Nháp'}
          </span>
          {exam.accessTier && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-[family-name:var(--font-heading)] font-semibold text-[11px] ${exam.accessTier === 'VIP'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-blue-100 text-blue-700'
              }`}
            >
              {exam.accessTier === 'VIP' ? 'Vip' : 'Public'}
            </span>
          )}
        </div>
      </div>

      {showViewPopup && (
        <AssistantViewExamPopup
          exam={exam}
          onClose={() => setShowViewPopup(false)}
        />
      )}

      {showDeleteConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa đề thi "${exam.title}" không?`}
          confirmLabel={deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          variant="danger"
          onConfirm={() => {
            deleteMutation.mutate(
              { courseId: exam.courseKey, assessmentId: String(exam.id) },
              {
                onSuccess: () => {
                  setTimeout(() => {
                    showSuccess('Xóa đề thi thành công!');
                    setShowDeleteConfirm(false);
                  }, 500);
                },
                onError: (error: any) => {
                  setTimeout(() => {
                    showError(error?.response?.data?.message || 'Đã xảy ra lỗi khi xóa đề thi!');
                  }, 500);
                }
              }
            );
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showDevPopup && (
        <AssistantFeatureInDevPopup onClose={() => setShowDevPopup(false)} />
      )}
    </>
  );
}
