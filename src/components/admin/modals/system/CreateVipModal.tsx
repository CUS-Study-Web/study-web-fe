import { useState } from 'react'

type CreateVipModalProps = {
  onClose: () => void
  onCreate: (studentData: { name: string; email: string; course: string }) => void
}

export const CreateVipModal = ({ onClose, onCreate }: CreateVipModalProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('V-ACT')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      alert('Vui lòng điền họ tên và email.')
      return
    }
    onCreate({ name, email, course })
    onClose()
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-500)] [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)]"
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
        className="bg-white rounded-[var(--radius-xl)] px-7 py-8 w-full max-w-[500px]"
      >
        <div className="flex items-center justify-between mb-[22px]">
          <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-[var(--text-primary)]">
            ⭐ Tạo tài khoản VIP
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-[22px] text-[var(--text-secondary-300)] hover:text-[var(--text-primary)]"
          >
            ×
          </button>
        </div>

        <div className="mb-3.5">
          <label className={labelClass}>Họ và tên</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Tên học viên" required />
        </div>

        <div className="mb-3.5">
          <label className={labelClass}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="email@example.com" required />
        </div>

        <div className="mb-3.5">
          <label className={labelClass}>Khóa học</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)} className={inputClass}>
            {["V-ACT", "V-SAT", "HSA", "HSCA", "THPT QG"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3.5">
          <div>
            <label className={labelClass}>Ngày bắt đầu</label>
            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} placeholder="DD/MM/YYYY" />
          </div>
          <div>
            <label className={labelClass}>Ngày kết thúc</label>
            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} placeholder="DD/MM/YYYY" />
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
            className="flex-[2] py-[11px] rounded-[var(--radius-sm)] border-none bg-[var(--warning-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer hover:bg-[var(--warning-600)] transition-colors duration-[var(--motion-fast)]"
          >
            Tạo tài khoản VIP
          </button>
        </div>
      </form>
    </div>
  )
}
