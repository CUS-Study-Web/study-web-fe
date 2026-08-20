import { useState } from "react";
import AuthLayout from "../../components/guest/auth/AuthLayout";
import { ROUTES } from "../../utils/routes";
import { authService } from "../../services/authService";
import { useNotification } from "../../components/common/NotificationProvider";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { showSuccess, showError } = useNotification();
  const { login } = useAuth();

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      showSuccess("Đăng ký thành công!");
      setTimeout(() => {
        login(data.data, ROUTES.HOME);
      }, 1000);
    },
    onError: (error: any) => {
      console.error("Register Error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          showError(error.response.data.message);
        } else if (error.code === 'ECONNABORTED' || !error.response) {
          showError("Lỗi máy chủ, vui lòng thử lại sau.");
        } else {
          showError(`Lỗi Axios: ${error.message} - ${JSON.stringify(error.response?.data || {})}`);
        }
      } else {
        showError(`Lỗi hệ thống: ${error.message || 'Không xác định'}`);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || password !== confirmPassword) {
      if (password !== confirmPassword) {
        showError("Mật khẩu không khớp.");
      }
      return;
    }

    registerMutation.mutate({
      gmail: email,
      password: password,
      name: "",
      phone: "",
      birth: "",
      gender: "MALE",
      school: "",
    });
  };

  const leftFeatures = [
    "Khai phá toàn bộ lộ trình ôn luyện chuyên sâu",
    "Thi thử miễn phí không giới hạn số lượt làm",
    "Gia nhập cộng đồng hơn 3.400+ học viên đỗ top",
  ];

  return (
    <AuthLayout
      leftBadge="✦ Gia nhập cộng đồng CUS"
      leftTitle="Bắt đầu hành trình chinh phục mục tiêu"
      leftDescription="Mỗi học sinh đến với CUS đều mang theo một giấc mơ. Chúng tôi ở đây để biến giấc mơ đó thành hiện thực."
      leftFeatures={leftFeatures}
      formTitle="Đăng ký học"
      footerLinkText="Bạn đã có tài khoản?"
      footerLinkTo={ROUTES.AUTH.LOGIN}
      footerLinkLabel="Đăng nhập"
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
            placeholder="example@email.com"
            className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[var(--radius-md)] py-3.5 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
            Mật khẩu <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
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

        {/* Confirm Password Field */}
        <div>
          <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
            Nhập lại mật khẩu <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full bg-[var(--neutral-0)] border border-[var(--border-500)] rounded-[var(--radius-md)] py-3.5 pl-4 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none shadow-xs transition font-medium"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary-600)] hover:text-[var(--brand-base-600)] transition-colors cursor-pointer"
              title={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 hover:shadow-lg active:scale-95 transition-all text-base cursor-pointer mt-2 text-center"
        >
          Đăng ký ngay
        </button>
      </form>
    </AuthLayout>
  );
}
