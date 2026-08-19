import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssistantCoursePageHeader from '../../components/assistant/course/AssistantCoursePageHeader';
import AssistantTabBar from '../../components/assistant/course/AssistantTabBar';
import AssistantCreateLecturePopup from '../../components/assistant/course/AssistantCreateLecturePopup';
import AssistantEditLecturePopup from '../../components/assistant/course/AssistantEditLecturePopup';
import AssistantViewExercisePopup from '../../components/assistant/course/AssistantViewExercisePopup';
import AssistantConfirmPopup from '../../components/assistant/AssistantConfirmPopup';
import {
  DEMO_COURSES,
  DEMO_SUBJECT_TOPICS,
} from '../../types/mockData';
import type { SubjectLecture, SubjectExercise } from '../../types/assistant';
import { ROUTES } from '../../utils/routes';

const TABS = [
  { key: 'bai-giang', label: 'Bài giảng' },
  { key: 'bai-tap', label: 'Bài tập' },
];

const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: 'bg-[#FEE2E2] text-[#DC2626]',
  DOCX: 'bg-[#DBEAFE] text-[#1D4ED8]',
  XLSX: 'bg-[#D1FAE5] text-[#065F46]',
};

// ── Action menu (dùng chung cho cả 2 tab) ──────────────────────────────────

interface LectureActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

function LectureActionMenu({ onEdit, onDelete }: LectureActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
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
        className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
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
            onClick={() => { setOpen(false); onEdit(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa
          </button>
        </div>
      )}
    </>
  );
}

interface ExerciseActionMenuProps {
  onView: () => void;
  onDownload: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function ExerciseActionMenu({ onView, onDownload, onEdit, onDelete }: ExerciseActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
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
        className="w-8 h-8 rounded-full border border-[var(--border-strong)] bg-white cursor-pointer inline-flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
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
            onClick={() => { setOpen(false); onView(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            Xem
          </button>
          <button
            onClick={() => { setOpen(false); onDownload(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải về
          </button>
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-left transition-colors hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-[family-name:var(--font-heading)] font-semibold !text-[#DC2626] text-left transition-colors hover:bg-[#FEF2F2]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Xóa
          </button>
        </div>
      )}
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function AssistantSubjectDetail() {
  const { courseKey, subjectName } = useParams<{ courseKey: string; subjectName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bai-giang');
  const [isLecturePopupOpen, setIsLecturePopupOpen] = useState(false);
  const [editLecture, setEditLecture] = useState<SubjectLecture | null>(null);
  const [viewExercise, setViewExercise] = useState<SubjectExercise | null>(null);
  const [deleteLectureId, setDeleteLectureId] = useState<number | null>(null);
  const [deleteExerciseId, setDeleteExerciseId] = useState<number | null>(null);

  const decodedSubject = decodeURIComponent(subjectName ?? '');
  const course = DEMO_COURSES.find((c) => c.key === courseKey);

  // Flatten all lectures / exercises from topics into a single list
  const topicsRaw = DEMO_SUBJECT_TOPICS[decodedSubject] ?? [];
  const lectures: SubjectLecture[] = topicsRaw.flatMap((t) => t.lectures);
  const exercises: SubjectExercise[] = topicsRaw.flatMap((t) => t.exercises);

  return (
    <div className="flex flex-col h-full w-full">
      <AssistantCoursePageHeader
        breadcrumbs={[
          { label: 'Quản lý khóa học', onClick: () => navigate(ROUTES.ASSISTANT.COURSES) },
          {
            label: course?.name ?? courseKey ?? '',
            onClick: () => navigate(ROUTES.ASSISTANT.COURSE_DETAIL(courseKey ?? '')),
          },
          { label: decodedSubject },
        ]}
        title={decodedSubject}
        subtitle={`Quản lý nội dung môn học · Khóa ${course?.name ?? courseKey}`}
        rightSlot={
          <div
            onClick={() => {
              if (activeTab === 'bai-giang') {
                setIsLecturePopupOpen(true);
              } else {
                navigate(`${ROUTES.ASSISTANT.COURSE_CREATE_EXERCISE(courseKey ?? '')}?subject=${encodeURIComponent(decodedSubject)}`);
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-white cursor-pointer active:scale-95 transition-all duration-150 select-none shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Tải lên
          </div>
        }
      />

      <AssistantTabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-5">
        {/* ── Bài giảng tab ── */}
        {activeTab === 'bai-giang' && (
          <div className="bg-[var(--surface-card)] rounded-[18px] border border-[var(--border-default)] shadow-[var(--shadow-clay-sm)] overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-500)]">
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Tiêu đề
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Link
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Tải lên lúc
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]" />
                  </tr>
                </thead>
                <tbody>
                  {lectures.map((lec) => (
                    <tr
                      key={lec.id}
                      className="hover:bg-[var(--surface-400)] transition-colors duration-140 border-t border-[var(--surface-500)]"
                    >
                      <td className="py-3.5 px-5">
                        <span className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)]">
                          {lec.title}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <a
                          href={lec.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-[family-name:var(--font-body)] text-[13px] text-[var(--brand-500)] hover:underline"
                        >
                          {lec.link}
                        </a>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                          Hôm nay
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex justify-end">
                          <LectureActionMenu
                            onEdit={() => setEditLecture(lec)}
                            onDelete={() => setDeleteLectureId(lec.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {lectures.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                        Chưa có bài giảng nào. Hãy tải lên bài giảng đầu tiên.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Bài tập tab ── */}
        {activeTab === 'bai-tap' && (
          <div className="bg-[var(--surface-card)] rounded-[18px] border border-[var(--border-default)] shadow-[var(--shadow-clay-sm)] overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-500)]">
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Tiêu đề
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Số câu hỏi
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Loại file
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Trạng thái
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]">
                      Link giải
                    </th>
                    <th className="text-left font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] py-[11px] px-5 whitespace-nowrap uppercase tracking-[0.4px]" />
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((ex) => (
                    <tr
                      key={ex.id}
                      className="hover:bg-[var(--surface-400)] transition-colors duration-140 border-t border-[var(--surface-500)]"
                    >
                      <td className="py-3.5 px-5">
                        <span className="font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)]">
                          {ex.title}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                          {ex.questions} câu
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-2.5 py-1 rounded-md font-[family-name:var(--font-heading)] font-semibold text-[11px] ${FILE_TYPE_COLORS[ex.fileType] ?? 'bg-[var(--surface-muted)] text-[var(--text-secondary)]'}`}>
                          {ex.fileType}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-2.5 py-1 rounded-md font-[family-name:var(--font-heading)] font-semibold text-[11px] ${ex.status === 'draft' ? 'bg-[var(--warning-100)] text-[var(--warning-700)]' : 'bg-[var(--success-100)] text-[var(--success-700)]'
                          }`}>
                          {ex.status === 'draft' ? 'Nháp' : 'Đã xuất bản'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        {ex.solutionLink ? (
                          <a
                            href={ex.solutionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-[family-name:var(--font-body)] text-[13px] text-[var(--brand-500)] hover:underline"
                          >
                            {ex.solutionLink}
                          </a>
                        ) : (
                          <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-tertiary)]">
                            Chưa có
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex justify-end">
                          <ExerciseActionMenu
                            onView={() => setViewExercise(ex)}
                            onDownload={() => console.log('Download exercise', ex.id)}
                            onEdit={() => navigate(`${ROUTES.ASSISTANT.COURSE_EDIT_EXERCISE(courseKey ?? '', String(ex.id))}?subject=${encodeURIComponent(decodedSubject)}`)}
                            onDelete={() => setDeleteExerciseId(ex.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {exercises.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                        Chưa có bài tập nào. Hãy tải lên bài tập đầu tiên.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isLecturePopupOpen && (
        <AssistantCreateLecturePopup courseKey={courseKey ?? ''} onClose={() => setIsLecturePopupOpen(false)} />
      )}

      {/* Edit / View Popups */}
      {editLecture && (
        <AssistantEditLecturePopup
          course={course?.name ?? courseKey ?? ''}
          subjects={[decodedSubject]}
          lecture={editLecture}
          onClose={() => setEditLecture(null)}
          onSave={() => console.log('Saved lecture', editLecture.id)}
        />
      )}

      {viewExercise && (
        <AssistantViewExercisePopup
          course={course?.name ?? courseKey ?? ''}
          subject={decodedSubject}
          exercise={viewExercise}
          onClose={() => setViewExercise(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteLectureId && (
        <AssistantConfirmPopup
          title="Xóa bài giảng"
          message={`Bạn có chắc muốn xóa bài giảng này?`}
          confirmLabel="Xóa"
          variant="danger"
          onConfirm={() => setDeleteLectureId(null)}
          onCancel={() => setDeleteLectureId(null)}
        />
      )}

      {deleteExerciseId && (
        <AssistantConfirmPopup
          title="Xóa bài tập"
          message={`Bạn có chắc muốn xóa bài tập này?`}
          confirmLabel="Xóa"
          variant="danger"
          onConfirm={() => setDeleteExerciseId(null)}
          onCancel={() => setDeleteExerciseId(null)}
        />
      )}
    </div>
  );
}
