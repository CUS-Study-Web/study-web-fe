import { useState } from 'react'
import { useCreateAssistantMutation } from '../../../../hooks/queries/useSystemAssistants'

type CreateAssistantModalProps = {
  onClose: () => void
}

export const CreateAssistantModal = ({ onClose }: CreateAssistantModalProps) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')
  const createMutation = useCreateAssistantMutation()

  const handleClose = () => {
    setErr('')
    onClose()
  }

  const handleInputChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }))
    setErr('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setErr('Vui lòng nhập họ và tên.')
      return
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErr('Email không hợp lệ.')
      return
    }
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      setErr('Số điện thoại phải để trống hoặc gồm đúng 10 chữ số.')
      return
    }
    if (!form.password.trim()) {
      setErr('Vui lòng nhập mật khẩu.')
      return
    }
    createMutation.mutate({
      name: form.name,
      gmail: form.email,
      phone: form.phone || undefined,
      password: form.password
    }, {
      onSuccess: () => {
        handleClose();
      }
    })
  }

  const inputClass = "w-full px-3.5 py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-sm text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)]"
  const labelClass = "block [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary-600)] mb-1.5"

  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[var(--radius-xl)] w-full max-w-[460px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Green Gradient */}
        <div className="bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] px-7 py-6">
          <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-white">
            Tạo tài khoản Trợ giảng
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-7 py-6 flex flex-col gap-4">
          <div>
            <label className={labelClass}>Họ và tên</label>
            <input value={form.name} onChange={handleInputChange('name')} placeholder="Nguyễn Văn A" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={handleInputChange('email')} placeholder="trugiang@cus.edu.vn" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Số điện thoại (tùy chọn)</label>
            <input value={form.phone} onChange={handleInputChange('phone')} placeholder="09xx xxx xxx" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Mật khẩu mặc định</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={handleInputChange('password')} placeholder="Nhập mật khẩu tạm thời..." className={`${inputClass} pr-[40px]`} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-transparent border-none p-[4px] cursor-pointer text-[var(--text-secondary-400)] hover:text-[var(--text-primary)] flex items-center justify-center"
              >
                {showPassword ? (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                ) : (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          {err && (
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--error-50)] border border-[var(--error-200)]">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className="shrink-0 text-[var(--error-500)]">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10 6v4.5M10 13.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="[font-family:var(--font-body)] text-[13px] text-[var(--error-600)] flex-1">{err}</span>
              <button
                type="button"
                onClick={() => setErr('')}
                className="bg-transparent border-none cursor-pointer text-[var(--error-400)] hover:text-[var(--error-600)] p-0 leading-none text-[16px]"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex gap-2.5 justify-end pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="![font-family:var(--font-heading)] !font-semibold !text-[13px] px-5 py-[9px] rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white !text-[var(--text-secondary-600)] cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="![font-family:var(--font-heading)] !font-bold !text-[13px] px-[22px] py-[9px] border border-transparent rounded-[var(--radius-sm)] bg-[var(--brand-500)] !text-white cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)] disabled:opacity-50"
            >
              {createMutation.isPending ? 'Đang tạo...' : 'Tạo tài khoản'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
