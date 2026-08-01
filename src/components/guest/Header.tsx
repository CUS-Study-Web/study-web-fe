import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper for NavLink classes to reuse active styling logic
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-full text-sm font-semibold bg-[var(--brand-soft-400)] text-[var(--brand-base-600)] transition"
      : "text-sm font-medium text-[var(--text-primary-500)] hover:text-[var(--brand-base-600)] transition";

  const getMobileNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "px-4 py-2 rounded-full text-sm font-semibold bg-[var(--brand-soft-400)] text-[var(--brand-base-600)]"
      : "px-4 py-2 text-sm font-medium text-[var(--text-primary-500)] hover:bg-[var(--surface-600)] rounded-xl transition";

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface-500)]/95 backdrop-blur-md border-b border-[var(--border-300)] px-4 md:px-8 lg:px-12 xl:px-20 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand-base-600)] flex items-center justify-center text-[var(--neutral-0)] shadow-xs transition-transform group-hover:scale-105">
            {/* Crest SVG */}
            <svg className="w-6 h-6 fill-current text-[var(--neutral-0)]" viewBox="0 0 24 24">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zm-3-8l2.5 2.5 5.5-5.5 1.5 1.5-7 7-4-4 1.5-1.5z" />
            </svg>
          </div>
          <span
            className="text-2xl font-extrabold tracking-tight text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            CUS
          </span>
        </Link>

        {/* Navigation links - Desktop & Tablet */}
        <nav className="hidden lg:flex items-center gap-8">
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
          <button
            className="px-5 py-2.5 text-sm font-semibold bg-[var(--surface-500)] hover:bg-[var(--surface-600)] border border-[var(--border-300)] text-[var(--text-primary-500)] rounded-full transition shadow-xs"
          >
            Đăng nhập
          </button>
          <button
            className="px-5 py-2.5 text-sm font-semibold bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] text-[var(--neutral-0)] rounded-full shadow-xs transition"
          >
            Đăng ký
          </button>
          <button
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold bg-[var(--warning-400)] hover:bg-[var(--warning-500)] text-[var(--text-primary-500)] rounded-full shadow-xs transition"
          >
            {/* Crown Icon */}
            <svg
              className="w-4 h-4 fill-current text-[var(--text-primary-500)]"
              viewBox="0 0 24 24"
            >
              <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
            </svg>
            Tài khoản VIP
          </button>
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {/* VIP Account button on Mobile */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-[var(--warning-400)] text-[var(--text-primary-500)] rounded-full shadow-xs"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M2 22h20v-2H2v2zm1-3h18l-2-9-5 4-2-6-2 6-5-4-2 9z" />
            </svg>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-[var(--surface-600)] text-[var(--text-primary-500)] transition"
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
              className="w-full py-2.5 text-center text-sm font-semibold bg-[var(--surface-500)] border border-[var(--border-300)] text-[var(--text-primary-500)] rounded-full"
            >
              Đăng nhập
            </button>
            <button
              className="w-full py-2.5 text-center text-sm font-semibold bg-[var(--brand-base-600)] text-[var(--neutral-0)] rounded-full"
            >
              Đăng ký
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold bg-[var(--warning-400)] text-[var(--text-primary-500)] rounded-full"
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
