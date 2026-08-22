import { useState } from 'react'
import type { Review } from '../../../../types/admin'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'

import { useNotification } from '../../../../components/common/NotificationProvider'

type ReviewModalProps = {
  review?: Review
  onSave: (data: Partial<Review>) => void
  onClose: () => void
}

export const ReviewModal = ({ review, onSave, onClose }: ReviewModalProps) => {
  const [name, setName] = useState(review?.name || '')
  const [time, setTime] = useState(review?.time || '')
  const [course, setCourse] = useState(review?.course || 'V-ACT')
  const [comment, setComment] = useState(review?.comment || '')
  const [image, setImage] = useState<string | undefined>(review?.image)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSuccess } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 500))
    onSave({ name, time, course, comment, image })
    showSuccess(review ? "Cập nhật cảm nhận thành công!" : "Thêm cảm nhận thành công!")
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={review ? "Sửa cảm nhận" : "Thêm cảm nhận"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={image} onChange={setImage} id="rev-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Họ và tên</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={mInput} placeholder="Tên học viên" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Thời gian</label>
            <input value={time} onChange={(e) => setTime(e.target.value)} className={mInput} placeholder="Ví dụ: Tháng 06/2025" required />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Khóa học</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)} className={mInput}>
              {["V-ACT", "V-SAT", "HSA", "HSCA", "THPT QG"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className={mLabel}>Bình luận</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className={`${mInput} resize-y min-h-[80px]`} placeholder="Cảm nhận của học viên..." required />
          </div>

          <button type="submit" className={`${mSubmitBtnClass} flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`} disabled={isSubmitting}>
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {review ? "Lưu thay đổi" : "Thêm cảm nhận"}
          </button>
        </form>
      </div>
    </div>
  )
}
