import { useState } from 'react';
import AssistantConfirmPopup from '../AssistantConfirmPopup';

interface AssistantEditExercisePopupProps {
  course: string;
  subjects: string[];
  exercise: any; // Add actual type later if needed
  onClose: () => void;
  onSave: () => void;
}

export default function AssistantEditExercisePopup({ course, subjects, exercise, onClose, onSave }: AssistantEditExercisePopupProps) {
  const [subject, setSubject] = useState(exercise?.subject || subjects[0] || '');
  const [questions, setQuestions] = useState(exercise?.questions || 20);
  const [title, setTitle] = useState(exercise?.title || '');
  const [fileType, setFileType] = useState(exercise?.fileType || 'PDF');

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

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
        <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] py-7 px-7 w-full max-w-[640px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[linear-gradient(145deg,#FBF0DC,#F5DFA0)] flex items-center justify-center flex-shrink-0 text-[18px]">
                ✏️
              </div>
              <div>
                <div className="font-[family-name:var(--font-heading)] font-extrabold text-[length:var(--text-body-lg)] text-[var(--text-primary)] leading-tight">
                  Sửa bài tập
                </div>
                <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] mt-0.5">
                  Chỉnh sửa thông tin bài tập
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] bg-transparent border-none cursor-pointer text-xl transition-colors flex-shrink-0"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Col: Upload */}
            <div className="flex flex-col gap-3">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
                className={`border-2 border-dashed rounded-[var(--radius-md)] p-6 text-center transition-all duration-200 cursor-pointer select-none ${isDragOver ? 'border-[var(--brand-400)] bg-[var(--brand-50)]' : 'border-[var(--border-strong)] bg-[var(--surface-muted)] hover:border-[var(--brand-400)] hover:bg-[var(--brand-50)]'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-100)] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[var(--brand-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <div className="font-[family-name:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)] mb-1">
                  Kéo thả tệp vào đây
                </div>
                <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)] mb-3">
                  hoặc chọn từ thiết bị của bạn
                </div>
                <button type="button" className="px-4 py-1.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-strong)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-primary)] cursor-pointer">
                  Chọn tệp
                </button>
                <div className="text-[11px] text-[var(--text-secondary)] mt-3 opacity-70">
                  PDF, DOCX · tối đa 50MB
                </div>
              </div>

              <div className="bg-[#F8FBF8] rounded-xl p-3 border border-[#E4EBE5]">
                <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.4px] mb-2">
                  Loại file được hỗ trợ
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#E5F0FF] text-[#1A4FA0] font-[family-name:var(--font-heading)] font-bold text-[11px]">PDF</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#E5F6EE] text-[#1A6B3C] font-[family-name:var(--font-heading)] font-bold text-[11px]">DOCX</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFF5E5] text-[#B7791F] font-[family-name:var(--font-heading)] font-bold text-[11px]">XLSX</span>
                </div>
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="flex flex-col gap-3">
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

              <div>
                <label className={labelClass}>Số câu hỏi</label>
                <input type="number" min={1} value={questions} onChange={(e) => setQuestions(parseInt(e.target.value))} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Tiêu đề</label>
                <input type="text" placeholder="Nhập tiêu đề bài tập..." value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Loại file</label>
                <select className={selectClass} value={fileType} onChange={(e) => setFileType(e.target.value)}>
                  <option value="PDF">PDF</option>
                  <option value="DOCX">DOCX</option>
                  <option value="XLSX">XLSX</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 mt-6">
            <div onClick={onClose} className="flex-1 p-3 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors">
              Hủy
            </div>
            <div onClick={handleSaveRequest} className="flex-[2] p-3 rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] text-[var(--text-inverse)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--brand-600)] transition-colors">
              Lưu thay đổi
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận chỉnh sửa"
          message="Bạn có chắc chắn muốn lưu các thay đổi cho bài tập này không?"
          confirmLabel="Lưu"
          variant="warning"
          onConfirm={handleSaveConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
