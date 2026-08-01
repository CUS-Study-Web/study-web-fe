import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo register handling
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
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-[12px] bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
              <svg className="w-6.5 h-6.5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-3-8l2.5 2.5 5.5-5.5 1.5 1.5-7 7-4-4 1.5-1.5z" />
              </svg>
            </div>
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
            THAM GIA CÙNG 3.400+ HỌC VIÊN
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-black !text-white leading-[1.18] tracking-tight mb-7"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Hành trình<br />nghìn dặm bắt<br />đầu từ đây.
          </h1>

          <p
            className="text-sm lg:text-base !text-white/85 leading-relaxed font-medium mb-10 max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Mỗi học sinh đến với CUS đều mang theo một giấc mơ. Chúng tôi ở đây để biến giấc mơ đó thành hiện thực.
          </p>

          <div className="space-y-4.5 pt-2">
            <div className="flex items-center gap-3.5 text-sm text-white/90 font-semibold">
              <div className="w-5.5 h-5.5 rounded-full bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs">
                ✓
              </div>
              <span>96% học viên đạt điểm mục tiêu</span>
            </div>
            <div className="flex items-center gap-3.5 text-sm text-white/90 font-semibold">
              <div className="w-5.5 h-5.5 rounded-full bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs">
                ✓
              </div>
              <span>Giảng viên tiến sĩ, thạc sĩ hàng đầu</span>
            </div>
            <div className="flex items-center gap-3.5 text-sm text-white/90 font-semibold">
              <div className="w-5.5 h-5.5 rounded-full bg-[#28522d] border border-[#3c6d42] flex items-center justify-center text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs">
                ✓
              </div>
              <span>Lộ trình học cá nhân hóa 100%</span>
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
          <div className="w-12 h-12 rounded-[14px] bg-[var(--brand-base-600)] flex items-center justify-center text-white shadow-xs mb-6 self-start">
            <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-3-8l2.5 2.5 5.5-5.5 1.5 1.5-7 7-4-4 1.5-1.5z" />
            </svg>
          </div>

          <h2
            className="text-3xl font-black !text-[var(--text-primary-500)] mb-8 text-left w-full"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Đăng ký học
          </h2>

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
                placeholder="example@email.com"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[14px] py-3.5 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
                Mật khẩu <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[14px] py-3.5 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
                Nhập lại mật khẩu <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[14px] py-3.5 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[14px] shadow-md shadow-[#28522d]/20 hover:shadow-lg active:scale-95 transition-all text-base cursor-pointer mt-2 text-center"
            >
              Đăng ký ngay
            </button>
          </form>

          {/* Footer toggle link - Left Aligned */}
          <p className="text-sm font-medium text-[var(--text-secondary-300)] text-left w-full mt-6">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="font-bold !text-[var(--brand-base-600)] underline hover:text-[var(--brand-base-700)]">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
