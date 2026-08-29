import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../utils/routes'
import type { AssistantSummaryResponse } from '../../../../types/api/system.api'

type AssistantDetailModalProps = {
  asst: AssistantSummaryResponse
  onClose: () => void
}

export const AssistantDetailModal = ({ asst, onClose }: AssistantDetailModalProps) => {
  const navigate = useNavigate()
  const actLog = asst.recentActivities || [];

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
            {asst.avatarUrl ? (
                <img src={asst.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-white">
              {asst.name}
            </div>
            <div className="[font-family:var(--font-body)] text-[13px] text-[var(--brand-soft-500)] mt-0.5 truncate">
              {asst.gmail} · {asst.phone || 'Chưa có SĐT'}
            </div>
          </div>
        </div>

        <div className="px-7 py-[22px]">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-[22px]">
            {[
              { label: "Đề thi đã tạo", value: asst.numExams },
              { label: "Trạng thái", value: asst.status === 'ACTIVE' ? 'Hoạt động' : asst.status === 'INACTIVE' ? 'Tạm khóa' : 'Bị cấm' },
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
              onClick={() => navigate(ROUTES.ADMIN.ACTIVITIES)}
              className="bg-transparent border-none cursor-pointer ![font-family:var(--font-heading)] !font-bold !text-[12px] !text-[var(--brand-500)] p-0 underline underline-offset-[3px]"
            >
              Xem tất cả
            </button>
          </div>

          {/* Activity Log */}
          <div className="flex flex-col">
            {actLog.length === 0 ? (
                <div className="text-[13px] text-[var(--text-secondary-300)] text-center py-4">Chưa có hoạt động</div>
            ) : actLog.map((a, i) => (
              <div
                key={a.id}
                className={`flex gap-3 items-start py-2.5 ${
                  i < actLog.length - 1 ? 'border-b border-[var(--border-100)]' : ''
                }`}
              >
                <div className="w-[7px] h-[7px] rounded-full bg-[var(--brand-500)] shrink-0 mt-[5px]" />
                <span className="[font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] flex-1">
                  {a.description}
                </span>
                <span className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-200)] shrink-0">
                  {a.timestamp}
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
