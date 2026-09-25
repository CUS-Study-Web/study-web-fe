import { User, Star } from 'lucide-react';
import type { LearnerSummaryResponse } from '../../../types/api/system.api';

type Props = {
  student: LearnerSummaryResponse;
  onClose: () => void;
};

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Hoạt động',
  INACTIVE: 'Tạm khóa',
  BANNED: 'Bị cấm',
};

export default function AssistantStudentDetailPopup({ student, onClose }: Props) {
  const isVip = student.tier === 'VIP';
  const statusLabel = STATUS_LABEL[student.status] ?? student.status;
  const isActive = student.status === 'ACTIVE';

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
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-white/20 overflow-hidden">
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <User size={22} className="text-white" strokeWidth={2} />
            )}
          </div>

          {/* Name/Email + Badges — same row */}
          <div className="flex flex-1 flex-col gap-1">
            <div className="text-[18px] font-bold text-white leading-none">
              {student.name || student.gmail}
            </div>
            <div className="text-[13px] text-white/70">{student.gmail}</div>
            <div className="flex items-center gap-2 mt-1">
              {isVip && (
                <span className="flex items-center gap-1 rounded-full bg-[#F6C644] px-3 py-[3px] text-[11px] font-bold text-[#6B4C00]">
                  <Star size={10} className="fill-current text-[#6B4C00]" />
                  VIP
                </span>
              )}
              <span
                className="rounded-full px-3 py-[3px] text-[11px] font-bold"
                style={{
                  background: isActive ? '#DCE9DE' : '#FBF0DC',
                  color: isActive ? '#2C5A31' : '#B7791F',
                }}
              >
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Khóa học chính</div>
              <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {(!student.primaryCourse || student.primaryCourse === 'N/A') ? 'Chưa có' : student.primaryCourse}
              </div>
            </div>

            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Tiến độ</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#E4EBE5] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${student.progress ?? 0}%`,
                      background: student.progress === 100 ? '#2C5A31' : '#4A7C59',
                    }}
                  />
                </div>
                <span className="text-[#1B1F1C] text-[14px] font-bold shrink-0">
                  {student.progress ?? 0}%
                </span>
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
                {student.numExams ?? 0} bài
              </div>
            </div>

            <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
              <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Điểm trung bình</div>
              <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {student.averageScore != null ? student.averageScore.toFixed(1) : '0.0'} / 10
              </div>
            </div>

            {student.note && (
              <div className="rounded-xl bg-[#F9FBFA] p-4 border border-[#E4EBE5]">
                <div className="text-[11px] font-bold text-[#6B746D] uppercase tracking-[0.4px] mb-2">Ghi chú</div>
                <div className="text-[#1B1F1C] text-[15px] font-medium" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  {student.note}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D4DCD5] bg-white px-6 py-2 text-sm font-semibold text-[#3D4540] hover:bg-[#F9FBFA] transition-colors cursor-pointer"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
