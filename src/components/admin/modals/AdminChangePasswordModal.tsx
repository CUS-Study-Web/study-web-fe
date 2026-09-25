import { useState } from 'react';
import { Lock, X, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useChangePasswordMutation } from '../../../hooks/queries/useAuth';

type AdminChangePasswordModalProps = {
  onClose: () => void;
};

export default function AdminChangePasswordModal({ onClose }: AdminChangePasswordModalProps) {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const changePasswordMutation = useChangePasswordMutation();
  const isLoading = changePasswordMutation.isPending;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!currentPassword.trim()) {
      setError('Vui lòng nhập mật khẩu hiện tại.');
      return;
    }
    if (!newPassword.trim()) {
      setError('Vui lòng nhập mật khẩu mới.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có tối thiểu 8 ký tự.');
      return;
    }
    if (newPassword === currentPassword) {
      setError('Mật khẩu mới không được trùng với mật khẩu hiện tại.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    changePasswordMutation.mutate(
      { newPassword },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.message ||
            'Đã có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại!'
          );
        },
      }
    );
  };

  const adminEmail = user?.gmail || 'Email not found';
  const inputClass =
    'w-full pl-3.5 pr-10 py-[11px] rounded-[11px] border border-[var(--border-500)] [font-family:var(--font-body)] text-sm text-[var(--text-primary)] outline-none bg-[#FAFCFA] transition-colors focus:border-[var(--brand-500)] focus:bg-white box-border';
  const labelClass =
    'block [font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-secondary-600)] mb-1.5';

  return (
    <div
      className="fixed inset-0 bg-[#111814]/55 backdrop-blur-[4px] z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[22px] w-full max-w-[480px] shadow-[0_28px_72px_rgba(0,0,0,0.24)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] px-[26px] py-[22px] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-white/15 flex items-center justify-center shrink-0">
              <Lock className="w-[22px] h-[22px] text-white" />
            </div>
            <div>
              <div className="[font-family:var(--font-heading)] font-extrabold text-[17px] text-white">
                Đổi mật khẩu Quản trị viên
              </div>
              <div className="[font-family:var(--font-body)] text-xs text-[var(--brand-soft-300)] mt-0.5">
                Tài khoản: {adminEmail}
              </div>
            </div>
          </div>
          <div
            onClick={onClose}
            aria-label="Đóng modal"
            className="w-8 h-8 rounded-[8px] bg-white/15 border-none flex items-center justify-center cursor-pointer text-white hover:bg-white/25 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        {success ? (
          <div className="px-8 pt-9 pb-[30px] text-center">
            <div className="w-[60px] h-[60px] rounded-full bg-[var(--brand-soft-500)] text-[var(--brand-500)] flex items-center justify-center mx-auto mb-4 font-bold">
              <Check className="w-7 h-7 text-[var(--brand-500)] stroke-[3]" />
            </div>
            <h3 className="[font-family:var(--font-heading)] font-bold text-lg text-[var(--text-primary)] mb-2">
              Đổi mật khẩu thành công!
            </h3>
            <p className="[font-family:var(--font-body)] text-[13.5px] text-[var(--text-secondary-500)] mb-6 leading-[1.55]">
              Mật khẩu quản trị viên đã được cập nhật thành công. Vui lòng sử dụng mật
              khẩu mới cho các lần đăng nhập tiếp theo vào hệ thống CUS.
            </p>
            <div
              onClick={onClose}
              className="[font-family:var(--font-heading)] font-bold text-sm px-8 py-[11px] rounded-[12px] border-none bg-[var(--brand-500)] text-white cursor-pointer shadow-[0_4px_12px_rgba(44,90,49,0.22)] hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
            >
              Hoàn tất
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="px-[26px] py-6 flex flex-col gap-4"
          >
            {error && (
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--error-50)] border border-[var(--error-200)] text-[var(--error-600)] text-[13px] [font-family:var(--font-body)]">
                <AlertCircle className="w-4 h-4 shrink-0 text-[var(--error-500)]" />
                <span className="flex-1">{error}</span>
                <div
                  onClick={() => setError('')}
                  className="bg-transparent border-none cursor-pointer text-[var(--error-400)] hover:text-[var(--error-600)] p-0 leading-none text-base"
                >
                  ×
                </div>
              </div>
            )}

            {/* Mật khẩu hiện tại */}
            <div>
              <label className={labelClass}>
                Mật khẩu hiện tại <span className="text-[var(--error-500)]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setError('');
                  }}
                  className={inputClass}
                />
                <div
                  className="absolute right-2.5 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-[var(--text-secondary-400)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowCurrent(!showCurrent)}
                  title={showCurrent ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showCurrent ? (
                    <EyeOff className="w-[17px] h-[17px]" />
                  ) : (
                    <Eye className="w-[17px] h-[17px]" />
                  )}
                </div>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div>
              <label className={labelClass}>
                Mật khẩu mới <span className="text-[var(--error-500)]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Tối thiểu 8 ký tự"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  className={inputClass}
                />
                <div
                  className="absolute right-2.5 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-[var(--text-secondary-400)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowNew(!showNew)}
                  title={showNew ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showNew ? (
                    <EyeOff className="w-[17px] h-[17px]" />
                  ) : (
                    <Eye className="w-[17px] h-[17px]" />
                  )}
                </div>
              </div>
              <div className="[font-family:var(--font-body)] text-[11.5px] text-[var(--text-secondary-400)] mt-1">
                Mật khẩu phải có ít nhất 8 kí tự.
              </div>
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div>
              <label className={labelClass}>
                Xác nhận mật khẩu mới <span className="text-[var(--error-500)]">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  className={inputClass}
                />
                <div
                  className="absolute right-2.5 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-[var(--text-secondary-400)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowConfirm(!showConfirm)}
                  title={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showConfirm ? (
                    <EyeOff className="w-[17px] h-[17px]" />
                  ) : (
                    <Eye className="w-[17px] h-[17px]" />
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5 justify-end pt-1.5">
              <div
                onClick={onClose}
                className="[font-family:var(--font-heading)] font-semibold text-[13px] px-5 py-[9px] rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white text-[var(--text-secondary-600)] cursor-pointer hover:bg-[var(--surface-500)] transition-colors duration-[var(--motion-fast)]"
              >
                Hủy
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="[!font-family:var(--font-heading)] !font-bold !text-[13px] !px-[22px] !py-[9px] !rounded-[var(--radius-sm)] !border !border-transparent !bg-[var(--brand-500)] !text-white !cursor-pointer !shadow-[0_2px_8px_rgba(44,90,49,0.22)] !hover:bg-[var(--brand-600)] !transition-colors !duration-[var(--motion-fast)] !disabled:bg-[#6F9473] !disabled:cursor-not-allowed !disabled:shadow-none"
              >
                {isLoading ? 'Đang lưu...' : 'Cập nhật mật khẩu'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
