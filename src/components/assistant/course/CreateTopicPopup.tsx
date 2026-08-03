import { useState } from 'react';
import { DEMO_COURSE_SUBJECTS } from '../../../types/assistant/mockData';

interface CreateTopicPopup {
  courseKey: string;
  onClose: () => void;
}

export default function CreateTopicPopup({ courseKey, onClose }: CreateTopicPopup) {
  const [subject, setSubject] = useState('');
  const [order, setOrder] = useState(1);
  const [name, setName] = useState('');
  const subjects = DEMO_COURSE_SUBJECTS[courseKey] ?? [];

  const handleSave = () => {
    console.log('Create topic:', { courseKey, subject, order, name });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] w-[520px] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft-300)] flex items-center justify-center text-[20px]">
              📚
            </div>
            <div>
              <div className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
                Tạo chuyên đề
              </div>
              <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)]">
                Thêm chuyên đề mới vào môn học
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

        {/* KHÓA HỌC */}
        <div className="mb-4">
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

        {/* MÔN HỌC */}
        <div className="mb-4">
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
            Môn học
          </div>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none cursor-pointer"
          >
            <option value="">— Chọn môn học —</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* STT + Tên */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
              STT Chuyên đề
            </div>
            <input
              type="number"
              min={1}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)] transition-colors"
            />
          </div>
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
              Tên chuyên đề
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên chuyên đề..."
              className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)] transition-colors placeholder:text-[var(--text-tertiary)]"
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
            onClick={handleSave}
            className="flex-[2] py-2.5 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-center font-[family-name:var(--font-heading)] font-semibold text-[14px] text-white cursor-pointer transition-colors select-none"
          >
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
}
