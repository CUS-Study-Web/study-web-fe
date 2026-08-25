import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import Logo from "../components/guest/Logo";

export default function UnderDevelopmentPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.AUTH.LOGIN);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-500)] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-lg w-full bg-white rounded-[var(--radius-xl)] p-8 sm:p-12 border border-[var(--border-300)] shadow-xl flex flex-col items-center relative overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="w-full bg-[#18321b] text-white p-4 -mt-8 -mx-8 mb-8 flex items-center justify-between px-8">
          <Logo size="sm" variant="light" />
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-[#ffc107] hover:underline cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>

        {/* Development Icon / Illustration */}
        <div className="w-20 h-20 rounded-full bg-[#fff8e1] border-2 border-[#ffe082] flex items-center justify-center mb-6 text-4xl shadow-xs">
          🚧
        </div>

        {/* Status Tag */}
        <div className="px-4 py-1.5 bg-[#fef3c7] text-[#92400e] border border-[#fde68a] rounded-full text-xs font-black uppercase tracking-wider mb-4">
          ✦ Đang phát triển
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-black text-[var(--text-primary-500)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tính năng đang được phát triển
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--text-secondary-400)] leading-relaxed font-medium mb-8">
          Hệ thống học tập cá nhân hóa dành cho học viên đang được đội ngũ CUS hoàn thiện. Vui lòng quay lại sau hoặc khám phá các nội dung công khai!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 active:scale-95 transition-all text-sm cursor-pointer text-center border-none"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
