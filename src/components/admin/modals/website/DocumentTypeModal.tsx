import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { ModalHeader, mLabel, mInput, mSubmitBtnClass } from './ModalHelpers'
import type { BadgeResponse, BadgeRequest } from '../../../../types/api/badge.api'
import { useCreateBadgeMutation, useUpdateBadgeMutation } from '../../../../hooks/queries/useBadges'
import { useNotification } from '../../../../components/common/NotificationProvider'

const Spinner = () => (
  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" />
)

type DocumentTypeModalProps = {
  docType?: BadgeResponse
  onClose: () => void
}

export const DocumentTypeModal = ({ docType, onClose }: DocumentTypeModalProps) => {
  const isEdit = !!docType
  const [name, setName] = useState(docType?.name || '')
  
  const createMutation = useCreateBadgeMutation()
  const updateMutation = useUpdateBadgeMutation()
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false)
  const isSubmitting = createMutation.isPending || updateMutation.isPending || isLocalSubmitting
  
  const { showSuccess, showError } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      showError('Tên loại tài liệu không được để trống')
      return
    }

    const start = Date.now()
    const payload: BadgeRequest = { name: name.trim() }

    try {
      setIsLocalSubmitting(true)
      if (isEdit && docType) {
        await updateMutation.mutateAsync({ id: docType.id, data: payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      
      showSuccess(isEdit ? 'Cập nhật loại tài liệu thành công!' : 'Thêm loại tài liệu thành công!')
      onClose()
    } catch (error: any) {
      const elapsed = Date.now() - start
      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))
      
      let errMsg = error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi!'
      if (errMsg.toLowerCase().includes('already exists')) {
        errMsg = 'Loại tài liệu này đã tồn tại'
      }
      showError(errMsg)
    } finally {
      setIsLocalSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-[var(--radius-xl)] p-7 w-full max-w-[560px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={isEdit ? "Sửa loại tài liệu" : "Thêm loại tài liệu"} onClose={onClose} />
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className={mLabel}>Tên loại tài liệu</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={mInput} placeholder="VD: Lý thuyết, Bài tập..." required />
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} disabled={isSubmitting}
              className="flex-1 py-[11px] rounded-[var(--radius-md)] font-bold text-sm bg-[var(--surface-500)] text-[var(--text-secondary-600)] hover:bg-[var(--surface-600)] hover:text-[var(--text-primary)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
              Hủy
            </button>
            <button type="submit" disabled={isSubmitting}
              className={`${mSubmitBtnClass} flex-1 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}>
              {isSubmitting && <Spinner />}
              {isEdit ? "Lưu thay đổi" : "Thêm loại tài liệu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
