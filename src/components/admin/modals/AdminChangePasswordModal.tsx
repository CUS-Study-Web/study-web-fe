import { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
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

  const inpWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inpStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 40px 11px 14px',
    borderRadius: 11,
    border: '1.5px solid #D4DCD5',
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: 14,
    color: '#1B1F1C',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#FAFCFA',
    transition: 'border-color 140ms ease, box-shadow 140ms ease',
  };

  const eyeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    right: 10,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7E8B82',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Be Vietnam Pro', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: '#3D4540',
    marginBottom: 6,
    display: 'block',
  };

  const adminEmail = user?.gmail || 'admin@gmail.com';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 24, 20, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 22,
          width: '100%',
          maxWidth: 480,
          boxShadow: '0 28px 72px rgba(0,0,0,0.24)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2C5A31, #1e4023)',
            padding: '22px 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  color: '#fff',
                }}
              >
                Đổi mật khẩu Quản trị viên
              </div>
              <div
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontSize: 12,
                  color: 'rgba(220,233,222,0.85)',
                  marginTop: 2,
                }}
              >
                Tài khoản: {adminEmail}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng modal"
            style={{
              background: 'rgba(255,255,255,0.14)',
              border: 'none',
              borderRadius: 8,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              fontSize: 18,
              transition: 'background 130ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'rgba(255,255,255,0.14)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div style={{ padding: '36px 32px 30px', textAlign: 'center' }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#DCE9DE',
                color: '#2C5A31',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: '#1B1F1C',
                margin: '0 0 8px',
              }}
            >
              Đổi mật khẩu thành công!
            </h3>
            <p
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontSize: 13.5,
                color: '#6B746D',
                margin: '0 0 24px',
                lineHeight: 1.55,
              }}
            >
              Mật khẩu quản trị viên đã được cập nhật thành công. Vui lòng sử dụng mật
              khẩu mới cho các lần đăng nhập tiếp theo vào hệ thống CUS.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                padding: '11px 32px',
                borderRadius: 12,
                border: 'none',
                background: '#2C5A31',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(44,90,49,0.22)',
              }}
            >
              Hoàn tất
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '24px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {error && (
              <div
                style={{
                  background: '#FDF2F2',
                  border: '1px solid #F9D5D5',
                  borderRadius: 10,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: '#C94B4B',
                  fontSize: 13,
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Mật khẩu hiện tại */}
            <div>
              <label style={labelStyle}>
                Mật khẩu hiện tại <span style={{ color: '#C94B4B' }}>*</span>
              </label>
              <div style={inpWrapperStyle}>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setError('');
                  }}
                  style={inpStyle}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#2C5A31';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#D4DCD5';
                  }}
                />
                <button
                  type="button"
                  style={eyeBtnStyle}
                  onClick={() => setShowCurrent(!showCurrent)}
                  title={showCurrent ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showCurrent ? (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div>
              <label style={labelStyle}>
                Mật khẩu mới <span style={{ color: '#C94B4B' }}>*</span>
              </label>
              <div style={inpWrapperStyle}>
                <input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Tối thiểu 8 ký tự"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  style={inpStyle}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#2C5A31';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#D4DCD5';
                  }}
                />
                <button
                  type="button"
                  style={eyeBtnStyle}
                  onClick={() => setShowNew(!showNew)}
                  title={showNew ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showNew ? (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <div
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontSize: 11.5,
                  color: '#7E8B82',
                  marginTop: 4,
                }}
              >
                Gợi ý: Mật khẩu nên gồm cả chữ và số để tăng cường bảo mật.
              </div>
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div>
              <label style={labelStyle}>
                Xác nhận mật khẩu mới <span style={{ color: '#C94B4B' }}>*</span>
              </label>
              <div style={inpWrapperStyle}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  style={inpStyle}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#2C5A31';
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = '#D4DCD5';
                  }}
                />
                <button
                  type="button"
                  style={eyeBtnStyle}
                  onClick={() => setShowConfirm(!showConfirm)}
                  title={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showConfirm ? (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'flex-end',
                marginTop: 6,
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '9px 20px',
                  borderRadius: 10,
                  border: '1.5px solid #D4DCD5',
                  background: '#fff',
                  color: '#3D4540',
                  cursor: 'pointer',
                }}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '9px 22px',
                  borderRadius: 10,
                  border: 'none',
                  background: isLoading ? '#6F9473' : '#2C5A31',
                  color: '#fff',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(44,90,49,0.22)',
                }}
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
