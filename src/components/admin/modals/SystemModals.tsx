import { useState } from 'react'
import type { Student, Assistant } from '../../../types/admin'

// ---------------------------------------------------------------------------
// StudentDetailModal
// ---------------------------------------------------------------------------

type StudentDetailModalProps = {
  student: Student
  onClose: () => void
}

export const StudentDetailModal = ({ student, onClose }: StudentDetailModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[var(--radius-xl)] w-full max-w-[580px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Green Gradient */}
        <div className="bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] px-8 py-7 flex items-center gap-[18px]">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="[font-family:var(--font-heading)] font-bold text-lg text-white truncate">
              {student.name}
            </div>
            <div className="[font-family:var(--font-body)] text-sm text-white/80 truncate">
              {student.email}
            </div>
          </div>
          <div className="flex gap-2">
            {student.vip && (
              <span className="bg-[var(--warning-100)] text-[var(--warning-800)] rounded-full px-3 py-1 [font-family:var(--font-heading)] font-bold text-[11px] whitespace-nowrap">
                ⭐ VIP
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 [font-family:var(--font-heading)] font-semibold text-[11px] whitespace-nowrap ${
                student.status === 'Hoạt động'
                  ? 'bg-[var(--success-50)] text-[var(--success-500)]'
                  : 'bg-[var(--warning-50)] text-[var(--warning-500)]'
              }`}
            >
              {student.status}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="px-8 py-6 grid grid-cols-2 gap-3.5">
          {[
            { label: "Ngày tham gia", value: student.joined || "Chưa rõ" },
            { label: "Đăng nhập gần nhất", value: student.lastLogin },
            { label: "Số bài thi đã làm", value: `${student.examsDone || 0} bài` },
            { label: "Điểm trung bình", value: `${student.avgScore} / 10` },
          ].map((f) => (
            <div key={f.label} className="bg-[var(--surface-500)] rounded-[var(--radius-sm)] px-4 py-3">
              <div className="[font-family:var(--font-heading)] font-semibold text-[11px] text-[var(--brand-500)] uppercase tracking-[0.4px] mb-1">
                {f.label}
              </div>
              <div className="[font-family:var(--font-body)] text-sm text-[var(--text-primary)] font-medium">
                {f.value}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-8 pb-7 flex gap-2.5 justify-end">
          <button
            onClick={onClose}
            className="![font-family:var(--font-heading)] !font-semibold !text-[13px] px-5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white text-[var(--text-secondary-600)] cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CreateVipModal
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// CreateAssistantModal
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// AssistantDetailModal
// ---------------------------------------------------------------------------

type AssistantDetailModalProps = {
  asst: Assistant
  onClose: () => void
  navigate?: (p: any) => void
}

export const AssistantDetailModal = ({ asst, onClose }: AssistantDetailModalProps) => {
  const actLog = [
    { time: "Hôm nay, 10:42", text: "Đăng tải đề thi V-ACT mã đề 007" },
    { time: "Hôm qua, 14:20", text: "Tạo bài học mới: Tư duy logic nâng cao" },
    { time: "18/07, 09:05", text: "Trả lời 12 câu hỏi học viên" },
    { time: "17/07, 15:30", text: "Cập nhật nội dung khóa V-ACT chương 4" }
  ]

  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[var(--radius-xl)] w-full max-w-[540px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Green Gradient */}
        <div className="bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] px-[30px] py-[26px] flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-white">
              {asst.name}
            </div>
            <div className="[font-family:var(--font-body)] text-[13px] text-[var(--brand-soft-500)] mt-0.5 truncate">
              {asst.email} · {asst.phone}
            </div>
          </div>
        </div>

        <div className="px-7 py-[22px]">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-[22px]">
            {[
              { label: "Khóa học", value: asst.courses },
              { label: "Đề thi đã tạo", value: asst.exams },
              { label: "Học viên phụ trách", value: asst.students },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--surface-500)] rounded-[var(--radius-sm)] px-4 py-3.5 text-center">
                <div className="[font-family:var(--font-heading)] font-extrabold text-2xl text-[var(--brand-500)]">
                  {s.value}
                </div>
                <div className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-300)] mt-[3px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="flex items-center justify-between mb-3">
            <div className="[font-family:var(--font-heading)] font-bold text-[13px] text-[var(--text-primary)]">
              Hoạt động gần đây
            </div>
            <button
              onClick={() => alert("Tính năng đang được phát triển.")}
              className="bg-transparent border-none cursor-pointer ![font-family:var(--font-heading)] !font-bold !text-[12px] !text-[var(--brand-500)] p-0 underline underline-offset-[3px]"
            >
              Xem tất cả
            </button>
          </div>

          {/* Activity Log */}
          <div className="flex flex-col">
            {actLog.map((a, i) => (
              <div
                key={i}
                className={`flex gap-3 items-start py-2.5 ${
                  i < actLog.length - 1 ? 'border-b border-[var(--border-100)]' : ''
                }`}
              >
                <div className="w-[7px] h-[7px] rounded-full bg-[var(--brand-500)] shrink-0 mt-[5px]" />
                <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] flex-1">
                  {a.text}
                </span>
                <span className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-200)] shrink-0">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-6 flex justify-end">
          <button
            onClick={onClose}
            className="![font-family:var(--font-heading)] !font-semibold !text-[13px] px-[22px] py-[9px] rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white text-[var(--text-secondary-600)] cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
