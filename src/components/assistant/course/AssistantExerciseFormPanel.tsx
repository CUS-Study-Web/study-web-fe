import { useState, useImperativeHandle, forwardRef, type ReactNode, useEffect } from 'react';
import { DEMO_COURSE_SUBJECTS } from '../../../types/assistant/mockData';

export interface AssistantExerciseAnswer {
  selected: string[];
}

export interface ExerciseFormData {
  subject: string;
  questionCount: number;
  title: string;
  solutionLink: string;
  fileType: string;
  status: 'published' | 'draft';
  answers: AssistantExerciseAnswer[];
}

export interface AssistantExerciseFormPanelHandle {
  getData: () => ExerciseFormData;
}

interface AssistantExerciseFormPanelProps {
  courseKey: string;
  mode: 'create' | 'edit';
  initialData?: Partial<ExerciseFormData>;
  children?: ReactNode;
}

const FILE_TYPES = ['PDF', 'DOCX', 'XLSX'];
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

/** Tạo mảng answers với số câu cho trước */
function buildAnswers(count: number, existing: AssistantExerciseAnswer[] = []): AssistantExerciseAnswer[] {
  return Array.from({ length: count }, (_, i) => existing[i] ?? { selected: [] });
}

const AssistantExerciseFormPanel = forwardRef<AssistantExerciseFormPanelHandle, AssistantExerciseFormPanelProps>(
  ({ courseKey, initialData, children }, ref) => {
    const subjects = DEMO_COURSE_SUBJECTS[courseKey] ?? [];

    const [subject, setSubject] = useState(initialData?.subject ?? (subjects.length > 0 ? subjects[0] : ''));
    const [questionCount, setQuestionCount] = useState(initialData?.questionCount ?? 20);
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [solutionLink, setSolutionLink] = useState(initialData?.solutionLink ?? '');
    const [fileType, setFileType] = useState(initialData?.fileType ?? 'PDF');
    const [status, setStatus] = useState<'published' | 'draft'>(initialData?.status ?? 'published');
    const [answers, setAnswers] = useState<AssistantExerciseAnswer[]>(
      initialData?.answers ?? buildAnswers(initialData?.questionCount ?? 20)
    );

    // Sync số câu trắc nghiệm khi người dùng thay đổi field "Số câu"
    useEffect(() => {
      const count = Math.max(1, questionCount || 0);
      setAnswers((prev) => buildAnswers(count, prev));
    }, [questionCount]);

    useImperativeHandle(ref, () => ({
      getData: () => ({ subject, questionCount, title, solutionLink, fileType, status, answers }),
    }));

    const updateAnswerSelected = (idx: number, opt: string) => {
      setAnswers((prev) =>
        prev.map((a, i) => {
          if (i !== idx) return a;
          // Always single-choice: toggle selection
          return { ...a, selected: a.selected.includes(opt) ? [] : [opt] };
        })
      );
    };

    return (
      <div className="flex flex-col gap-3 bg-white p-4 rounded-[12px]">
        <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
          Thông tin bài tập
        </div>

        {/* Khóa học */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Khóa học
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[var(--surface-muted)] border border-[var(--border-default)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)] shrink-0">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)]">
              {courseKey}
            </span>
          </div>
        </div>

        {/* Môn học */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Môn học
          </div>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--brand-500)] transition-colors"
          >
            <option value="">— Chọn môn học —</option>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Số câu */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Số câu hỏi
          </div>
          <input
            type="number"
            min={1}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors"
          />
        </div>

        {/* Tiêu đề */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Tiêu đề
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề bài tập..."
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors placeholder:text-[var(--text-tertiary)]"
          />
        </div>

        {/* Link bài giải */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Link bài giải (nếu có)
          </div>
          <input
            type="text"
            value={solutionLink}
            onChange={(e) => setSolutionLink(e.target.value)}
            placeholder="Nhập link bài giải..."
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors placeholder:text-[var(--text-tertiary)]"
          />
        </div>

        {/* Loại file */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Loại file
          </div>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none cursor-pointer focus:border-[var(--brand-500)] transition-colors"
          >
            {FILE_TYPES.map((ft) => <option key={ft} value={ft}>{ft}</option>)}
          </select>
        </div>

        {/* Trạng thái */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-1.5">
            Trạng thái
          </div>
          <div className="flex rounded-[8px] overflow-hidden border border-[var(--border-default)]">
            <div
              onClick={() => setStatus('published')}
              className={`flex-1 py-1.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer transition-colors select-none ${status === 'published'
                ? 'bg-[var(--brand-500)] text-white'
                : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                }`}
            >
              Xuất bản
            </div>
            <div
              onClick={() => setStatus('draft')}
              className={`flex-1 py-1.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer transition-colors select-none border-l border-[var(--border-default)] ${status === 'draft'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                }`}
            >
              Nháp
            </div>
          </div>
        </div>

        {/* Đáp án trắc nghiệm */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-2">
            Đáp án trắc nghiệm
            <span className="ml-2 text-[var(--brand-600)] font-semibold normal-case tracking-normal">
              ({answers.length} câu)
            </span>
          </div>

          <div className="overflow-y-auto flex flex-col gap-3 pr-1" style={{ maxHeight: '250px' }}>
            {answers.map((ans, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] w-[55px] shrink-0">
                  Câu {idx + 1}:
                </span>
                <div className="flex items-center gap-3">
                  {OPTION_LABELS.map((opt) => {
                    const isSelected = ans.selected.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => updateAnswerSelected(idx, opt)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-[family-name:var(--font-heading)] font-bold text-[12px] cursor-pointer select-none transition-all duration-150 border ${
                          isSelected
                            ? 'bg-[var(--brand-500)] text-white border-[var(--brand-500)]'
                            : 'bg-white text-[var(--text-secondary)] border-[var(--border-strong)] hover:border-[var(--brand-400)] hover:text-[var(--brand-600)]'
                        }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {children}
      </div>
    );
  }
);

AssistantExerciseFormPanel.displayName = 'AssistantExerciseFormPanel';
export default AssistantExerciseFormPanel;
