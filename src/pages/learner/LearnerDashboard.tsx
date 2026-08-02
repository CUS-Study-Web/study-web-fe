import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function LearnerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#18321b] via-[#28522d] to-[#122615] rounded-[var(--radius-xl)] p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-block px-3 py-1 bg-[#ffc107] text-[#1f1f1c] text-xs font-black rounded-full uppercase tracking-wider mb-4">
            ✦ Dành cho Học viên
          </div>
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight mb-3 !text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Chào mừng bạn trở lại, Học viên CUS!
          </h1>
          <p className="text-sm sm:text-base text-[#beccbf] font-medium leading-relaxed">
            Đây là trang tổng quan cá nhân hóa dành cho học viên. Bạn có thể theo dõi tiến độ học tập, làm bài thi thử và truy cập thư viện tài liệu.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[var(--radius-lg)] p-6 border border-[var(--border-300)] shadow-xs flex flex-col justify-between">
          <div className="text-xs font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-2">
            Khóa học đang tham gia
          </div>
          <div className="text-4xl font-black text-[var(--brand-base-600)]" style={{ fontFamily: "var(--font-heading)" }}>
            3
          </div>
        </div>

        <div className="bg-white rounded-[var(--radius-lg)] p-6 border border-[var(--border-300)] shadow-xs flex flex-col justify-between">
          <div className="text-xs font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-2">
            Đề thi thử đã hoàn thành
          </div>
          <div className="text-4xl font-black text-[#1d4ed8]" style={{ fontFamily: "var(--font-heading)" }}>
            12
          </div>
        </div>

        <div className="bg-white rounded-[var(--radius-lg)] p-6 border border-[var(--border-300)] shadow-xs flex flex-col justify-between">
          <div className="text-xs font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-2">
            Tiến độ tổng quan
          </div>
          <div className="text-4xl font-black text-[#b45309]" style={{ fontFamily: "var(--font-heading)" }}>
            78%
          </div>
        </div>
      </div>

      {/* Navigation Quick Actions */}
      <div className="bg-white rounded-[var(--radius-xl)] p-8 border border-[var(--border-300)] shadow-xs space-y-6">
        <h2 className="text-xl font-extrabold text-[var(--text-primary-500)]" style={{ fontFamily: "var(--font-heading)" }}>
          Truy cập nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to={ROUTES.COURSES}
            className="p-5 rounded-[var(--radius-lg)] border border-[var(--border-400)] bg-[var(--surface-200)] hover:border-[var(--brand-base-600)] hover:bg-[#edf4ee] transition-all group"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-extrabold text-sm text-[var(--text-primary-500)] group-hover:text-[var(--brand-base-600)]">
              Khóa học của tôi
            </div>
            <div className="text-xs text-[var(--text-secondary-400)] mt-1">Xem chi tiết bài giảng & bài tập</div>
          </Link>

          <Link
            to={ROUTES.TRIAL}
            className="p-5 rounded-[var(--radius-lg)] border border-[var(--border-400)] bg-[var(--surface-200)] hover:border-[var(--brand-base-600)] hover:bg-[#edf4ee] transition-all group"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-extrabold text-sm text-[var(--text-primary-500)] group-hover:text-[var(--brand-base-600)]">
              Luyện thi thử
            </div>
            <div className="text-xs text-[var(--text-secondary-400)] mt-1">Làm bài và nhận kết quả tức thì</div>
          </Link>

          <Link
            to={ROUTES.DOCUMENTS}
            className="p-5 rounded-[var(--radius-lg)] border border-[var(--border-400)] bg-[var(--surface-200)] hover:border-[var(--brand-base-600)] hover:bg-[#edf4ee] transition-all group"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-extrabold text-sm text-[var(--text-primary-500)] group-hover:text-[var(--brand-base-600)]">
              Tài liệu học tập
            </div>
            <div className="text-xs text-[var(--text-secondary-400)] mt-1">Tải về công thức và đề cương</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
