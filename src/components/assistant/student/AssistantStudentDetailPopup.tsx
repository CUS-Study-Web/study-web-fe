import type { AssistantStudent } from '../../../types/assistant';

interface AssistantStudentDetailPopup {
  student: AssistantStudent;
  onClose: () => void;
}

export default function AssistantStudentDetailPopup({ student, onClose }: AssistantStudentDetailPopup) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[520px] rounded-[18px] bg-white overflow-hidden shadow-xl"
        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Dark Green Background */}
        <div className="bg-[#2C5A31] px-6 py-5 flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-white/20">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* Email + Badges — same row */}
          <div className="flex flex-1 items-center gap-3 flex-wrap">
            <div className="text-[18px] font-bold text-white leading-none">{student.email}</div>
            <div className="flex items-center gap-2">
              {student.isVip && (
                <span className="flex items-center gap-1 rounded-full bg-[#F6C644] px-3 py-[3px] text-[11px] font-bold text-[#6B4C00]">
                  <svg className="h-[10px] w-[10px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  VIP
                </span>
              )}
              <span
                className="rounded-full px-3 py-[3px] text-[11px] font-bold"
                style={{
                  background: student.status === 'Hoạt động' ? '#DCE9DE' : '#FBF0DC',
                  color: student.status === 'Hoạt động' ? '#2C5A31' : '#B7791F',
                }}
              >
                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Ngày tham gia</div>
              <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {student.joined}
              </div>
            </div>

            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Đăng nhập gần nhất</div>
              <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {student.lastLogin || 'Chưa cập nhật'}
              </div>
            </div>

            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Số bài thi đã làm</div>
              <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {student.examsCompleted ?? 0} bài
              </div>
            </div>

            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Điểm trung bình</div>
              <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {student.averageScore != null ? student.averageScore : '0.0'} / 10
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div
              onClick={onClose}
              className="rounded-xl border border-[#D4DCD5] bg-white px-6 py-2 text-sm font-semibold text-[#3D4540] hover:bg-[#F9FBFA] transition-colors"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Đóng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
