import { useState } from 'react'
import type { Instructor } from '../../../../types/admin'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'

import { useNotification } from '../../../../components/common/NotificationProvider'

type InstructorModalProps = {
  instructor?: Instructor
  onSave: (data: Partial<Instructor>) => void
  onClose: () => void
}

export const InstructorModal = ({ instructor, onSave, onClose }: InstructorModalProps) => {
  const [name, setName] = useState(instructor?.name || '')
  const [bio, setBio] = useState(instructor?.bio || '')
  const [image, setImage] = useState<string | undefined>(instructor?.image)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showSuccess } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 500))
    onSave({ name, bio, image })
    showSuccess(instructor ? "Cập nhật giảng viên thành công!" : "Thêm giảng viên thành công!")
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={instructor ? "Sửa thông tin giảng viên" : "Thêm giảng viên"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={image} onChange={setImage} id="instr-img-input" />
          
          <div className="mb-3.5">
            <label className={mLabel}>Tên giảng viên</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={mInput} placeholder="Ví dụ: Th.S Nguyễn Văn An" required />
          </div>

          <div className="mb-5">
            <label className={mLabel}>Mô tả</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className={`${mInput} resize-y min-h-[80px]`} placeholder="Giới thiệu ngắn về giảng viên..." required />
          </div>

          <button type="submit" className={`${mSubmitBtnClass} flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`} disabled={isSubmitting}>
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {instructor ? "Lưu thay đổi" : "Thêm giảng viên"}
          </button>
        </form>
      </div>
    </div>
  )
}
