import { useState, useImperativeHandle, forwardRef, type ReactNode } from 'react';

export interface ExamAnswer {
  type: 'single' | 'multiple';
  selected: string[];
}

export interface ExamFormData {
  title: string;
  courseKey: string;
  questions: string;
  duration: string;
  date: string;
  status: 'published' | 'draft';
  answers: ExamAnswer[];
}

export interface ExamFormPanelHandle {
  getData: () => ExamFormData;
}

interface ExamFormPanelProps {
  courseKey: string;
  mode: 'create' | 'edit';
  initialData?: Partial<ExamFormData>;
  children?: ReactNode;
}

function todayString() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const ExamFormPanel = forwardRef<ExamFormPanelHandle, ExamFormPanelProps>(
  ({ courseKey, mode, initialData, children }, ref) => {
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [questions, setQuestions] = useState(initialData?.questions ?? '50');
    const [duration, setDuration] = useState(initialData?.duration ?? '90');
    const [date, setDate] = useState(initialData?.date ?? todayString());
    const [status, setStatus] = useState<'published' | 'draft'>(initialData?.status ?? 'published');
    const [answers, setAnswers] = useState<ExamAnswer[]>(
      initialData?.answers ?? Array.from({ length: 5 }, () => ({ type: 'single', selected: [] }))
    );

    useImperativeHandle(ref, () => ({
      getData: () => ({ title, courseKey, questions, duration, date, status, answers }),
    }));

    const updateAnswerType = (idx: number, type: 'single' | 'multiple') => {
      setAnswers((prev) => prev.map((a, i) => (i === idx ? { ...a, type, selected: [] } : a)));
    };

    const updateAnswerSelected = (idx: number, opt: string) => {
      setAnswers((prev) =>
        prev.map((a, i) => {
          if (i !== idx) return a;
          if (a.type === 'single') {
            return { ...a, selected: a.selected.includes(opt) ? [] : [opt] };
          } else {
            return {
              ...a,
              selected: a.selected.includes(opt)
                ? a.selected.filter((o) => o !== opt)
                : [...a.selected, opt],
            };
          }
        })
      );
    };

    const addAnswer = () => {
      setAnswers((prev) => [...prev, { type: 'single', selected: [] }]);
    };

    return (
      <div className="flex flex-col gap-4 bg-white p-5 rounded-[12px]">
        {/* Panel title */}
        <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
          Thông tin đề thi
        </div>

        {/* Tiêu đề */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Tiêu đề
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề đề thi..."
            className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors placeholder:text-[var(--text-tertiary)] bg-white"
          />
        </div>

        {/* Khóa học */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Khóa học
          </div>
          <div className="px-3 py-2.5 rounded-[8px] bg-[var(--surface-muted)] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
            {courseKey}
          </div>
        </div>

        {/* Số câu + Thời gian */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
              Số câu
            </div>
            <input
              type="number"
              min={1}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white"
            />
          </div>
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
              Thời gian (phút)
            </div>
            <input
              type="number"
              min={1}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white"
            />
          </div>
        </div>

        {/* Ngày đăng */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Ngày đăng
          </div>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--brand-base-600)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-base-600)] transition-colors bg-white"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Trạng thái
          </div>
          <div className="flex rounded-[8px] overflow-hidden border border-[var(--brand-base-600)]">
              <div
                onClick={() => setStatus('published')}
                className={`flex-1 py-2.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer transition-colors select-none ${status === 'published'
                  ? 'bg-[var(--brand-500)] text-white'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                  }`}
              >
                Xuất bản
              </div>
              <div
                onClick={() => setStatus('draft')}
                className={`flex-1 py-2.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer transition-colors select-none border-l border-[var(--border-default)] ${status === 'draft'
                  ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                  }`}
              >
                Nháp
              </div>
            </div>
          </div>

        {/* Đáp án trắc nghiệm */}
        <div>
          <div className="font-[family-name:var(--font-heading)] font-bold text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-3">
            Đáp án trắc nghiệm
          </div>

          <div className="flex flex-col gap-2">
            {answers.map((ans, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {/* Question label */}
                <span className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] w-[48px] shrink-0">
                  Câu {idx + 1}:
                </span>

                {/* Type dropdown */}
                <select
                  value={ans.type}
                  onChange={(e) => updateAnswerType(idx, e.target.value as 'single' | 'multiple')}
                  className="px-2 py-1 rounded-[6px] border border-[var(--brand-base-600)] bg-white font-[family-name:var(--font-body)] text-[12px] text-[var(--text-primary)] outline-none cursor-pointer"
                >
                  <option value="single">Single</option>
                  <option value="multiple">Multiple</option>
                </select>

                {/* ABCD selectors */}
                <div className="flex items-center gap-1.5 ml-auto">
                  {OPTION_LABELS.map((opt) => {
                    const isSelected = ans.selected.includes(opt);
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

            {/* Add question row */}
            <div
              onClick={addAnswer}
              className="mt-1 flex items-center justify-center gap-1 py-2 rounded-[8px] border border-dashed border-[var(--brand-base-600)] text-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[13px] cursor-pointer hover:bg-[var(--brand-soft-300)] transition-colors select-none"
            >
              + Thêm câu
            </div>
          </div>
        </div>

        {children}
      </div>
    );
  }
);

ExamFormPanel.displayName = 'ExamFormPanel';
export default ExamFormPanel;
