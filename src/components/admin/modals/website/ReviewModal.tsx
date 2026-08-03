import { useState } from 'react'
import type { Review } from '../../../../types/admin'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, time, course, comment, image })
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

          <button type="submit" className={mSubmitBtnClass}>
            {review ? "Lưu thay đổi" : "Thêm cảm nhận"}
          </button>
        </form>
      </div>
    </div>
  )
}
