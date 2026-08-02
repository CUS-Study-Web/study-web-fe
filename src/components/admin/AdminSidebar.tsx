import { NavLink } from 'react-router-dom'

type AdminNavBarProps = {
  onLogout?: () => void,
}

const NAV = [
  { to: '/admin/dashboard', label: 'Trang Chủ' },
  { to: '/admin/system',    label: 'Quản Trị Hệ Thống' },
  { to: '/admin/website',   label: 'Quản Lý Website' },
]

export default function AdminNavBar({ onLogout }: AdminNavBarProps) {
  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[var(--border-500)] shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-[28px] h-[60px] flex items-center gap-[32px]">

        {/* Logo */}
        <div className="flex items-center gap-[8px] shrink-0">
          <div className="w-[32px] h-[32px] rounded-[8px] bg-gradient-to-br from-[var(--brand-500)] to-[var(--brand-700)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 8l10 6 10-6-10-6zM2 16l10 6 10-6M2 12l10 6 10-6" stroke="var(--neutral-0)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="[font-family:var(--font-heading)] font-[800] text-[16px] text-[var(--text-primary)] tracking-[-0.3px]">CUS Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex gap-[4px] flex-1">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `[font-family:var(--font-heading)] font-[600] text-[14px] px-[16px] py-[8px] rounded-[10px] transition-all duration-130 no-underline ${
                  isActive
                    ? 'bg-[var(--success-50)]'
                    : 'hover:bg-[var(--surface-500)]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="flex items-center gap-[12px] shrink-0">
          <div className="flex items-center gap-[7px]">
            <div className="w-[30px] h-[30px] rounded-full bg-[var(--brand-soft-500)] flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="var(--brand-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="[font-family:var(--font-heading)] font-[600] text-[13px] text-[var(--text-primary)]">Quản trị viên</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-[6px] [font-family:var(--font-heading)] font-[600] text-[13px] px-[16px] py-[7px] rounded-[10px] border border-[var(--border-500)] bg-white text-[var(--text-secondary-600)] cursor-pointer transition-all duration-130 hover:bg-[var(--surface-500)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="var(--text-secondary-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Đăng Xuất
          </button>
        </div>

      </div>
    </header>
  )
}
