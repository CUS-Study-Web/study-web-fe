import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Link to="/" className="group active:scale-95 transition-transform">
          <Logo size="md" />
        </Link>

        {/* Navigation links - Desktop & Tablet */}
        <nav className="hidden lg:flex items-center gap-2">
          <NavLink to="/" end className={getNavClasses}>
            Trang chủ
          </NavLink>
          <NavLink to="/courses" className={getNavClasses}>
            Khóa học
          </NavLink>
          <NavLink to="/trial" className={getNavClasses}>
            Thi thử
          </NavLink>
          <NavLink to="/documents" className={getNavClasses}>
            Tài liệu
          </NavLink>
          <NavLink to="/about" className={getNavClasses}>
            Giới thiệu
          </NavLink>
        </nav>

        {/* Actions - Desktop & Tablet */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 text-sm font-extrabold bg-[#f4f7f4] hover:bg-[#e6efe8] border border-[var(--border-500)] !text-[#333a35] rounded-[var(--radius-lg)] active:scale-95 transition-all duration-150 shadow-xs cursor-pointer inline-flex items-center justify-center"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-extrabold bg-[#28522d] hover:bg-[#1e4022] !text-white rounded-[var(--radius-lg)] shadow-md shadow-[#28522d]/20 active:scale-95 transition-all duration-150 cursor-pointer inline-flex items-center justify-center"
          >
            Đăng ký
          </Link>
          <Link
            to="/vip"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold bg-gradient-to-b from-[#ffcf33] to-[#e6a800] hover:from-[#ffd54f] hover:to-[#ebaf0a] !text-[#1f1f1c] rounded-[var(--radius-lg)] shadow-md shadow-[#e6a800]/30 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            {/* Crown Icon */}
            <svg
              className="w-4 h-4 fill-current text-[#1f1f1c]"
              viewBox="0 0 24 24"
            >
              <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
            </svg>
            Tài khoản VIP
          </Link>
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-[#FFC107] text-[#1f1f1c] rounded-[12px] shadow-xs"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
            </svg>
          </button>

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

          <button
            aria-label="Search"
            className="p-2 rounded-[var(--radius-md)] hover:bg-[#e6efe8] text-[#333a35] transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[var(--border-300)] flex flex-col gap-4">
          <nav className="flex flex-col gap-1">
            <NavLink to="/" end className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Trang chủ
            </NavLink>
            <NavLink to="/courses" className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Khóa học
            </NavLink>
            <NavLink to="/trial" className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Thi thử
            </NavLink>
            <NavLink to="/documents" className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Tài liệu
            </NavLink>
            <NavLink to="/about" className={getMobileNavClasses} onClick={() => setIsOpen(false)}>
              Giới thiệu
            </NavLink>
          </nav>
          <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border-300)]">
            <button
              className="w-full py-2.5 text-center text-sm font-extrabold bg-[#f4f7f4] border border-[var(--border-500)] !text-[#333a35] rounded-[var(--radius-lg)]"
            >
              Đăng nhập
            </button>
            <button
              className="w-full py-2.5 text-center text-sm font-extrabold bg-[#28522d] !text-white rounded-[var(--radius-lg)] shadow-sm shadow-[#28522d]/20"
            >
              Đăng ký
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-extrabold bg-gradient-to-b from-[#ffcf33] to-[#e6a800] !text-[#1f1f1c] rounded-[var(--radius-lg)] shadow-sm shadow-[#e6a800]/30"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
              </svg>
              Tài khoản VIP
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
