import { useState } from "react";

import AuthLayout from "../../components/guest/auth/AuthLayout";
import ForgotPasswordModal from "../../components/guest/auth/ForgotPasswordModal";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../contexts/AuthContext";

import { useLoginMutation } from "../../hooks/queries/useAuth";
import { useNotification } from "../../components/common/NotificationProvider";
import { validateEmail, sanitizeEmail } from "../../utils/emailUtils";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { mutateAsync: loginMutationAsync } = useLoginMutation();
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (!validateEmail(email)) {
      showError("Địa chỉ email không hợp lệ.");
      return;
    }

    setIsSubmitting(true);
    const startTime = Date.now();

    try {
      const sanitizedEmail = sanitizeEmail(email);
      const data = await loginMutationAsync({ gmail: sanitizedEmail, password });
      const elapsed = Date.now() - startTime;

      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed));
      showSuccess("Đăng nhập thành công!");
      login(data.data);
    } catch (err: any) {
      const elapsed = Date.now() - startTime;

      if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed));
      console.error("Login failed", err);

      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          showError(err.response.data.message);
        } else if (err.code === 'ECONNABORTED' || !err.response) {
          showError("Lỗi máy chủ, vui lòng thử lại sau.");
        } else {
          showError("Đăng nhập thất bại. Vui lòng thử lại.");
        }
      } else {
        showError("Lỗi không xác định.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftFeatures = [
    "Hệ thống theo dõi tiến độ chuẩn hóa",
    "Giải đáp bài tập trực tiếp 1:1 với trợ giảng",
    "Truy cập tài liệu đã lưu",
  ];

  return (
    <>
      <AuthLayout
        leftBadge="✦ Nền tảng học tập CUS"
        leftTitle="Chào mừng bạn trở lại với CUS"
        leftDescription="Đăng nhập để truy cập lộ trình học cá nhân hóa, xem bài giảng VIP và làm các bộ đề thi thử sát với đề thi thật."
        leftFeatures={leftFeatures}
        formTitle="Đăng nhập"
        formSubtitle="Nhập thông tin tài khoản để tiếp tục học tập."
        footerLinkText="Chưa có tài khoản?"
        footerLinkTo={ROUTES.AUTH.REGISTER}
        footerLinkLabel="Đăng ký"
      >
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[var(--radius-md)] py-3.5 pl-4 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary-600)] hover:text-[var(--brand-base-600)] transition-colors cursor-pointer"
                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 hover:shadow-lg active:scale-95 transition-all text-base cursor-pointer mt-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Đăng nhập
          </button>
        </form>
      </AuthLayout>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </>
  );
}
