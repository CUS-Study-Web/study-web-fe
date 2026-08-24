import { useState } from 'react'
import { mInput } from './ModalHelpers'
import { useNotification } from '../../../common/NotificationProvider'
import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useGetCourseDetailQuery,
} from '../../../../hooks/queries/useCourses'

// ─── Shared Spinner ───────────────────────────────────────────────────────────

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-white inline-block"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// ─── Backdrop wrapper ──────────────────────────────────────────────────────────

const MiniModalBackdrop = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center"
    style={{ background: 'rgba(0,0,0,0.35)' }}
    onClick={onClose}
  >
    <div
      className="bg-white rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] p-6 w-full max-w-[380px] mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
)

const miniTitle = '[font-family:var(--font-heading)] font-extrabold text-[16px] text-[var(--text-primary)] mb-1'
const miniSub = '[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)] mb-5'
const btnBase = 'flex-1 py-[10px] rounded-[var(--radius-md)] font-bold text-[13px] [font-family:var(--font-heading)] cursor-pointer border-none transition-colors duration-[var(--motion-fast)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'

// ─── Generic Confirm Modal ───────────────────────────────────────────────────

export type ConfirmMiniModalProps = {
  title: string
  message: React.ReactNode
  confirmText?: string
  cancelText?: string
  hideCancel?: boolean
  isDanger?: boolean
  isSubmitting?: boolean
  onConfirm: () => void
  onClose: () => void
}

export const ConfirmMiniModal = ({
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  hideCancel = false,
  isDanger,
  isSubmitting,
  onConfirm,
  onClose
}: ConfirmMiniModalProps) => {
  return (
    <MiniModalBackdrop onClose={onClose}>
      <p className={miniTitle}>{title}</p>
      <div className={miniSub}>{message}</div>
      <div className="flex gap-3">
        {!hideCancel && (
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className={`${btnBase} !bg-[var(--surface-500)] !text-[var(--text-secondary-600)] !hover:bg-[var(--surface-600)]`}
          >
            {cancelText}
          </button>
        )}
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className={`${btnBase} ${isDanger ? '!bg-[var(--error-500)] !hover:bg-[var(--error-600)]' : '!bg-[var(--brand-500)] !hover:bg-[var(--brand-600)]'} !text-white`}
        >
          {isSubmitting && <Spinner />}
          {confirmText}
        </button>
      </div>
    </MiniModalBackdrop>
  )
}

// ─── 1. Confirm Update Modal ──────────────────────────────────────────────────

type ConfirmUpdateProps = {
  courseId: string
  subjectId: string
  newTitle: string
  newDuration: number
  onClose: () => void
}

export const ConfirmUpdateSubjectModal = ({ courseId, subjectId, newTitle, newDuration, onClose }: ConfirmUpdateProps) => {
  const { showSuccess, showError } = useNotification()
  const updateSubject = useUpdateSubjectMutation()
  const { data: detailData } = useGetCourseDetailQuery(courseId)
  const existingSubjects = detailData?.data?.subjects || []
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false)

  const handleConfirm = async () => {
    const isDuplicate = existingSubjects.some(s => s.id !== subjectId && s.name.toLowerCase() === newTitle.trim().toLowerCase())
    if (isDuplicate) {
      setShowDuplicateAlert(true)
      return
    }

    setIsSubmitting(true)
    const start = Date.now()
    try {
      await updateSubject.mutateAsync({
        courseId,
        subjectId,
        data: { title: newTitle, maxScores: 0, durationHour: newDuration },
      })
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showSuccess('Cập nhật môn học thành công!')
      onClose()
    } catch (err: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showError(err?.response?.data?.message || 'Cập nhật môn học thất bại!')
      setIsSubmitting(false)
    }
  }

  return (
    <MiniModalBackdrop onClose={onClose}>
      <p className={miniTitle}>Xác nhận cập nhật môn học</p>
      <p className={miniSub}>
        Lưu thay đổi cho môn <strong>"{newTitle}"</strong> với thời lượng <strong>{newDuration} giờ</strong>?
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className={`${btnBase} !bg-[var(--surface-500)] !text-[var(--text-secondary-600)] !hover:bg-[var(--surface-600)]`}
        >
          Hủy
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className={`${btnBase} !bg-[var(--brand-500)] !text-white !hover:bg-[var(--brand-600)]`}
        >
          {isSubmitting && <Spinner />}
          Xác nhận
        </button>
      </div>

      {showDuplicateAlert && (
        <ConfirmMiniModal
          title="Tên môn học đã tồn tại"
          message={<span>Môn học <strong>"{newTitle}"</strong> đã tồn tại trong khóa học này. Vui lòng chọn tên khác.</span>}
          confirmText="Đóng"
          hideCancel
          onConfirm={() => setShowDuplicateAlert(false)}
          onClose={() => setShowDuplicateAlert(false)}
        />
      )}
    </MiniModalBackdrop>
  )
}

// ─── 2. Confirm Delete Modal ──────────────────────────────────────────────────

type ConfirmDeleteProps = {
  courseId: string
  subjectId: string
  subjectName: string
  onClose: () => void
}

export const ConfirmDeleteSubjectModal = ({ courseId, subjectId, subjectName, onClose }: ConfirmDeleteProps) => {
  const { showSuccess, showError } = useNotification()
  const deleteSubject = useDeleteSubjectMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    const start = Date.now()
    try {
      await deleteSubject.mutateAsync({ courseId, subjectId })
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showSuccess('Xóa môn học thành công!')
      onClose()
    } catch (err: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showError(err?.response?.data?.message || 'Xóa môn học thất bại!')
      setIsSubmitting(false)
    }
  }

  return (
    <MiniModalBackdrop onClose={onClose}>
      <p className={miniTitle}>Xác nhận xóa môn học</p>
      <p className={miniSub}>
        Bạn có chắc muốn xóa môn <strong>"{subjectName}"</strong>? Hành động này không thể hoàn tác.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className={`${btnBase} !bg-[var(--surface-500)] !text-[var(--text-secondary-600)] !hover:bg-[var(--surface-600)]`}
        >
          Hủy
        </button>
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className={`${btnBase} !bg-[var(--error-500)] !text-white !hover:bg-[var(--error-600)]`}
        >
          {isSubmitting && <Spinner />}
          Xóa môn học
        </button>
      </div>
    </MiniModalBackdrop>
  )
}

// ─── 3. Add New Subject Modal ─────────────────────────────────────────────────

type AddSubjectProps = {
  courseId: string
  onClose: () => void
}

export const AddSubjectModal = ({ courseId, onClose }: AddSubjectProps) => {
  const { showSuccess, showError } = useNotification()
  const createSubject = useCreateSubjectMutation()
  const { data: detailData } = useGetCourseDetailQuery(courseId)
  const existingSubjects = detailData?.data?.subjects || []
  const [title, setTitle] = useState('')
  const [durationHour, setDurationHour] = useState<number | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isDuplicate = existingSubjects.some(s => s.name.toLowerCase() === title.trim().toLowerCase())
    if (isDuplicate) {
      setShowDuplicateAlert(true)
      return
    }

    if (!title.trim()) return
    setIsSubmitting(true)
    const start = Date.now()
    try {
      await createSubject.mutateAsync({
        courseId,
        data: { title: title.trim(), maxScores: 0, durationHour: Number(durationHour) || 0 },
      })
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showSuccess('Thêm môn học thành công!')
      onClose()
    } catch (err: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showError(err?.response?.data?.message || 'Thêm môn học thất bại!')
      setIsSubmitting(false)
    }
  }

  return (
    <MiniModalBackdrop onClose={onClose}>
      <p className={miniTitle}>Thêm môn học mới</p>
      <p className={miniSub}>Điền thông tin cho môn học mới trong khóa học này.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block [font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-primary)] mb-1.5">
            Tên môn học <span className="text-[var(--error-500)]">*</span>
          </label>
          <input
            className={mInput}
            placeholder="VD: Toán, Lý, Hóa..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-5">
          <label className="block [font-family:var(--font-heading)] font-bold text-[12px] text-[var(--text-primary)] mb-1.5">
            Thời lượng dự kiến (giờ)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            className={mInput}
            placeholder="VD: 30"
            value={durationHour}
            onChange={(e) => setDurationHour(e.target.value === '' ? '' : parseFloat(e.target.value))}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className={`${btnBase} !bg-[var(--surface-500)] !text-[var(--text-secondary-600)] !hover:bg-[var(--surface-600)]`}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className={`${btnBase} !bg-[var(--brand-500)] !text-white hover:bg-[var(--brand-600)]`}
          >
            {isSubmitting && <Spinner />}
            Thêm môn học
          </button>
        </div>
      </form>

      {showDuplicateAlert && (
        <ConfirmMiniModal
          title="Tên môn học đã tồn tại"
          message={<span>Môn học <strong>"{title}"</strong> đã tồn tại trong khóa học này. Vui lòng chọn tên khác.</span>}
          confirmText="Đóng"
          hideCancel
          onConfirm={() => setShowDuplicateAlert(false)}
          onClose={() => setShowDuplicateAlert(false)}
        />
      )}
    </MiniModalBackdrop>
  )
}
