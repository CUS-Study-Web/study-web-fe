import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../utils/routes";
import InfoRow from "../../components/learner/InfoRow";

// Mock data directly on page (similar to assistant/admin components)
const MOCK_USER = {
  name: "Nguyễn Văn An",
  email: "an.nguyen@email.com",
  phone: "0912 345 678",
  birthday: "15/08/2006",
  gender: "Nam",
  school: "THPT Chu Văn An, Hà Nội",
  coursesCount: 2,
  isVip: true,
};

export default function LearnerProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState(MOCK_USER);

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
    alert("Mật khẩu đã được cập nhật thành công!");
    handleCancelPassword();
  };

  return (
    <div className="pb-20 bg-[var(--surface-500)]">
      {/* ── Profile Hero Banner ── */}
      <section className="bg-[#1b3b22] pt-10 pb-36 px-4 md:px-6">
        <div className="max-w-[560px] mx-auto flex flex-col items-center text-center">
          {/* Avatar with edit icon badge */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-[#254d2d] border-2 border-[#3c6d42] flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9cb6a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <button
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white border border-[var(--border-300)] flex items-center justify-center cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Đổi ảnh đại diện"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>

          {/* Name & Email */}
          <h1 className="text-xl font-black !text-white tracking-tight mb-1 font-[family:var(--font-heading)]">
            {user.name}
          </h1>
          <p className="text-xs font-medium !text-[#beccbf] mb-3.5">{user.email}</p>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#254228] border border-[#3c6d42] !text-[#beccbf] text-[11px] font-bold px-3 py-1 rounded-full">
              📗 {user.coursesCount} khóa học
            </span>
            {user.isVip && (
              <span className="inline-flex items-center gap-1 bg-[#3c2e0b] border border-[#6e5005] text-[#ffc107] text-[11px] font-bold px-3 py-1 rounded-full">
                🎯 Học viên tích cực
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Compact Personal Info Card (Overlapping Hero with Glowing White Shadow) ── */}
      <section className="max-w-[560px] mx-auto px-4 -mt-28 relative z-10">
        <div className="bg-white rounded-[20px] border border-white/80 shadow-[0_-12px_35px_rgba(255,255,255,0.7),0_10px_25px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-200)]">
            <h3 className="text-sm font-black text-[var(--text-primary-500)] font-[family:var(--font-heading)]">
              Thông tin cá nhân
            </h3>
            <button 
              onClick={() => setIsEditingInfo(!isEditingInfo)}
              className={`px-4 py-1.5 text-body-sm font-bold rounded-full border active:scale-95 transition-all cursor-pointer ${ /* Tăng nút lên text-body-sm (14px) */
                isEditingInfo 
                  ? "bg-[var(--brand-base-600)] border-[var(--brand-base-600)] !text-white shadow-sm" 
                  : "bg-white border-[var(--brand-base-600)] text-[var(--brand-base-600)] hover:bg-[var(--brand-soft-100)]"
              }`}
            >
              {isEditingInfo ? "Lưu thay đổi" : "Chỉnh sửa thông tin"}
            </button>
          </div>

          {/* Info Rows */}
          <div className="px-6 py-4 space-y-4">
            <InfoRow icon={<PersonIcon />} label="HỌ TÊN" value={user.name} isEditing={isEditingInfo} onChange={(v) => setUser({ ...user, name: v })} />
            <InfoRow icon={<MailIcon />} label="EMAIL" value={user.email} isEditing={isEditingInfo} onChange={(v) => setUser({ ...user, email: v })} />
            <InfoRow icon={<PhoneIcon />} label="SỐ ĐIỆN THOẠI" value={user.phone} isEditing={isEditingInfo} onChange={(v) => setUser({ ...user, phone: v })} />
            <InfoRow icon={<CalendarIcon />} label="NGÀY SINH" value={user.birthday} isEditing={isEditingInfo} onChange={(v) => setUser({ ...user, birthday: v })} />
            <InfoRow icon={<GenderIcon />} label="GIỚI TÍNH" value={user.gender} isEditing={isEditingInfo} onChange={(v) => setUser({ ...user, gender: v })} />
            <InfoRow icon={<SchoolIcon />} label="TRƯỜNG HỌC" value={user.school} isEditing={isEditingInfo} onChange={(v) => setUser({ ...user, school: v })} />
          </div>
        </div>

        {/* ── Action Items (Change Password / Form, My Courses, Logout) ── */}
        <div className="mt-4 space-y-3">
          {/* Toggle between Change Password Button and Change Password Form */}
          {!showChangePassword ? (
            <button
              onClick={() => setShowChangePassword(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[var(--border-300)] rounded-[16px] shadow-xs text-sm font-bold text-[var(--text-secondary-600)] hover:bg-[var(--surface-300)] hover:text-[var(--text-primary-500)] transition-all cursor-pointer"
            >
              🔒 Đổi mật khẩu
            </button>
          ) : (
            <div className="bg-white rounded-[20px] border border-[var(--border-300)] shadow-sm overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
              <div className="px-6 py-4 border-b border-[var(--border-200)]">
                <h3 className="text-sm font-black text-[var(--text-primary-500)] font-[family:var(--font-heading)]">
                  Đổi mật khẩu
                </h3>
              </div>
              <form onSubmit={handleSavePassword} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancelPassword}
                    className="flex-1 py-3 bg-white border border-[var(--border-500)] text-xs font-bold text-[var(--text-secondary-600)] rounded-[var(--radius-md)] hover:bg-[var(--surface-300)] active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-3 bg-[#1b3b22] hover:bg-[#15301b] !text-white text-xs font-extrabold rounded-[var(--radius-md)] shadow-md active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Lưu mật khẩu
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[var(--border-300)] rounded-[16px] shadow-xs text-sm font-bold text-[#DC2626] hover:bg-[#FEF2F2] transition-all cursor-pointer"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </section>
    </div>
  );
}




/* ── Icon SVGs ── */

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28522d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28522d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28522d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28522d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GenderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28522d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28522d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
