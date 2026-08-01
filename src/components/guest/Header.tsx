import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper for NavLink classes to reuse active styling logic without layout shift
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-[12px] text-sm font-bold bg-[#e6efe8] !text-[#28522d] transition-all duration-150 shadow-xs"
      : "px-4 py-2 rounded-[12px] text-sm font-medium text-[#333a35] hover:bg-[#edf4ee] hover:text-[#28522d] active:scale-95 transition-all duration-150";

  const getMobileNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-[12px] text-sm font-bold bg-[#e6efe8] !text-[#28522d]"
      : "px-4 py-2 text-sm font-medium text-[#333a35] hover:bg-[#f0f4f1] active:scale-95 rounded-[12px] transition-all duration-150";

  return (
    <header className="sticky top-0 z-50 bg-[#f8faf8]/95 backdrop-blur-md border-b border-[#e2e8e3] px-4 md:px-6 lg:px-8 xl:px-10 py-3.5 select-none">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group active:scale-95 transition-transform">
          <div className="w-10 h-10 rounded-[12px] bg-[#28522d] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
            {/* Crest SVG */}
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-3-8l2.5 2.5 5.5-5.5 1.5 1.5-7 7-4-4 1.5-1.5z" />
            </svg>
          </div>
          <span
            className="text-2xl font-black tracking-tight text-[#1f1f1c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            CUS
          </span>
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
            className="px-5 py-2.5 text-sm font-extrabold bg-[#f4f7f4] hover:bg-[#e6efe8] border border-[#d2dcd4] !text-[#333a35] rounded-[16px] active:scale-95 transition-all duration-150 shadow-xs cursor-pointer inline-flex items-center justify-center"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-extrabold bg-[#28522d] hover:bg-[#1e4022] !text-white rounded-[16px] shadow-md shadow-[#28522d]/20 active:scale-95 transition-all duration-150 cursor-pointer inline-flex items-center justify-center"
          >
            Đăng ký
          </Link>
          <Link
            to="/vip"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold bg-gradient-to-b from-[#ffcf33] to-[#e6a800] hover:from-[#ffd54f] hover:to-[#ebaf0a] !text-[#1f1f1c] rounded-[16px] shadow-md shadow-[#e6a800]/30 active:scale-95 transition-all duration-150 cursor-pointer"
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
            className="p-2 rounded-[12px] hover:bg-[#e6efe8] text-[#333a35] transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[#e2e8e3] flex flex-col gap-4">
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
          <div className="flex flex-col gap-2 pt-2 border-t border-[#e2e8e3]">
            <button
              className="w-full py-2.5 text-center text-sm font-extrabold bg-[#f4f7f4] border border-[#d2dcd4] !text-[#333a35] rounded-[16px]"
            >
              Đăng nhập
            </button>
            <button
              className="w-full py-2.5 text-center text-sm font-extrabold bg-[#28522d] !text-white rounded-[16px] shadow-sm shadow-[#28522d]/20"
            >
              Đăng ký
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-extrabold bg-gradient-to-b from-[#ffcf33] to-[#e6a800] !text-[#1f1f1c] rounded-[16px] shadow-sm shadow-[#e6a800]/30"
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
