import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import Logo from "../components/guest/Logo";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-500)] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-white rounded-[var(--radius-xl)] p-8 sm:p-10 border border-[var(--border-300)] shadow-lg flex flex-col items-center">
        {/* Logo */}
        <Logo size="lg" className="mb-8" />

        {/* 404 Badge */}
        <div className="px-4 py-1.5 bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] rounded-full text-xs font-black uppercase tracking-wider mb-4">
          Lỗi 404 — Trang không tồn tại
        </div>

        {/* Big Number */}
        <div
          className="text-7xl sm:text-8xl font-black text-[var(--brand-base-600)] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          404
        </div>

        {/* Title & Description */}
        <h1
          className="text-2xl font-bold text-[var(--text-primary-500)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Không tìm thấy trang yêu cầu
        </h1>
        <p className="text-sm text-[var(--text-secondary-400)] leading-relaxed font-medium mb-8">
          Đường dẫn bạn truy cập có thể đã bị thay đổi, xóa bỏ hoặc tạm thời không khả dụng.
        </p>

        {/* Action Button */}
        <Link
          to={ROUTES.HOME}
          className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 active:scale-95 transition-all text-sm cursor-pointer text-center"
        >
          Trở về Trang chủ
        </Link>
      </div>
    </div>
  );
}
