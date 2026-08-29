import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../contexts/AuthContext";
import UserMenuPopup from "../learner/UserMenuPopup";
import NotificationDropdown from "../learner/NotificationDropdown";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  
  const isTrialActive = location.pathname.startsWith('/trial') || location.pathname.includes('/courses/trial/subjects/exam');
  
  const isVip = user?.isVip;

  const vipButtonClass = isVip
    ? "flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold bg-[#1f1f1c] hover:bg-[#33332d] !text-[#ffcf33] rounded-[var(--radius-lg)] shadow-md shadow-[#1f1f1c]/30 active:scale-95 transition-all duration-150 cursor-pointer"
    : "flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold bg-gradient-to-b from-[#ffcf33] to-[#e6a800] hover:from-[#ffd54f] hover:to-[#ebaf0a] !text-[#1f1f1c] rounded-[var(--radius-lg)] shadow-md shadow-[#e6a800]/30 active:scale-95 transition-all duration-150 cursor-pointer";

  const vipIconClass = isVip ? "w-4 h-4 fill-current text-[#ffcf33]" : "w-4 h-4 fill-current text-[#1f1f1c]";
  const vipButtonText = isVip ? "Vip" : "Tài khoản VIP";

  // Helper for NavLink classes to reuse active styling logic without layout shift
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-[var(--radius-md)] text-sm font-bold bg-[#e6efe8] !text-[#28522d] transition-all duration-150 shadow-xs"
      : "px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium text-[#333a35] hover:bg-[#edf4ee] hover:text-[#28522d] active:scale-95 transition-all duration-150";

  const getMobileNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-[var(--radius-md)] text-sm font-bold bg-[#e6efe8] !text-[#28522d]"
      : "px-4 py-2 text-sm font-medium text-[#333a35] hover:bg-[#f0f4f1] active:scale-95 rounded-[var(--radius-md)] transition-all duration-150";

  return (
    <header className="sticky top-0 z-50 bg-[#f8faf8]/95 backdrop-blur-md border-b border-[var(--border-300)] px-4 md:px-6 lg:px-8 xl:px-10 py-3.5 select-none">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="group active:scale-95 transition-transform">
          <Logo size="md" />
        </Link>

        {/* Navigation links - Desktop & Tablet */}
        <nav className="hidden lg:flex items-center gap-2">
          <NavLink to={ROUTES.HOME} end className={getNavClasses}>
            Trang chủ
          </NavLink>
          <NavLink to={ROUTES.COURSES} className={getNavClasses}>
            Khóa học
          </NavLink>
          <NavLink to={ROUTES.TRIAL} className={() => getNavClasses({ isActive: isTrialActive })}>
            Thi thử
          </NavLink>
          <NavLink to={ROUTES.UNDER_DEVELOPMENT} className={getNavClasses}>
            Tài liệu
          </NavLink>
          <NavLink to={ROUTES.ABOUT} className={getNavClasses}>
            Giới thiệu
          </NavLink>
        </nav>

        {/* Actions - Desktop & Tablet */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* VIP Badge + User Menu when logged in */}
              <Link
                to={ROUTES.VIP}
                className={vipButtonClass}
              >
                <svg className={vipIconClass} viewBox="0 0 24 24">
                  <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
                </svg>
                {vipButtonText}
              </Link>
              <NotificationDropdown />
              <UserMenuPopup />
            </>
          ) : (
            <>
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="px-5 py-2.5 text-sm font-extrabold bg-[#f4f7f4] hover:bg-[#e6efe8] border border-[var(--border-500)] !text-[#333a35] rounded-[var(--radius-lg)] active:scale-95 transition-all duration-150 shadow-xs cursor-pointer inline-flex items-center justify-center"
              >
                Đăng nhập
              </Link>
              <Link
                to={ROUTES.AUTH.REGISTER}
                className="px-5 py-2.5 text-sm font-extrabold bg-[#28522d] hover:bg-[#1e4022] !text-white rounded-[var(--radius-lg)] shadow-md shadow-[#28522d]/20 active:scale-95 transition-all duration-150 cursor-pointer inline-flex items-center justify-center"
              >
                Đăng ký
              </Link>
              <Link
                to={ROUTES.VIP}
                className={vipButtonClass}
              >
                {/* Crown Icon */}
                <svg className={vipIconClass} viewBox="0 0 24 24">
                  <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
                </svg>
                {vipButtonText}
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {isLoggedIn ? (
            <div className="md:hidden flex items-center gap-1">
              <NotificationDropdown />
              <UserMenuPopup />
            </div>
          ) : (
            <Link
              to={ROUTES.VIP}
              className="md:hidden flex items-center justify-center w-10 h-10 bg-[#FFC107] text-[#1f1f1c] rounded-[12px] shadow-xs"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
              </svg>
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-10 h-10 bg-[#FFC107] text-[#1f1f1c] rounded-[var(--radius-md)] shadow-xs"
          >
            {isOpen ? (
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[var(--border-300)] flex flex-col gap-4">
          <nav className="flex flex-col gap-1">
            <NavLink to={ROUTES.HOME} end className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Trang chủ
            </NavLink>
            <NavLink to={ROUTES.COURSES} className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Khóa học
            </NavLink>
            <NavLink to={ROUTES.TRIAL} className={() => getMobileNavClasses({ isActive: isTrialActive })} onClick={() => setIsOpen(false)}>
              Thi thử
            </NavLink>
            <NavLink to={ROUTES.UNDER_DEVELOPMENT} className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Tài liệu
            </NavLink>
            <NavLink to={ROUTES.ABOUT} className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Giới thiệu
            </NavLink>
          </nav>
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border-300)]">
              <Link
                to={ROUTES.AUTH.LOGIN}
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center text-sm font-extrabold bg-[#f4f7f4] border border-[var(--border-500)] !text-[#333a35] rounded-[var(--radius-lg)]"
              >
                Đăng nhập
              </Link>
              <Link
                to={ROUTES.AUTH.REGISTER}
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-center text-sm font-extrabold bg-[#28522d] !text-white rounded-[var(--radius-lg)] shadow-sm shadow-[#28522d]/20"
              >
                Đăng ký
              </Link>
              <Link
                to={ROUTES.VIP}
                onClick={() => setIsOpen(false)}
                className={vipButtonClass + " w-full justify-center"}
              >
                <svg className={vipIconClass} viewBox="0 0 24 24">
                  <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
                </svg>
                {vipButtonText}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
