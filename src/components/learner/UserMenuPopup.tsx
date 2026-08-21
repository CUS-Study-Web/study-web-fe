import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../utils/routes";
import Avatar from "./Avatar";

export default function UserMenuPopup() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!user) return null;



  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[var(--brand-base-600)]/30 active:scale-95 transition-all duration-150 shadow-sm border-none p-0 bg-transparent"
        aria-label="Mở menu người dùng"
      >
        <Avatar size="sm" />
      </button>

      {/* Dropdown Arrow + Indicator */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer bg-transparent border-none"
        aria-label="Toggle menu"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--brand-base-600)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white border border-[var(--border-300)] rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-[100] animate-[fadeSlideDown_0.15s_ease-out]">
          {/* User Info */}
          <div className="px-5 pt-4 pb-3 border-b border-[var(--border-200)]">
            <div
              className="font-black text-[15px] text-[var(--text-primary-500)] leading-tight font-[family:var(--font-heading)]"
            >
              {user.name}
            </div>
            <div className="text-xs text-[var(--text-secondary-400)] font-medium mt-0.5">
              {user.gmail}
            </div>
          </div>

          {/* Menu Links */}
          <div className="py-1.5">
            <Link
              to={ROUTES.LEARNER.PROFILE}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-300)] hover:text-[var(--text-primary-500)] transition-colors duration-100"
            >
              👤   Cá nhân
            </Link>

            <Link
              to={ROUTES.LEARNER.MY_COURSES}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-300)] hover:text-[var(--text-primary-500)] transition-colors duration-100"
            >
              📚   Khóa học của tôi
            </Link>

            <Link
              to={ROUTES.LEARNER.FLASHCARD_TOPICS}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary-600)] hover:bg-[var(--surface-300)] hover:text-[var(--text-primary-500)] transition-colors duration-100"
            >
              🃏   Flashcard
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-[var(--border-200)] py-1.5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-5 py-2.5 text-sm font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors duration-100 cursor-pointer border-none bg-transparent text-left"
            >
              🚪Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
