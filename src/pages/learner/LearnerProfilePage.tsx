import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../utils/routes";
import InfoRow from "../../components/learner/InfoRow";
import Avatar from "../../components/learner/Avatar";
import PendingSolutionPopup from "../../components/common/PendingSolutionPopup";
import { useChangePasswordMutation } from "../../hooks/queries/useAuth";
import { useNotification } from "../../components/common/NotificationProvider";

// Using real data from AuthContext

export default function LearnerProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const changePasswordMutation = useChangePasswordMutation();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showFeaturePending, setShowFeaturePending] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const handleCancelPassword = () => {
    setShowChangePassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword.length < 8) {
      showError("Mật khẩu hiện tại phải có ít nhất 8 ký tự!");
      return;
    }
    if (newPassword !== confirmPassword) {
      showError("Mật khẩu xác nhận không khớp!");
      return;
    }

    changePasswordMutation.mutate(
      { newPassword },
      {
        onSuccess: () => {
          setTimeout(() => {
            showSuccess("Mật khẩu đã được cập nhật thành công!");
            handleCancelPassword();
          }, 500);
        },
        onError: (error: any) => {
          setTimeout(() => {
            showError(error?.response?.data?.message || "Đã có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại!");
          }, 500);
        },
      }
    );
  };

  return (
    <div className="pb-20 bg-[var(--surface-500)]">
      {/* ── Profile Hero Banner ── */}
      <section className="bg-[#1b3b22] pt-10 pb-36 px-4 md:px-6">
        <div className="max-w-[560px] mx-auto flex flex-col items-center text-center">
          {/* Avatar with edit icon badge */}
          <Avatar size="lg" showEdit className="mb-4" />

          {/* Name & Email */}
          <div className="text-xl font-black !text-white tracking-tight mb-1 font-[family:var(--font-heading)]">
            {user?.name || user?.gmail}
          </div>
          <div className="text-xs font-medium !text-[var(--brand-base-100)] mb-3.5">{user?.gmail}</div>
        </div>
      </section>

      {/* ── Compact Personal Info Card (Overlapping Hero with Glowing White Shadow) ── */}
      <section className="max-w-[560px] mx-auto px-4 -mt-28 relative z-10">
        <div className="bg-white rounded-[20px] border border-white/80 shadow-[0_10px_25px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-200)]">
            <div className="text-sm font-black text-[var(--text-primary-500)] font-[family:var(--font-heading)]">
              Thông tin cá nhân
            </div>
            <div
              onClick={() => setShowFeaturePending(true)}
              className="px-4 py-1.5 text-body-sm font-bold rounded-full border active:scale-95 transition-all cursor-pointer bg-white border-[var(--brand-base-600)] text-[var(--brand-base-600)] hover:bg-[var(--brand-soft-100)]"
            >
              Chỉnh sửa thông tin
            </div>
          </div>

          {/* Info Rows */}
          <div className="px-6 py-4 space-y-4">
            <InfoRow icon={<PersonIcon />} label="HỌ TÊN" value={user?.name || user?.gmail || "Chưa cập nhật"} isEditing={false} />
            <InfoRow icon={<MailIcon />} label="EMAIL" value={user?.gmail || "Chưa cập nhật"} isEditing={false} />
            <InfoRow icon={<PhoneIcon />} label="SỐ ĐIỆN THOẠI" value={user?.phone || "Chưa cập nhật"} isEditing={false} />
            <InfoRow icon={<CalendarIcon />} label="NGÀY SINH" value={user?.birth || "Chưa cập nhật"} isEditing={false} />
            <InfoRow icon={<GenderIcon />} label="GIỚI TÍNH" value={user?.gender === "FEMALE" ? "Nữ" : (user?.gender === "MALE" ? "Nam" : "Chưa cập nhật")} isEditing={false} />
            <InfoRow icon={<SchoolIcon />} label="TRƯỜNG HỌC" value={user?.school || "Chưa cập nhật"} isEditing={false} />
          </div>
        </div>

        {/* ── Action Items (Change Password / Form, My Courses, Logout) ── */}
        <div className="mt-4 space-y-3">
          {/* Toggle between Change Password Button and Change Password Form */}
          {!showChangePassword ? (
            <div
              onClick={() => setShowChangePassword(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[var(--border-300)] rounded-[16px] shadow-xs text-sm font-bold text-[var(--text-secondary-600)] hover:bg-[var(--surface-300)] hover:text-[var(--text-primary-500)] transition-all cursor-pointer"
            >
              🔒 Đổi mật khẩu
            </div>
          ) : (
            <div className="bg-white rounded-[20px] border border-[var(--border-300)] shadow-sm overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
              <div className="px-6 py-4 border-b border-[var(--border-200)]">
                <div className="text-sm font-black text-[var(--text-primary-500)] font-[family:var(--font-heading)]">
                  Đổi mật khẩu
                </div>
              </div>
              <form onSubmit={handleSavePassword} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                    />
                    <div
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca59e] hover:text-[var(--text-primary-500)] transition-colors cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                    />
                    <div
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca59e] hover:text-[var(--text-primary-500)] transition-colors cursor-pointer"
                    >
                      {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                    />
                    <div
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca59e] hover:text-[var(--text-primary-500)] transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div
                    onClick={handleCancelPassword}
                    className="flex-1 py-3 bg-white border border-[var(--border-500)] text-sm font-bold text-[var(--text-secondary-600)] rounded-[var(--radius-md)] hover:bg-[var(--surface-300)] active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Hủy
                  </div>
                  <button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="!flex-[2] !py-3 !bg-[#1b3b22] !hover:bg-[#15301b] !disabled:bg-[#1b3b22]/70 !disabled:cursor-not-allowed !text-white !text-sm !font-extrabold !rounded-[var(--radius-md)] !shadow-md !active:scale-95 !transition-all !cursor-pointer !text-center"
                  >
                    {changePasswordMutation.isPending ? "Đang lưu..." : "Lưu mật khẩu"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* My Courses Button */}
          <Link
            to={ROUTES.LEARNER.MY_COURSES}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#eaf4ec] border border-[#d2e8d6] rounded-[16px] shadow-xs text-sm font-bold text-[#1b3b22] hover:bg-[#deede1] transition-all cursor-pointer"
          >
            📚 Khóa học của tôi
          </Link>

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[var(--border-300)] rounded-[16px] shadow-xs text-sm font-bold text-[#DC2626] hover:bg-[#FEF2F2] transition-all cursor-pointer"
          >
            🚪 Đăng xuất
          </div>
        </div>
      </section>

      <PendingSolutionPopup 
        isOpen={showFeaturePending} 
        onClose={() => setShowFeaturePending(false)} 
        title="Tính năng đang phát triển" 
        message="Chức năng chỉnh sửa thông tin cá nhân đang được nâng cấp. Vui lòng quay lại sau!" 
      />
    </div>
  );
}




/* ── Icon SVGs ── */

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-base-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-base-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-base-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-base-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GenderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-base-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-base-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
}
