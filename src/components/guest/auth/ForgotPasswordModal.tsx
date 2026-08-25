import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/authService";
import { useNotification } from "../../../components/common/NotificationProvider";
import axios from "axios";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { showSuccess, showError } = useNotification();

  // Mutations
  // @ts-ignore
  const _forgetPasswordMutation = useMutation({
    mutationFn: authService.forgetPassword,
    onSuccess: () => {
      setStep(2);
      setResendTimer(60);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          showError(error.response.data.message);
        } else if (error.code === 'ECONNABORTED' || !error.response) {
          showError("Lỗi máy chủ, vui lòng thử lại sau.");
        } else {
          showError("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      } else {
        showError("Lỗi không xác định.");
      }
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      showSuccess("Đổi mật khẩu thành công!");
      setStep(4);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          showError(error.response.data.message);
        } else if (error.code === 'ECONNABORTED' || !error.response) {
          showError("Lỗi máy chủ, vui lòng thử lại sau.");
        } else {
          showError("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      } else {
        showError("Lỗi không xác định.");
      }
    }
  });

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setErrorMsg("");
      setResendTimer(60);
    }
  }, [isOpen]);

  // Resend OTP countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 2 && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  // Step 1: Submit Email Request
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    // Temporarily disabled as per request
    showError("Tính năng đang được phát triển");
    return;
    // forgetPasswordMutation.mutate({ gmail: email });
  };

  // OTP Input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pastedData) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      otpInputsRef.current[5]?.focus();
    }
  };

  // Step 2: Verify OTP Submit
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setErrorMsg("Vui lòng nhập đủ 6 chữ số OTP.");
      return;
    }
    setStep(3);
  };

  // Step 3: Create New Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (newPassword.length < 6) {
      setErrorMsg("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp.");
      return;
    }
    resetPasswordMutation.mutate({
      gmail: email,
      otpCode: otp.join(""),
      newPassword: newPassword
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[var(--radius-xl)] max-w-md w-full p-8 shadow-2xl border border-[var(--border-300)] text-left relative overflow-hidden select-none">
        
        {/* STEP 1: Enter Email (Exact match to user screenshot) */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h3
              className="text-2xl font-black !text-[var(--text-primary-500)] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quên mật khẩu?
            </h3>
            <p className="text-sm !text-[var(--text-secondary-400)] leading-relaxed mb-6 font-medium">
              Nhập email tài khoản của bạn. Chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu về hộp thư của bạn.
            </p>

            {errorMsg && (
              <div className="mb-4 text-xs font-bold text-[var(--error-600)] bg-[var(--error-50)] p-3 rounded-[var(--radius-sm)] border border-[var(--error-200)]">
                {errorMsg}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-[var(--neutral-0)] border border-[var(--border-300)] rounded-[var(--radius-md)] py-3 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-[var(--neutral-0)] border border-[var(--border-300)] text-[var(--text-primary-500)] font-extrabold text-sm rounded-[var(--radius-md)] hover:bg-[var(--surface-500)] active:scale-95 transition cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold text-sm rounded-[var(--radius-md)] shadow-sm active:scale-95 transition cursor-pointer"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Enter OTP Code */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <h3
              className="text-2xl font-black !text-[var(--text-primary-500)] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Xác thực OTP
            </h3>
            <p className="text-sm !text-[var(--text-secondary-400)] leading-relaxed mb-6 font-medium">
              Vui lòng nhập mã OTP 6 chữ số vừa được gửi đến email <strong className="!text-[var(--text-primary-500)]">{email}</strong>.
            </p>

            {errorMsg && (
              <div className="mb-4 text-xs font-bold text-[var(--error-600)] bg-[var(--error-50)] p-3 rounded-[var(--radius-sm)] border border-[var(--error-200)]">
                {errorMsg}
              </div>
            )}

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handleOtpPaste}
                  className="w-12 h-12 text-center text-xl font-bold bg-[var(--neutral-0)] border border-[var(--border-300)] rounded-[var(--radius-md)] text-[var(--text-primary-500)] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition"
                />
              ))}
            </div>

            {/* Resend Link */}
            <div className="text-center mb-6 text-xs font-medium text-[var(--text-secondary-400)]">
              Chưa nhận được mã?{" "}
              {resendTimer > 0 ? (
                <span className="font-bold text-[var(--brand-base-600)]">Gửi lại sau {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setResendTimer(60)}
                  className="font-bold text-[var(--brand-base-600)] underline hover:text-[var(--brand-base-700)] cursor-pointer"
                >
                  Gửi lại mã OTP
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 py-3 bg-[var(--neutral-0)] border border-[var(--border-300)] text-[var(--text-primary-500)] font-extrabold text-sm rounded-[var(--radius-md)] hover:bg-[var(--surface-500)] active:scale-95 transition cursor-pointer"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold text-sm rounded-[var(--radius-md)] shadow-sm active:scale-95 transition cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Create New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <h3
              className="text-2xl font-black !text-[var(--text-primary-500)] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tạo mật khẩu mới
            </h3>
            <p className="text-sm !text-[var(--text-secondary-400)] leading-relaxed mb-6 font-medium">
              Vui lòng nhập mật khẩu mới cho tài khoản của bạn. Mật khẩu phải có ít nhất 6 ký tự.
            </p>

            {errorMsg && (
              <div className="mb-4 text-xs font-bold text-[var(--error-600)] bg-[var(--error-50)] p-3 rounded-[var(--radius-sm)] border border-[var(--error-200)]">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--neutral-0)] border border-[var(--border-300)] rounded-[var(--radius-md)] py-3 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--text-secondary-400)] hover:text-[var(--text-primary-500)]"
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[var(--text-secondary-600)] mb-2">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--neutral-0)] border border-[var(--border-300)] rounded-[var(--radius-md)] py-3 px-4 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-[var(--neutral-0)] border border-[var(--border-300)] text-[var(--text-primary-500)] font-extrabold text-sm rounded-[var(--radius-md)] hover:bg-[var(--surface-500)] active:scale-95 transition cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold text-sm rounded-[var(--radius-md)] shadow-sm active:scale-95 transition cursor-pointer"
              >
                Lưu mật khẩu
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success Message */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[var(--success-50)] text-[var(--success-600)] flex items-center justify-center mx-auto mb-4 border border-[var(--success-200)] shadow-sm">
              <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3
              className="text-2xl font-black !text-[var(--text-primary-500)] mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Đổi mật khẩu thành công!
            </h3>
            <p className="text-sm !text-[var(--text-secondary-400)] leading-relaxed mb-6 font-medium">
              Mật khẩu mới của bạn đã được cập nhật. Bạn có thể đăng nhập ngay bây giờ.
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSuccess) onSuccess();
              }}
              className="w-full py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold text-sm rounded-[var(--radius-md)] shadow-md active:scale-95 transition cursor-pointer"
            >
              Về trang đăng nhập
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
