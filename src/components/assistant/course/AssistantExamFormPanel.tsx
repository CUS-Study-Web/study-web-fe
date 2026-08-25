import { useState, useImperativeHandle, forwardRef, type ReactNode, useEffect } from 'react';

export interface AssistantExamAnswer {
  questionNumber: number;
  correctAnswer: string;
}

export interface ExamFormData {
  title: string;
  courseKey: string;
  questions: string;
  duration: string;
  date: string;
  status: 'published' | 'draft';
  fileType: string;
  accessTier: 'PUBLIC' | 'VIP';
  solutionLink?: string;
  answers: AssistantExamAnswer[];
}

export interface AssistantExamFormPanelHandle {
  getData: () => ExamFormData | null;
  getFileType: () => string;
  setFileType: (fileType: string) => void;
}

interface AssistantExamFormPanelProps {
  courseKey: string;
  courseName?: string;
  mode: 'create' | 'edit';
  initialData?: Partial<ExamFormData>;
  children?: ReactNode;
}

function todayString() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

/** Tạo mảng answers với số câu cho trước */
function buildAnswers(count: number, existing: AssistantExamAnswer[] = []): AssistantExamAnswer[] {
  return Array.from({ length: count }, (_, i) => existing[i] ?? { questionNumber: i + 1, correctAnswer: '' });
}

import { useNotification } from '../../common/NotificationProvider';
import { isValidUrl } from '../../../utils/urlUtils';

const AssistantExamFormPanel = forwardRef<AssistantExamFormPanelHandle, AssistantExamFormPanelProps>(
  ({ courseKey, courseName, initialData, children }, ref) => {
    const { showError } = useNotification();
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [questions, setQuestions] = useState(initialData?.questions ?? '50');
    const [duration, setDuration] = useState(initialData?.duration ?? '90');
    const [date, setDate] = useState(initialData?.date ?? todayString());
    const [status, setStatus] = useState<'published' | 'draft'>(initialData?.status ?? 'published');
    const [fileType, setFileType] = useState(initialData?.fileType ?? 'PDF');
    const [accessTier, setAccessTier] = useState<'PUBLIC' | 'VIP'>(initialData?.accessTier ?? 'VIP');
    const [solutionLink, setSolutionLink] = useState(initialData?.solutionLink ?? '');
    const [answers, setAnswers] = useState<AssistantExamAnswer[]>(
      initialData?.answers ?? buildAnswers(Number(initialData?.questions ?? 50))
    );

    useEffect(() => {
      if (initialData?.fileType) {
        setFileType(initialData.fileType);
      }
    }, [initialData?.fileType]);

    // Sync số câu trắc nghiệm khi người dùng thay đổi field "Số câu"
    useEffect(() => {
      const count = Math.max(1, parseInt(questions) || 0);
      setAnswers((prev) => buildAnswers(count, prev));
    }, [questions]);

    useImperativeHandle(ref, () => ({
      getData: () => {
        const incompleteIndex = answers.findIndex(a => !a.correctAnswer);
        if (incompleteIndex !== -1) {
          showError(`Vui lòng chọn đáp án cho câu ${incompleteIndex + 1}`);
          return null;
        }
        if (solutionLink && !isValidUrl(solutionLink)) {
          showError('Link lời giải không hợp lệ.');
          return null;
        }
        return { title, courseKey, questions, duration, date, status, fileType, solutionLink, answers, accessTier };
      },
      getFileType: () => fileType,
      setFileType: (ft: string) => setFileType(ft),
    }));

    const updateAnswerSelected = (idx: number, opt: string) => {
      setAnswers((prev) =>
        prev.map((a, i) => {
          if (i !== idx) return a;
          // Always single-choice: toggle selection
          return { ...a, correctAnswer: a.correctAnswer === opt ? '' : opt };
        })
      );
    };

    return (
      <div className="flex flex-col gap-3 bg-white p-4 rounded-[12px]">
        {/* Panel title */}
        <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
          Thông tin đề thi
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
            placeholder="Nhập tiêu đề đề thi..."
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors placeholder:text-[var(--text-tertiary)] bg-white"
          />
        </div>

        {/* Khóa học */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Khóa học
          </div>
          <div className="px-3 py-1.5 rounded-[8px] bg-[var(--surface-muted)] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)]">
            {courseName || courseKey}
          </div>
        </div>

        {/* Số câu + Thời gian */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
              Số câu
            </div>
            <input
              type="number"
              min={1}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white"
            />
          </div>
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
              Thời gian (phút)
            </div>
            <input
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white"
            />
          </div>
        </div>

        {/* Ngày đăng */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Ngày đăng
          </div>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white"
          />
        </div>

        {/* Link lời giải */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Link lời giải (nếu có)
          </div>
          <input
            type="text"
            value={solutionLink}
            onChange={(e) => setSolutionLink(e.target.value)}
            placeholder="Nhập link lời giải..."
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors placeholder:text-[var(--text-tertiary)] bg-white"
          />
        </div>

        {/* Loại file */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Loại file
          </div>
          <div className="w-full px-3 py-1.5 rounded-[8px] bg-[var(--surface-muted)] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] cursor-not-allowed">
            {fileType}
          </div>
        </div>

        {/* Quyền truy cập */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[10px] uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Quyền truy cập
          </div>
          <select
            value={accessTier}
            onChange={(e) => setAccessTier(e.target.value as 'PUBLIC' | 'VIP')}
            className="w-full px-3 py-1.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '14px' }}
          >
            <option value="PUBLIC">Public</option>
            <option value="VIP">Vip</option>
          </select>
        </div>

        {/* Trạng thái */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-1.5">
            Trạng thái
          </div>
          <div className="flex rounded-[8px] overflow-hidden border border-[var(--brand-base-600)]">
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

        {/* Đáp án trắc nghiệm — fixed-height scrollable */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-2">
            Đáp án trắc nghiệm
            <span className="ml-2 text-[var(--brand-600)] font-semibold normal-case tracking-normal">
              ({answers.length} câu)
            </span>
          </div>

          {/* height cố định ~10 câu, cuộn nếu nhiều hơn */}
          <div className="overflow-y-auto flex flex-col gap-3 pr-1" style={{ maxHeight: '300px' }}>
            {answers.map((ans, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {/* Question label */}
                <span className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] w-[55px] shrink-0">
                  Câu {idx + 1}:
                </span>

                {/* ABCD selectors */}
                <div className="flex items-center gap-3">
                  {OPTION_LABELS.map((opt) => {
                    const isSelected = ans.correctAnswer === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => updateAnswerSelected(idx, opt)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-[family-name:var(--font-heading)] font-bold text-[12px] cursor-pointer select-none transition-all duration-150 border ${isSelected
                          ? 'bg-[var(--brand-500)] text-white border-[var(--brand-500)]'
                          : 'bg-white text-[var(--text-secondary)] border-[var(--brand-base-600)] hover:border-[var(--brand-400)] hover:text-[var(--brand-600)]'
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

AssistantExamFormPanel.displayName = 'AssistantExamFormPanel';
export default AssistantExamFormPanel;
