import { useState } from 'react'
import type { TeacherProfileResponse } from '@/types/api/teacher.api'
import { CircularDropzone, ModalHeader, mLabel, mInput, mSubmitBtnClass, Spinner } from './ModalHelpers'
import { useCreateTeacherMutation, useUpdateTeacherMutation } from '@/hooks/queries/useTeachers'
import { useNotification } from '@/components/common/NotificationProvider'

type InstructorModalProps = {
  instructor?: TeacherProfileResponse
  onSave?: (data: any) => void
  onClose: () => void
}

export const InstructorModal = ({ instructor, onSave, onClose }: InstructorModalProps) => {
  const isEdit = !!instructor
  const [name, setName] = useState(instructor?.name || '')
  const [subject, setSubject] = useState(instructor?.subject || '')
  const [description, setDescription] = useState(instructor?.description || '')
  const [preview, setPreview] = useState<string | undefined>(instructor?.avatarUrl)
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined)

  const createMutation = useCreateTeacherMutation()
  const updateMutation = useUpdateTeacherMutation()
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

    if (!name.trim()) {
      showError('Tên giảng viên không được để trống')
      return
    }
    if (!subject.trim()) {
      showError('Môn học không được để trống')
      return
    }
    if (!description.trim()) {
      showError('Mô tả không được để trống')
      return
    }

    const start = Date.now()
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('subject', subject.trim())
    formData.append('description', description.trim())
    if (avatarFile) {
      formData.append('avatarImage', avatarFile)
    }

    try {
      setIsLocalSubmitting(true)
      if (isEdit && instructor) {
        await updateMutation.mutateAsync({ id: instructor.id, data: formData })
      } else {
        await createMutation.mutateAsync(formData)
      }

      if (onSave) {
        onSave({ name, subject, description, avatarUrl: preview })
      }

      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed))

      showSuccess(isEdit ? 'Cập nhật giảng viên thành công!' : 'Thêm giảng viên thành công!')
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
        <ModalHeader title={isEdit ? "Sửa thông tin giảng viên" : "Thêm giảng viên"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <CircularDropzone preview={preview} onChange={handleImageChange} id="instr-img-input" />

          <div className="mb-3.5">
            <label className={mLabel}>Tên giảng viên</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={mInput}
              placeholder="Ví dụ: Th.S Nguyễn Văn An"
              required
            />
          </div>

          <div className="mb-3.5">
            <label className={mLabel}>Môn học phụ trách</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={mInput}
              placeholder="Ví dụ: TOÁN HỌC, VẬT LÝ..."
              required
            />
          </div>

          <div className="mb-5">
            <label className={mLabel}>Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${mInput} resize-y min-h-[80px]`}
              placeholder="Giới thiệu ngắn về giảng viên..."
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
              {isEdit ? "Lưu thay đổi" : "Thêm giảng viên"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
