import { useState } from 'react'
import type { Instructor } from '../../../../types/admin'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'

type InstructorModalProps = {
  instructor?: Instructor
  onSave: (data: Partial<Instructor>) => void
  onClose: () => void
}

export const InstructorModal = ({ instructor, onSave, onClose }: InstructorModalProps) => {
  const [name, setName] = useState(instructor?.name || '')
  const [bio, setBio] = useState(instructor?.bio || '')
  const [image, setImage] = useState<string | undefined>(instructor?.image)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, bio, image })
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

          <button type="submit" className={mSubmitBtnClass}>
            {instructor ? "Lưu thay đổi" : "Thêm giảng viên"}
          </button>
        </form>
      </div>
    </div>
  )
}
