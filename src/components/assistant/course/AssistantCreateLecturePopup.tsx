import { useState } from 'react';
import { DEMO_COURSE_SUBJECTS } from '../../../types/assistant/mockData';

interface AssistantCreateLecturePopup {
  courseKey: string;
  onClose: () => void;
}

export default function AssistantCreateLecturePopup({ courseKey, onClose }: AssistantCreateLecturePopup) {
  const [subject, setSubject] = useState('');
  const [order, setOrder] = useState(1);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const subjects = DEMO_COURSE_SUBJECTS[courseKey] ?? [];

  const handleCreate = () => {
    console.log('Create lecture:', { courseKey, subject, order, title, link });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] w-[600px] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft-300)] flex items-center justify-center text-[20px]">
              🎬
            </div>
            <div>
              <div className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
                Tạo bài giảng
              </div>
              <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)]">
                Thêm bài giảng mới từ link bài giảng
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

        {/* Row: Khóa học + Môn học */}
        <div className="grid grid-cols-2 gap-3 mb-4">
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
        </div>

        {/* Số thứ tự */}
        <div className="mb-4">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Số thứ tự
          </div>
          <input
            type="number"
            min={1}
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)] transition-colors"
          />
        </div>

        {/* Tiêu đề */}
        <div className="mb-4">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Tiêu đề bài giảng
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề bài giảng..."
            className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)] transition-colors placeholder:text-[var(--text-tertiary)]"
          />
        </div>

        {/* Link bài giảng */}
        <div className="mb-6">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Link bài giảng
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] focus-within:border-[var(--brand-500)] transition-colors bg-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)] shrink-0">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-transparent font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
            />
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
            Tạo bài giảng
          </div>
        </div>
      </div>
    </div>
  );
}
