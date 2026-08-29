import { useState } from 'react'
import { useCreateVipAccountMutation } from '../../../../hooks/queries/useSystemLearners'
import type { CreateVipAccountRequest } from '../../../../types/api/system.api'

type CreateVipModalProps = {
  onClose: () => void
}

export const CreateVipModal = ({ onClose }: CreateVipModalProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [note, setNote] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')

  const createMutation = useCreateVipAccountMutation()

  const clearErr = () => setErr('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setErr('Vui lòng nhập họ và tên.')
      return
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Email không hợp lệ.')
      return
    }
    if (!startDate) {
      setErr('Vui lòng chọn ngày bắt đầu VIP.')
      return
    }
    if (!endDate) {
      setErr('Vui lòng chọn ngày kết thúc VIP.')
      return
    }
    if (endDate <= startDate) {
      setErr('Ngày kết thúc phải sau ngày bắt đầu.')
      return
    }

    const req: CreateVipAccountRequest = {
      name,
      gmail: email,
      startDate,
      endDate,
      note: note || undefined,
      password: password || undefined
    }

    createMutation.mutate(req, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)] transition-colors"
  const labelClass = "block [font-family:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)] mb-1.5"

  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-[var(--radius-xl)] px-7 py-8 w-full max-w-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-[22px]">
          <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-[var(--text-primary)]">
            ⭐ Tạo tài khoản VIP
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-[22px] text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] leading-none"
          >
            ×
          </button>
        </div>

        {/* Inline error banner */}
        {err && (
          <div className="flex items-center gap-2.5 mb-4 px-3.5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--error-50)] border border-[var(--error-200)]">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className="shrink-0 text-[var(--error-500)]">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10 6v4.5M10 13.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="[font-family:var(--font-body)] text-[13px] text-[var(--error-600)] flex-1">{err}</span>
            <button
              type="button"
              onClick={clearErr}
              className="bg-transparent border-none cursor-pointer text-[var(--error-400)] hover:text-[var(--error-600)] p-0 leading-none text-[16px]"
            >
              ×
            </button>
          </div>
        )}

        <div className="mb-3.5">
          <label className={labelClass}>Họ và tên</label>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); clearErr() }}
            className={inputClass}
            placeholder="Tên học viên"
          />
        </div>

        <div className="mb-3.5">
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearErr() }}
            className={inputClass}
            placeholder="email@example.com"
          />
        </div>

        <div className="mb-3.5">
          <label className={labelClass}>Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-[40px]`}
              placeholder="Để trống nếu không đặt"
            />
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

        <div className="grid grid-cols-2 gap-3 mb-3.5">
          <div>
            <label className={labelClass}>Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); clearErr() }}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Ngày kết thúc</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => { setEndDate(e.target.value); clearErr() }}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-[22px]">
          <label className={labelClass}>Ghi chú</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`${inputClass} resize-y min-h-[72px]`}
            placeholder="Ghi chú thêm (không bắt buộc)..."
          />
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-[11px] rounded-[var(--radius-sm)] border !border-[var(--border-500)] bg-white !text-[var(--text-secondary-600)] ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex-[2] py-[11px] rounded-[var(--radius-sm)] border-none bg-[var(--warning-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--warning-600)] transition-colors duration-[var(--motion-fast)] disabled:opacity-50"
          >
            {createMutation.isPending ? 'Đang tạo...' : 'Tạo tài khoản VIP'}
          </button>
        </div>
      </form>
    </div>
  )
}
