import { useState } from 'react'
import type { Assistant } from '../../../../types/admin'

type CreateAssistantModalProps = {
  onClose: () => void
  onCreate: (assistant: Assistant) => void
}

export const CreateAssistantModal = ({ onClose, onCreate }: CreateAssistantModalProps) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [err, setErr] = useState('')

  const handleInputChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }))
    setErr('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password.trim()) {
      setErr('Vui lòng điền đầy đủ thông tin.')
      return
    }
    const newA: Assistant = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      joined: new Date().toLocaleDateString('vi-VN'),
      courses: 0,
      exams: 0,
      students: 0,
      lastActive: 'Chưa đăng nhập',
      status: 'Hoạt động'
    }
    onCreate(newA)
    onClose()
  }

  const inputClass = "w-full px-3.5 py-[11px] rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-sm text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)]"
  const labelClass = "block [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary-600)] mb-1.5"

  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={onClose}
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

        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
          <div>
            <label className={labelClass}>Họ và tên</label>
            <input value={form.name} onChange={handleInputChange('name')} placeholder="Nguyễn Văn A" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={handleInputChange('email')} placeholder="trugiang@cus.edu.vn" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Số điện thoại</label>
            <input value={form.phone} onChange={handleInputChange('phone')} placeholder="09xx xxx xxx" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Mật khẩu mặc định</label>
            <input type="password" value={form.password} onChange={handleInputChange('password')} placeholder="Nhập mật khẩu tạm thời..." className={inputClass} required />
          </div>

          {err && (
            <div className="[font-family:var(--font-body)] text-[13px] text-[var(--error-500)]">
              {err}
            </div>
          )}

          <div className="flex gap-2.5 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="![font-family:var(--font-heading)] !font-semibold !text-[13px] px-5 py-[9px] rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white !text-[var(--text-secondary-600)] cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="![font-family:var(--font-heading)] !font-bold !text-[13px] px-[22px] py-[9px] border border-transparent rounded-[var(--radius-sm)] bg-[var(--brand-500)] !text-white cursor-pointer hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
