import { useNavigate } from "react-router-dom";

interface VipGateModalProps {
  isOpen: boolean;
  subjectTitle: string;
  courseTitle: string;
  onClose: () => void;
}

export default function VipGateModal({
  isOpen,
  subjectTitle,
  courseTitle,
  onClose,
}: VipGateModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[var(--border-300)] text-center relative overflow-hidden select-none">
        {/* Crown / Lock Badge */}
        <div className="w-16 h-16 rounded-full bg-[#18321b] flex items-center justify-center mx-auto mb-5 shadow-lg border-2 border-[#ffc107]/40">
          <svg className="w-8 h-8 text-[#ffc107] fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        {/* Title */}
        <span className="inline-block bg-[#fffdf5] border border-[#fde68a] text-[#b45309] text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mb-3">
          ✦ TÀI KHOẢN VIP
        </span>

        <h3
          className="text-2xl font-black !text-[var(--text-primary-500)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Nội dung chuyên sâu VIP
        </h3>

        {/* Message */}
        <p className="text-sm !text-[var(--text-secondary-500)] font-medium leading-relaxed mb-6">
          Bạn đang xem danh sách môn học môn <strong className="!text-[var(--brand-base-600)] font-extrabold">{subjectTitle}</strong> trong khóa học <strong className="!text-[var(--text-primary-500)] font-bold">{courseTitle}</strong>. Đăng ký VIP để học toàn bộ bài giảng, làm bài tập luyện tập và đề thi thử có lời giải chi tiết.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              navigate("/vip");
            }}
            className="w-full py-3.5 bg-gradient-to-b from-[#ffcf33] to-[#e6a800] hover:from-[#ffd54f] hover:to-[#ebaf0a] !text-[#1f1f1c] font-black text-base rounded-[16px] shadow-md shadow-[#e6a800]/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            Nâng cấp VIP ngay (80.000đ/tháng) ✦
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="w-full py-3 bg-[var(--surface-300)] border border-[var(--border-500)] !text-[var(--text-secondary-600)] font-extrabold text-sm rounded-[14px] hover:bg-[var(--brand-soft-300)] hover:!text-[var(--brand-base-600)] active:scale-95 transition-all cursor-pointer"
          >
            Đã có tài khoản VIP? Đăng nhập
          </button>

          <button
            onClick={onClose}
            className="text-xs font-bold text-[var(--text-secondary-300)] hover:underline pt-1 cursor-pointer"
          >
            Đóng cửa sổ này
          </button>
        </div>
      </div>
    </div>
  );
}
