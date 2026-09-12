import { useState } from 'react'
import type { ReviewResponse } from '@/types/api/review.api'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass, Spinner } from './ModalHelpers'
import { useCreateReviewMutation, useUpdateReviewMutation } from '@/hooks/queries/useReviews'
import { useGetAdminCoursesQuery } from '@/hooks/queries/useCourses'
import { useNotification } from '@/components/common/NotificationProvider'

type ReviewModalProps = {
  review?: ReviewResponse
  onSave?: (data: any) => void
  onClose: () => void
}

export const ReviewModal = ({ review, onSave, onClose }: ReviewModalProps) => {
  const isEdit = !!review
  const [studentName, setStudentName] = useState(review?.studentName || '')
  const [timeText, setTimeText] = useState(review?.timeText || '')
  const [courseId, setCourseId] = useState(review?.courseId || '')
  const [comment, setComment] = useState(review?.comment || '')
  const [preview, setPreview] = useState<string | undefined>(review?.avatarUrl)
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined)

  const { data: coursesData } = useGetAdminCoursesQuery({ size: 100 })
  const courses = coursesData?.data || []

  const selectedCourseId = courseId || (courses.length > 0 ? courses[0].id : '')

  const createMutation = useCreateReviewMutation()
  const updateMutation = useUpdateReviewMutation()
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false)
  const isSubmitting = createMutation.isPending || updateMutation.isPending || isLocalSubmitting

  const { showSuccess, showError } = useNotification()

  const handleImageChange = (url: string | undefined, file?: File) => {
    setPreview(url)
    if (file) {
      setAvatarFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentName.trim()) {
      showError('Họ và tên học viên không được để trống')
      return
    }
    if (!selectedCourseId) {
      showError('Vui lòng chọn khóa học')
      return
    }
    if (!timeText.trim()) {
      showError('Thời gian không được để trống')
      return
    }
    if (!comment.trim()) {
      showError('Nội dung cảm nhận không được để trống')
      return
    }

    const start = Date.now()
    const formData = new FormData()
    formData.append('studentName', studentName.trim())
    formData.append('courseId', selectedCourseId)
    formData.append('timeText', timeText.trim())
    formData.append('comment', comment.trim())
    if (avatarFile) {
      formData.append('avatarImage', avatarFile)
    }

    try {
      setIsLocalSubmitting(true)
      if (isEdit && review) {
        await updateMutation.mutateAsync({ id: review.id, data: formData })
      } else {
        await createMutation.mutateAsync(formData)
      }

      if (onSave) {
        onSave({
          studentName,
          courseId: selectedCourseId,
          timeText,
          comment,
          avatarUrl: preview,
        })
      }

      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      showSuccess(isEdit ? 'Cập nhật cảm nhận thành công!' : 'Thêm cảm nhận thành công!')
      onClose()
    } catch (error: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      const errMsg = error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi!'
      showError(errMsg)
    } finally {
      setIsLocalSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={isEdit ? "Sửa cảm nhận" : "Thêm cảm nhận"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={preview} onChange={handleImageChange} id="rev-img-input" />

          <div className="mb-3.5">
            <label className={mLabel}>Họ và tên học viên</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={mInput}
              placeholder="Tên học viên"
              required
            />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Khóa học liên quan</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setCourseId(e.target.value)}
              className={mInput}
              required
            >
              <option value="" disabled>-- Chọn khóa học --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Thời gian</label>
            <input
              value={timeText}
              onChange={(e) => setTimeText(e.target.value)}
              className={mInput}
              placeholder="Ví dụ: Tháng 06/2025"
              required
            />
          </div>

          <div className="mb-5">
            <label className={mLabel}>Nội dung cảm nhận</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`${mInput} resize-y min-h-[80px]`}
              placeholder="Cảm nhận của học viên về khóa học..."
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-[11px] rounded-[var(--radius-md)] font-bold text-sm bg-[var(--surface-500)] text-[var(--text-secondary-600)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${mSubmitBtnClass} flex-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting && <Spinner size="sm" color="white" />}
              {isEdit ? "Lưu thay đổi" : "Thêm cảm nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
