import type { LearnerSummaryResponse } from '../../../../types/api/system.api'

type StudentDetailModalProps = {
  student: LearnerSummaryResponse
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
            {student.avatarUrl ? (
               <img src={student.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="[font-family:var(--font-heading)] font-bold text-lg text-white truncate">
              {student.name}
            </div>
            <div className="[font-family:var(--font-body)] text-sm text-white/80 truncate">
              {student.gmail}
            </div>
          </div>
          <div className="flex gap-2">
            {student.tier === 'VIP' && (
              <span className="bg-[var(--warning-100)] text-[var(--warning-800)] rounded-full px-3 py-1 [font-family:var(--font-heading)] font-bold text-[11px] whitespace-nowrap">
                ⭐ VIP
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 [font-family:var(--font-heading)] font-semibold text-[11px] whitespace-nowrap ${
                student.status === 'ACTIVE'
                  ? 'bg-[var(--success-50)] text-[var(--success-500)]'
                  : 'bg-[var(--warning-50)] text-[var(--warning-500)]'
              }`}
            >
              {student.status === 'ACTIVE' ? 'Hoạt động' : student.status === 'INACTIVE' ? 'Bị khóa' : 'Bị cấm'}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="px-8 py-6 grid grid-cols-2 gap-3.5">
          {[
            { label: "Khóa học", value: (!student.primaryCourse || student.primaryCourse === "N/A") ? "Chưa học" : student.primaryCourse },
            { label: "Đăng nhập gần nhất", value: student.lastLogin || "Chưa rõ" },
            { label: "Số bài thi đã làm", value: `${student.numExams || 0} bài` },
            { label: "Điểm trung bình", value: `${student.averageScore || 0}` },
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
