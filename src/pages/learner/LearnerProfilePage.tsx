import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../utils/routes";
import InfoRow from "../../components/learner/InfoRow";
import Avatar from "../../components/learner/Avatar";
import { useChangePasswordMutation } from "../../hooks/queries/useAuth";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../hooks/queries/useProfile";
import { useNotification } from "../../components/common/NotificationProvider";
import type { UpdateProfileRequest } from "../../types/api/auth.api";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  School,
  Eye,
  EyeOff,
  Lock,
  BookOpen,
  LogOut,
} from "lucide-react";

export default function LearnerProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  // ── Profile data ──────────────────────────────────────────────────────────
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const profile = profileData?.data ?? user;

  // ── Edit profile form ─────────────────────────────────────────────────────
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateProfileRequest>({});
  const updateProfileMutation = useUpdateProfileMutation();

  const openEdit = () => {
    setEditForm({
      name: profile?.name || '',
      phone: profile?.phone || '',
      birth: profile?.birth || '',
      gender: (profile?.gender as 'MALE' | 'FEMALE' | '') || '',
      school: profile?.school || '',
    });
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: UpdateProfileRequest = {};
    if (editForm.name !== undefined) payload.name = editForm.name;
    if (editForm.phone !== undefined) payload.phone = editForm.phone;
    if (editForm.birth) payload.birth = editForm.birth;
    if (editForm.gender) payload.gender = editForm.gender as 'MALE' | 'FEMALE';
    if (editForm.school !== undefined) payload.school = editForm.school;

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        setTimeout(() => {
          showSuccess("Thông tin đã được cập nhật thành công!");
          setIsEditing(false);
        }, 300);
      },
      onError: (error: any) => {
        setTimeout(() => {
          showError(error?.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!");
        }, 300);
      },
    });
  };

  // ── Change password ───────────────────────────────────────────────────────
  const changePasswordMutation = useChangePasswordMutation();
  const [showChangePassword, setShowChangePassword] = useState(false);
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

  const genderLabel = (g?: string) => {
    if (g === 'MALE') return 'Nam';
    if (g === 'FEMALE') return 'Nữ';
    return 'Chưa cập nhật';
  };

  return (
    <div className="pb-20 bg-[var(--surface-500)]">
      {/* ── Profile Hero Banner ── */}
      <section className="bg-[#1b3b22] pt-10 pb-36 px-4 md:px-6">
        <div className="max-w-[560px] mx-auto flex flex-col items-center text-center">
          <Avatar size="lg" showEdit className="mb-4" />
          <div className="text-xl font-black !text-white tracking-tight mb-1 font-[family:var(--font-heading)]">
            {isLoadingProfile ? '...' : (profile?.name || profile?.gmail)}
          </div>
          <div className="text-xs font-medium !text-[var(--brand-base-100)] mb-3.5">{profile?.gmail}</div>
        </div>
      </section>

      {/* ── Personal Info Card ── */}
      <section className="max-w-[560px] mx-auto px-4 -mt-28 relative z-10">
        <div className="bg-white rounded-[20px] border border-white/80 shadow-[0_10px_25px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-200)]">
            <div className="text-sm font-black text-[var(--text-primary-500)] font-[family:var(--font-heading)]">
              Thông tin cá nhân
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={openEdit}
                className="px-4 py-1.5 text-body-sm font-bold rounded-full border active:scale-95 transition-all cursor-pointer bg-white border-[var(--brand-base-600)] text-[var(--brand-base-600)] hover:bg-[var(--brand-soft-100)]"
              >
                Chỉnh sửa thông tin
              </button>
            )}
          </div>

          {/* View mode */}
          {!isEditing && (
            <div className="px-6 py-4 space-y-4">
              <InfoRow icon={<User className="w-[15px] h-[15px] text-[var(--brand-base-600)]" />} label="HỌ TÊN" value={profile?.name || "Chưa cập nhật"} isEditing={false} />
              <InfoRow icon={<Mail className="w-[15px] h-[15px] text-[var(--brand-base-600)]" />} label="EMAIL" value={profile?.gmail || "Chưa cập nhật"} isEditing={false} />
              <InfoRow icon={<Phone className="w-[15px] h-[15px] text-[var(--brand-base-600)]" />} label="SỐ ĐIỆN THOẠI" value={profile?.phone || "Chưa cập nhật"} isEditing={false} />
              <InfoRow icon={<Calendar className="w-[15px] h-[15px] text-[var(--brand-base-600)]" />} label="NGÀY SINH" value={profile?.birth || "Chưa cập nhật"} isEditing={false} />
              <InfoRow icon={<Users className="w-[15px] h-[15px] text-[var(--brand-base-600)]" />} label="GIỚI TÍNH" value={genderLabel(profile?.gender)} isEditing={false} />
              <InfoRow icon={<School className="w-[15px] h-[15px] text-[var(--brand-base-600)]" />} label="TRƯỜNG HỌC" value={profile?.school || "Chưa cập nhật"} isEditing={false} />
            </div>
          )}

          {/* Edit mode */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Họ tên</label>
                <input
                  type="text"
                  maxLength={150}
                  value={editForm.name ?? ''}
                  onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Số điện thoại</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={editForm.phone ?? ''}
                  onChange={(e) => setEditForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="10 chữ số"
                  className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Ngày sinh</label>
                <input
                  type="date"
                  value={editForm.birth ?? ''}
                  onChange={(e) => setEditForm(f => ({ ...f, birth: e.target.value }))}
                  className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Giới tính</label>
                <select
                  value={editForm.gender ?? ''}
                  onChange={(e) => setEditForm(f => ({ ...f, gender: e.target.value as 'MALE' | 'FEMALE' | '' }))}
                  className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                >
                  <option value="">-- Chọn giới tính --</option>
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Trường học</label>
                <input
                  type="text"
                  maxLength={150}
                  value={editForm.school ?? ''}
                  onChange={(e) => setEditForm(f => ({ ...f, school: e.target.value }))}
                  className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 text-sm text-[var(--text-primary-500)] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-white border border-[var(--border-500)] text-sm font-bold text-[var(--text-secondary-600)] rounded-[var(--radius-md)] hover:bg-[var(--surface-300)] active:scale-95 transition-all cursor-pointer text-center"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="flex-[2] py-3 bg-[#1b3b22] hover:bg-[#15301b] disabled:bg-[#1b3b22]/70 disabled:cursor-not-allowed !text-white text-sm font-extrabold rounded-[var(--radius-md)] shadow-md active:scale-95 transition-all cursor-pointer text-center"
                >
                  {updateProfileMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── Action Items ── */}
        <div className="mt-4 space-y-3">
          {!showChangePassword ? (
            <div
              onClick={() => setShowChangePassword(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[var(--border-300)] rounded-[16px] shadow-xs text-sm font-bold text-[var(--text-secondary-600)] hover:bg-[var(--surface-300)] hover:text-[var(--text-primary-500)] transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Đổi mật khẩu</span>
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
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Mật khẩu hiện tại</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                    />
                    <div onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca59e] hover:text-[var(--text-primary-500)] transition-colors cursor-pointer">
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                    />
                    <div onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca59e] hover:text-[var(--text-primary-500)] transition-colors cursor-pointer">
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[var(--text-secondary-400)] uppercase tracking-wider mb-1.5">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[var(--surface-300)] border border-[var(--border-400)] rounded-[var(--radius-md)] py-2.5 px-3.5 pr-10 text-sm text-[var(--text-primary-500)] placeholder-[#9ca59e] focus:border-[var(--brand-base-600)] focus:ring-1 focus:ring-[var(--brand-base-600)] outline-none transition font-medium"
                    />
                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca59e] hover:text-[var(--text-primary-500)] transition-colors cursor-pointer">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div onClick={handleCancelPassword} className="flex-1 py-3 bg-white border border-[var(--border-500)] text-sm font-bold text-[var(--text-secondary-600)] rounded-[var(--radius-md)] hover:bg-[var(--surface-300)] active:scale-95 transition-all cursor-pointer text-center">
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

          <Link
            to={ROUTES.LEARNER.MY_COURSES}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#eaf4ec] border border-[#d2e8d6] rounded-[16px] shadow-xs text-sm font-bold text-[#1b3b22] hover:bg-[#deede1] transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Khóa học của tôi</span>
          </Link>

          <div
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[var(--border-300)] rounded-[16px] shadow-xs text-sm font-bold text-[#DC2626] hover:bg-[#FEF2F2] transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </div>
        </div>
      </section>
    </div>
  );
}
