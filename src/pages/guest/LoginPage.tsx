import { useState } from "react";

import AuthLayout from "../../components/guest/auth/AuthLayout";
import ForgotPasswordModal from "../../components/guest/auth/ForgotPasswordModal";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../contexts/AuthContext";

import { useLoginMutation } from "../../hooks/queries/useAuth";
import { useNotification } from "../../components/common/NotificationProvider";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const { login } = useAuth();
  const { mutate: loginMutation } = useLoginMutation();
  const { showSuccess, showError } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    loginMutation(
      { gmail: email.trim().toLowerCase(), password },
      {
        onSuccess: (data) => {
          showSuccess("Đăng nhập thành công!");
          // data is SingleResponse<AuthResponse>, so data.data is AuthResponse
          login(data.data);
        },
        onError: (err) => {
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
        }
      }
    );
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
      </AuthLayout>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </>
  );
}
