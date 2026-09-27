import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "../../components/guest/auth/AuthLayout";
import { ROUTES } from "../../utils/routes";
import { authService } from "../../services/authService";
import { useNotification } from "../../components/common/NotificationProvider";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail, sanitizeEmail } from "../../utils/emailUtils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSuccess, showError } = useNotification();
  const { login } = useAuth();

  const registerMutation = useMutation({
    mutationFn: authService.register,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || password !== confirmPassword) {
      if (password !== confirmPassword) {
        showError("Mật khẩu không khớp.");
      }
      return;
    }

    if (!validateEmail(email)) {
      showError("Địa chỉ email không hợp lệ.");
      return;
    }

    setIsSubmitting(true);
    const startTime = Date.now();

    try {
      const sanitizedEmail = sanitizeEmail(email);
      const data = await registerMutation.mutateAsync({
        gmail: sanitizedEmail,
        password: password,
        name: "",
        phone: "",
        birth: "",
        gender: "MALE",
        school: "",
      });

      const elapsed = Date.now() - startTime;
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed));

      showSuccess("Đăng ký thành công!");
      setTimeout(() => {
        login(data.data, ROUTES.HOME);
      }, 1000);
    } catch (error: any) {
      const elapsed = Date.now() - startTime;
      if (elapsed < 500) await new Promise((r) => setTimeout(r, 500 - elapsed));
      
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
    } finally {
      setIsSubmitting(false);
    }
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
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
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
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 hover:shadow-lg active:scale-95 transition-all text-base cursor-pointer mt-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
          )}
          Đăng ký ngay
        </button>
      </form>
    </AuthLayout>
  );
}
