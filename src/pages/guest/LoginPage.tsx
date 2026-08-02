import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/guest/Logo";
import ForgotPasswordModal from "../../components/guest/ForgotPasswordModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login handling
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f8faf8] select-none">
      {/* Left Column - Split Cover Banner */}
      <div className="w-full md:w-1/2 min-h-[560px] md:min-h-screen relative p-8 lg:p-14 xl:p-20 flex flex-col justify-between overflow-hidden bg-[#122615]">
        {/* Background Image with Dark Green Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#122615]/95 via-[#18321b]/92 to-[#28522d]/88" />

        {/* Top Header Row in Cover */}
        <div className="relative z-10 flex items-center justify-between mb-12 lg:mb-16">
          <Link to="/" className="group">
            <Logo size="md" variant="light" />
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 !text-white font-bold text-xs rounded-full backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <span>‹</span> Quay lại
          </Link>
        </div>

        {/* Middle Hero Content - Spacious Layer Separation */}
        <div className="relative z-10 my-auto py-4">
          <div className="inline-block bg-white/15 backdrop-blur-md border border-white/10 !text-white text-[11px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider mb-7">
            CHÀO MỪNG TRỞ LẠI
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-black !text-white leading-[1.18] tracking-tight mb-7"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tiếp tục<br />hành trình<br />chinh phục.
          </h1>

          <p
            className="text-sm lg:text-base !text-white/85 leading-relaxed font-medium mb-10 max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Đăng nhập để tiếp tục ôn luyện, theo dõi tiến độ và truy cập toàn bộ tài nguyên học tập của bạn.
          </p>

          <div className="space-y-4.5 pt-2">
            <div className="flex items-center gap-3.5 text-sm text-white/90 font-semibold">
              <div className="w-5.5 h-5.5 rounded-full bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs">
                ✓
              </div>
              <span>Xem lại lịch sử làm bài & điểm số</span>
            </div>
            <div className="flex items-center gap-3.5 text-sm text-white/90 font-semibold">
              <div className="w-5.5 h-5.5 rounded-full bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs">
                ✓
              </div>
              <span>Tiếp tục khóa học đang học dở</span>
            </div>
            <div className="flex items-center gap-3.5 text-sm text-white/90 font-semibold">
              <div className="w-5.5 h-5.5 rounded-full bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs">
                ✓
              </div>
              <span>Truy cập tài liệu đã lưu</span>
            </div>
          </div>
        </div>

        {/* Footer info at bottom */}
        <div className="relative z-10 text-xs text-white/50 font-medium mt-12">
          © 2024 CUS Education JSC
        </div>
      </div>

      {/* Right Column - Form Container (Left Aligned Cluster) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[var(--surface-300)]">
        <div className="w-full max-w-[400px] flex flex-col items-start text-left">
          {/* Logo Badge - Aligned Left */}
          <Logo size="lg" showText={false} className="mb-6 self-start" />

          <h2
            className="text-3xl font-black !text-[var(--text-primary-500)] mb-2 text-left w-full"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Đăng nhập
          </h2>

          <p className="text-sm font-medium text-[var(--text-secondary-300)] mb-8 text-left w-full">
            Nhập thông tin tài khoản để tiếp tục học tập.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
                Email <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student / assistant / admin @gmail.com"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[var(--radius-md)] py-3.5 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold text-[var(--text-secondary-600)]">
                  Mật khẩu <span className="text-[#ef4444]">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotOpen(true)}
                  className="text-xs font-bold !text-[var(--brand-base-600)] underline hover:text-[var(--brand-base-700)] cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[var(--radius-md)] py-3.5 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 hover:shadow-lg active:scale-95 transition-all text-base cursor-pointer mt-2 text-center"
            >
              Đăng nhập
            </button>
          </form>

          {/* Footer toggle link - Left Aligned */}
          <p className="text-sm font-medium text-[var(--text-secondary-300)] text-left w-full mt-6">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="font-bold !text-[var(--brand-base-600)] underline hover:text-[var(--brand-base-700)]">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </div>
  );
}
