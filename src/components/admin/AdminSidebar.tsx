import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import Logo from '../guest/Logo'
import { User, LogOut } from 'lucide-react'

type AdminNavBarProps = {
  onLogout?: () => void,
}

const NAV = [
  { to: ROUTES.ADMIN.DASHBOARD, label: 'Trang Chủ' },
  { to: ROUTES.ADMIN.SYSTEM, label: 'Quản Trị Hệ Thống' },
  { to: ROUTES.ADMIN.WEBSITE, label: 'Quản Lý Website' },
]

export default function AdminNavBar({ onLogout }: AdminNavBarProps) {
  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[var(--border-500)] shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto px-7 h-[60px] flex items-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Logo size="sm" showText={false} />
          <span className="[font-family:var(--font-heading)] font-extrabold text-base text-[var(--text-primary)] tracking-[-0.3px]">CUS Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex gap-1 flex-1">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `[font-family:var(--font-heading)] font-semibold text-sm px-4 py-2 rounded-[var(--radius-sm)] transition-colors duration-[var(--motion-fast)] no-underline ${isActive
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
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-[7px]">
            <div className="w-[30px] h-[30px] rounded-full bg-[var(--brand-soft-500)] flex items-center justify-center shrink-0">
              <User className="w-[15px] h-[15px] text-[var(--brand-500)]" />
            </div>
            <span className="[font-family:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)]">Quản trị viên</span>
          </div>
          <div
            onClick={onLogout}
            className="flex items-center gap-1.5 [font-family:var(--font-heading)] font-semibold text-[13px] px-4 py-[7px] rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white text-[var(--text-secondary-600)] cursor-pointer transition-colors duration-[var(--motion-fast)] hover:bg-[var(--surface-500)]"
          >
            <LogOut className="w-3.5 h-3.5 text-[var(--text-secondary-600)]" />
            Đăng Xuất
          </div>
        </div>
      </div>
    </header>
  )
}
