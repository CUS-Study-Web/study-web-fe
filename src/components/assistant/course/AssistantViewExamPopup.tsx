import { useState } from 'react';
import AssistantFeatureInDevPopup from '../AssistantFeatureInDevPopup';
import type { CourseExam } from '../../../types/assistant/models';

interface AssistantViewExamPopupProps {
  exam: CourseExam;
  onClose: () => void;
}

export default function AssistantViewExamPopup({ exam, onClose }: AssistantViewExamPopupProps) {
  const [showDevPopup, setShowDevPopup] = useState(false);

  const labelClass = 'font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] uppercase tracking-[0.4px]';
  const valueClass = 'font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)] mt-1';

  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] p-7 w-full max-w-[660px] max-h-[92vh] flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4.5">
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[17px] text-[var(--text-primary)]">
            Xem đề thi
          </div>
          <div
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] bg-transparent border-none cursor-pointer text-xl transition-colors"
          >
            ×
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 mb-4.5">
          <div>
            <div className={labelClass}>Tên đề thi</div>
            <div className={valueClass}>{exam.title}</div>
          </div>
          <div>
            <div className={labelClass}>Khóa học</div>
            <div className={valueClass}>{exam.courseKey}</div>
          </div>
          <div>
            <div className={labelClass}>Số câu</div>
            <div className={valueClass}>{exam.questions} câu</div>
          </div>
          <div>
            <div className={labelClass}>Thời gian</div>
            <div className={valueClass}>{exam.duration} phút</div>
          </div>
          <div>
            <div className={labelClass}>Ngày đăng</div>
            <div className={valueClass}>{exam.date}</div>
          </div>
          <div>
            <div className={labelClass}>Trạng thái</div>
            <div className={valueClass}>{exam.status === 'published' ? 'Đã xuất bản' : 'Nháp'}</div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-[#F4F7F4] rounded-xl flex flex-col items-center justify-center gap-2.5 min-h-[260px] border-[1.5px] border-[#E4EBE5]">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#A0AAA2" strokeWidth="1.5" />
            <polyline points="14 2 14 8 20 8" stroke="#A0AAA2" strokeWidth="1.5" />
            <line x1="16" y1="13" x2="8" y2="13" stroke="#A0AAA2" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="17" x2="8" y2="17" stroke="#A0AAA2" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
            Xem trước tài liệu đề thi
          </div>
          <div className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)]">
            {exam.title}.pdf
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-5">
          <div onClick={onClose} className="flex-1 p-3 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer text-center hover:bg-[var(--surface-muted)] transition-colors">
            Đóng
          </div>
          <div onClick={() => setShowDevPopup(true)} className="flex-[2] p-3 rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] text-[var(--text-inverse)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer text-center hover:bg-[var(--brand-600)] transition-colors">
            Tải về
          </div>
        </div>
      </div>

      {showDevPopup && (
        <AssistantFeatureInDevPopup onClose={() => setShowDevPopup(false)} />
      )}
    </div>
  );
}
