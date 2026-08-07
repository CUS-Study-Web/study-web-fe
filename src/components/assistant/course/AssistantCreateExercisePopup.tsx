import { useState } from 'react';
import { DEMO_COURSE_SUBJECTS } from '../../../types/assistant/mockData';

interface AssistantCreateExercisePopup {
  courseKey: string;
  onClose: () => void;
}

const FILE_TYPES = ['PDF', 'DOCX', 'XLSX'];
const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: 'bg-[#FEE2E2] text-[#DC2626]',
  DOCX: 'bg-[#DBEAFE] text-[#1D4ED8]',
  XLSX: 'bg-[#D1FAE5] text-[#065F46]',
};

export default function AssistantCreateExercisePopup({ courseKey, onClose }: AssistantCreateExercisePopup) {
  const [subject, setSubject] = useState('');
  const [order, setOrder] = useState(1);
  const [questionCount, setQuestionCount] = useState(20);
  const [title, setTitle] = useState('');
  const [solutionLink, setSolutionLink] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const subjects = DEMO_COURSE_SUBJECTS[courseKey] ?? [];

  const handleCreate = () => {
    console.log('Create exercise:', { courseKey, subject, order, questionCount, title, solutionLink, fileType, fileName });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] w-[680px] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft-300)] flex items-center justify-center text-[20px]">
              📝
            </div>
            <div>
              <div className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
                Tạo bài tập
              </div>
              <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)]">
                Tải lên file bài tập cho học viên
              </div>
            </div>
          </div>
          <div
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--surface-muted)] cursor-pointer text-[var(--text-secondary)] text-[18px] leading-none select-none"
          >
            ×
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-[1fr_1fr] gap-5 mb-5">
          {/* Left: drop zone */}
          <div className="flex flex-col gap-3">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) setFileName(file.name);
              }}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-[12px] border-2 border-dashed transition-colors ${dragging
                ? 'border-[var(--brand-500)] bg-[var(--brand-soft-300)]'
                : 'border-[var(--border-default)] bg-[var(--surface-muted)]'
                }`}
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              {fileName ? (
                <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--brand-600)] font-medium text-center break-all px-2">
                  {fileName}
                </div>
              ) : (
                <>
                  <div className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] text-center">
                    Kéo thả tập vào đây
                  </div>
                  <div className="font-[family-name:var(--font-body)] text-[11px] text-[var(--text-secondary)] text-center">
                    hoặc chọn từ thiết bị của bạn
                  </div>
                </>
              )}
              <label className="mt-1 px-4 py-1.5 rounded-[7px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none shadow-sm">
                Chọn tệp
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.xlsx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFileName(file.name);
                  }}
                />
              </label>
              <div className="font-[family-name:var(--font-body)] text-[10px] text-[var(--text-tertiary)]">
                PDF, DOCX và dưới 50MB
              </div>
            </div>

            {/* File type badges */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Loại file được hỗ trợ
              </div>
              <div className="flex items-center gap-2">
                {FILE_TYPES.map((ft) => (
                  <span
                    key={ft}
                    className={`px-2.5 py-1 rounded-[6px] font-[family-name:var(--font-heading)] font-bold text-[11px] ${FILE_TYPE_COLORS[ft]}`}
                  >
                    {ft}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="flex flex-col gap-3">
            {/* Khóa học */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Khóa học
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] bg-[var(--surface-muted)] border border-[var(--border-default)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)] shrink-0">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                  {courseKey}
                </span>
              </div>
            </div>

            {/* Môn học */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Môn học
              </div>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none cursor-pointer"
              >
                <option value="">— Chọn môn học —</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* STT + Số câu */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                  STT bài tập
                </div>
                <input
                  type="number"
                  min={1}
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors"
                />
              </div>
              <div>
                <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                  Số câu hỏi
                </div>
                <input
                  type="number"
                  min={1}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors"
                />
              </div>
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
                placeholder="Nhập tiêu đề bài tập..."
                className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors placeholder:text-[var(--text-tertiary)]"
              />
            </div>

            {/* Link bài giải */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Link bài giải (nếu có)
              </div>
              <input
                type="text"
                value={solutionLink}
                onChange={(e) => setSolutionLink(e.target.value)}
                placeholder="Nhập link bài giải..."
                className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] outline-none focus:border-[var(--brand-500)] transition-colors placeholder:text-[var(--text-tertiary)]"
              />
            </div>

            {/* Loại file */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Loại file
              </div>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none cursor-pointer"
              >
                {FILE_TYPES.map((ft) => <option key={ft} value={ft}>{ft}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <div
            onClick={onClose}
            className="flex-1 py-2.5 rounded-[8px] border border-[var(--border-default)] text-center font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
          >
            Hủy
          </div>
          <div
            onClick={handleCreate}
            className="flex-[2] py-2.5 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-center font-[family-name:var(--font-heading)] font-semibold text-[14px] text-white cursor-pointer transition-colors select-none"
          >
            Tạo bài tập
          </div>
        </div>
      </div>
    </div>
  );
}
