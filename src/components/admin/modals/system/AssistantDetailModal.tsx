import type { Assistant } from '../../../../types/admin'

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
          <div className="grid grid-cols-2 gap-3 mb-[22px]">
            {[
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
