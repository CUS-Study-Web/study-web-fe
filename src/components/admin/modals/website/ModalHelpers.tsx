import { User, Upload } from 'lucide-react'
import { useNotification } from '@/components/common/NotificationProvider'
import { validateImageFile } from '@/utils/fileUtils'

export const CircularDropzone = ({ preview, onChange, id }: { preview: string | undefined; onChange: (url: string | undefined, file?: File) => void; id: string }) => {
  const { showError } = useNotification()
  return (
    <div className="flex justify-center mb-[22px]">
      <div
        className="w-24 h-24 rounded-full border-2 border-dashed border-[var(--border-600)] bg-[var(--surface-500)] cursor-pointer overflow-hidden flex items-center justify-center relative hover:bg-[var(--surface-600)] transition-colors duration-140"
        onClick={() => document.getElementById(id)?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <User size={28} className="text-[var(--text-secondary-300)]" strokeWidth={2} />
        )}
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) {
              try {
                validateImageFile(f)
                onChange(URL.createObjectURL(f), f)
              } catch (err: any) {
                showError(err.message)
              }
            }
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}

export const RectDropzone = ({ preview, onChange, id }: { preview: string | undefined; onChange: (url: string | undefined, file?: File) => void; id: string }) => {
  const { showError } = useNotification()
  return (
    <div
      className="border-2 border-dashed border-[var(--border-600)] rounded-[var(--radius-md)] p-7 text-center mb-5 cursor-pointer bg-[var(--surface-500)] hover:bg-[var(--surface-600)] transition-colors duration-140"
      onClick={() => document.getElementById(id)?.click()}
    >
      {preview ? (
        <img src={preview} alt="preview" className="max-h-[120px] rounded-[var(--radius-sm)] mx-auto object-cover" />
      ) : (
        <>
          <Upload size={36} className="mx-auto mb-2 text-[var(--text-secondary-300)]" strokeWidth={2} />
          <div className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
            Kéo thả hoặc <span className="text-[var(--brand-500)] font-semibold">chọn ảnh đại diện</span>
            <div className="text-[11px] mt-1 opacity-80">(Tối đa 10MB)</div>
          </div>
        </>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) {
            try {
              validateImageFile(f)
              onChange(URL.createObjectURL(f), f)
            } catch (err: any) {
              showError(err.message)
            }
          }
          e.target.value = ''
        }}
      />
    </div>
  )
}

export const ModalHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-[var(--text-primary)]">
        {title}
      </div>
      <div
        onClick={onClose}
        className="bg-transparent border-none cursor-pointer text-[22px] text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] outline-none"
      >
        ×
      </div>
    </div>
  )
}

export const mLabel = "block ![font-family:var(--font-heading)] !font-bold !text-[13px] !text-[var(--text-primary)] mb-1.5"
export const mInput = "w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)]"
export const mSubmitBtnClass = "w-full py-3 rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer mt-1.5 hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"

export { Spinner } from '@/components/Loading'
