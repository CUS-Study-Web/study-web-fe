import { useState } from 'react';
import AssistantConfirmPopup from '../AssistantConfirmPopup';

interface AssistantEditLecturePopupProps {
  course: string;
  subjects: string[];
  lecture: any; // Add actual type later if needed
  onClose: () => void;
  onSave: () => void;
}

export default function AssistantEditLecturePopup({ course, subjects, lecture, onClose, onSave }: AssistantEditLecturePopupProps) {
  const [subject, setSubject] = useState(lecture?.subject || subjects[0] || '');
  const [title, setTitle] = useState(lecture?.title || '');
  const [link, setLink] = useState(lecture?.link || '');

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveRequest = () => {
    setShowConfirm(true);
  };

  const handleSaveConfirm = () => {
    setShowConfirm(false);
    onSave();
    onClose();
  };

  const labelClass = 'block font-[family-name:var(--font-heading)] font-bold text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1.5';
  const inputClass = 'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] outline-none box-border bg-transparent focus:border-[var(--brand-400)] transition-colors';
  const selectClass = 'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] outline-none box-border bg-[var(--surface-card)] focus:border-[var(--brand-400)] transition-colors cursor-pointer';
  const disabledClass = 'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-tertiary)] bg-[var(--surface-muted)] cursor-not-allowed flex items-center gap-2';

  return (
    <>
      <div
        className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] py-7 px-7 w-full max-w-[520px] shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[linear-gradient(145deg,#FBF0DC,#F5DFA0)] flex items-center justify-center flex-shrink-0 text-[18px]">
                ✏️
              </div>
              <div>
                <div className="font-[family-name:var(--font-heading)] font-extrabold text-[length:var(--text-body-lg)] text-[var(--text-primary)] leading-tight">
                  Sửa bài giảng
                </div>
                <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] mt-0.5">
                  Chỉnh sửa thông tin bài giảng
                </div>
              </div>
            </div>
            <div
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] bg-transparent border-none cursor-pointer text-xl transition-colors flex-shrink-0"
            >
              ×
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Khóa học</label>
                <div className={disabledClass}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0110 0v4"></path>
                  </svg>
                  {course}
                </div>
              </div>
              <div>
                <label className={labelClass}>Môn học</label>
                <select className={selectClass} value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option value="">— Chọn môn học —</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>



            <div>
              <label className={labelClass}>Tiêu đề bài giảng</label>
              <input type="text" placeholder="Nhập tiêu đề bài giảng..." value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Link bài giảng</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </span>
                <input type="url" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} className={`${inputClass} pl-9`} />
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 mt-6">
            <div onClick={onClose} className="flex-1 p-3 flex justify-center items-center rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors">
              Hủy
            </div>
            <div onClick={handleSaveRequest} className="flex-[2] p-3 flex justify-center items-center rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] text-[var(--text-inverse)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--brand-600)] transition-colors">
              Lưu thay đổi
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận chỉnh sửa"
          message="Bạn có chắc chắn muốn lưu các thay đổi cho bài giảng này không?"
          confirmLabel="Lưu"
          variant="warning"
          onConfirm={handleSaveConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
