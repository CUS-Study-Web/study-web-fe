import { useState } from 'react';
import AssistantConfirmPopup from '../AssistantConfirmPopup';
import { useUpdateLessonMutation } from '../../../hooks/queries/useLessons';
import { useNotification } from '../../common/NotificationProvider';

interface AssistantEditLecturePopupProps {
  courseKey: string;
  courseName: string;
  subjectId: string;
  subjectName: string;
  lecture: {
    id: string;
    title: string;
    link: string;
    durationMin: number;
    orderNum: number;
  };
  existingLessons?: any[];
  onClose: () => void;
}

import { isValidUrl } from '../../../utils/urlUtils';

export default function AssistantEditLecturePopup({
  courseKey,
  courseName,
  subjectId,
  subjectName,
  lecture,
  existingLessons = [],
  onClose,
}: AssistantEditLecturePopupProps) {
  const [title, setTitle] = useState(lecture.title);
  const [link, setLink] = useState(lecture.link);
  const [durationMin, setDurationMin] = useState(lecture.durationMin);
  const [orderNum, setOrderNum] = useState(lecture.orderNum);

  const [showConfirm, setShowConfirm] = useState(false);

  const { showSuccess, showError } = useNotification();
  const updateMutation = useUpdateLessonMutation();

  const handleSaveRequest = () => {
    if (!title || !link) {
      showError('Vui lòng nhập đầy đủ tiêu đề và link!');
      return;
    }
    if (!isValidUrl(link)) {
      showError('Đường link không hợp lệ!');
      return;
    }
    if (orderNum <= 0 || orderNum > 100) {
      showError('Số thứ tự phải từ 1 đến 100!');
      return;
    }
    const isDuplicateOrder = existingLessons.some(l => l.id !== lecture.id && l.orderNum === orderNum);
    if (isDuplicateOrder) {
      showError(`Số thứ tự ${orderNum} đã bị trùng với bài giảng khác!`);
      return;
    }
    setShowConfirm(true);
  };

  const handleSaveConfirm = () => {
    setShowConfirm(false);
    updateMutation.mutate(
      {
        courseId: courseKey,
        subjectId,
        lessonId: lecture.id,
        data: {
          title,
          youtubeUrl: link,
          durationMin,
          orderNum,
          access: 'PUBLIC',
        },
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            showSuccess('Cập nhật bài giảng thành công!');
            onClose();
          }, 500);
        },
        onError: () => {
          setTimeout(() => {
            showError('Đã xảy ra lỗi khi cập nhật bài giảng!');
          }, 500);
        },
      }
    );
  };

  return (
    <>
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
                ✏️
              </div>
              <div>
                <div className="font-[family-name:var(--font-heading)] font-bold text-[16px] text-[var(--text-primary)]">
                  Sửa bài giảng
                </div>
                <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)]">
                  Chỉnh sửa thông tin bài giảng
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
                  {courseName || courseKey}
                </span>
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Môn học
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[8px] bg-[var(--surface-muted)] border border-[var(--border-default)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-tertiary)] shrink-0">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                  {subjectName}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Thời lượng */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Thời lượng (phút)
              </div>
              <input
                type="number"
                min={1}
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)] transition-colors"
              />
            </div>
            {/* Số thứ tự */}
            <div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[11px] uppercase tracking-wide text-[var(--text-secondary)] mb-1.5">
                Số thứ tự
              </div>
              <input
                type="number"
                min={1}
                value={orderNum}
                onChange={(e) => setOrderNum(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--brand-500)] transition-colors"
              />
            </div>
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
            <button
              type="button"
              onClick={onClose}
              className="!flex-1 !py-2.5 !rounded-[8px] !border !border-[var(--border-default)] !text-center !font-[family-name:var(--font-heading)] !font-semibold !text-[14px] !text-[var(--text-primary)] !cursor-pointer hover:!bg-[var(--surface-muted)] !transition-colors !select-none"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSaveRequest}
              disabled={updateMutation.isPending}
              className="!flex-[2] !py-2.5 !rounded-[8px] !bg-[var(--brand-500)] hover:!bg-[var(--brand-600)] disabled:!bg-[var(--brand-500)]/70 !text-center !font-[family-name:var(--font-heading)] !font-semibold !text-[14px] !text-white !cursor-pointer !transition-colors !select-none"
            >
              {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <AssistantConfirmPopup
          title="Xác nhận chỉnh sửa"
          message="Bạn có chắc chắn muốn lưu các thay đổi cho bài giảng này không?"
          confirmLabel={updateMutation.isPending ? "Đang lưu..." : "Lưu"}
          variant="warning"
          onConfirm={handleSaveConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
