import { useState } from 'react'
import { RectDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'
import { validateImageFile } from '../../../../utils/fileUtils'
import { useNotification } from '../../../../components/common/NotificationProvider'
import { useCreateCourseMutation, useGetAdminCoursesQuery } from '../../../../hooks/queries/useCourses'
import { ConfirmMiniModal } from './ConfirmMiniModal'

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

type AddCourseModalProps = {
  onClose: () => void
}

export const AddCourseModal = ({ onClose }: AddCourseModalProps) => {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [badgeTitle, setBadgeTitle] = useState('')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISH'>('DRAFT')
  const [description, setDescription] = useState('')
  const [previewImage, setPreviewImage] = useState<string | undefined>()
  const [thumbnailImage, setThumbnailImage] = useState<File | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false)

  const { showSuccess, showError } = useNotification()
  const createCourse = useCreateCourseMutation()
  const { data: coursesData } = useGetAdminCoursesQuery({ size: 100 })
  const existingCourses = coursesData?.data || []

  const handleImageChange = (url: string | undefined, file?: File) => {
    if (file) {
      try {
        validateImageFile(file)
        setThumbnailImage(file)
        setPreviewImage(url)
      } catch (err: any) {
        showError(err.message)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isDuplicate = existingCourses.some(c => c.title.toLowerCase() === title.trim().toLowerCase())
    if (isDuplicate) {
      setShowDuplicateAlert(true)
      return
    }

    setIsSubmitting(true)
    const start = Date.now()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('badgeTitle', badgeTitle)
    formData.append('status', status)
    formData.append('description', description)
    if (thumbnailImage) formData.append('thumbnailImage', thumbnailImage)

    try {
      await createCourse.mutateAsync(formData)
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showSuccess('Thêm khóa học thành công!')
      onClose()
    } catch (err: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))
      showError(err?.response?.data?.message || err?.message || 'Đã xảy ra lỗi!')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[560px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title="Thêm khóa học" onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <RectDropzone preview={previewImage} onChange={handleImageChange} id="add-course-img-input" />

          <div className="mb-3.5">
            <label className={mLabel}>Tiêu đề chính</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={mInput} placeholder="VD: V-ACT" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Tiêu đề phụ</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={mInput} placeholder="VD: Luyện thi ACT theo chuẩn Mỹ" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Nhãn dán (Badge)</label>
            <input value={badgeTitle} onChange={(e) => setBadgeTitle(e.target.value)} className={mInput} placeholder="VD: Dành cho học sinh cấp 3" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Trạng thái</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISH')} className={mInput}>
              <option value="DRAFT">Bản nháp (DRAFT)</option>
              <option value="PUBLISH">Công khai (PUBLISH)</option>
            </select>
          </div>

          <div className="mb-5">
            <label className={mLabel}>Mô tả khóa học</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${mInput} resize-y min-h-[72px]`} placeholder="Mô tả ngắn về khóa học..." required />
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} disabled={isSubmitting}
              className="flex-1 py-[11px] rounded-[var(--radius-md)] font-bold text-sm bg-[var(--surface-500)] text-[var(--text-secondary-600)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
              Hủy
            </button>
            <button type="submit" disabled={isSubmitting}
              className={`${mSubmitBtnClass} flex-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}>
              {isSubmitting && <Spinner />}
              Thêm khóa học
            </button>
          </div>
        </form>
      </div>

      {showDuplicateAlert && (
        <ConfirmMiniModal
          title="Tên khóa học đã tồn tại"
          message={<span>Khóa học <strong>"{title}"</strong> đã tồn tại. Vui lòng chọn tên khác.</span>}
          confirmText="Đóng"
          hideCancel
          onConfirm={() => setShowDuplicateAlert(false)}
          onClose={() => setShowDuplicateAlert(false)}
        />
      )}
    </div>
  )
}
