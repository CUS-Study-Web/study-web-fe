import { NavLink } from 'react-router-dom';
import { ASSISTANT_MENU } from './constants';
import Logo from '../guest/Logo';

interface AssistantSidebarProps {
  sideOpen: boolean;
  setSideOpen: (open: boolean) => void;
  onLogout?: () => void;
}

export function AssistantSidebar({ sideOpen, setSideOpen, onLogout }: AssistantSidebarProps) {
  return (
    <aside
      className="flex flex-col shrink-0 overflow-hidden sticky top-0 h-screen transition-[width] duration-220 ease-out"
      style={{
        width: sideOpen ? 240 : 68,
        background: 'linear-gradient(180deg, var(--brand-800) 0%, var(--brand-500) 100%)',
      }}
    >
      {/* Brand Area */}
      <div className="flex items-center gap-2.5 min-h-18 px-3.5 pt-5.5 pb-4 border-b border-white/10">
        <button
          onClick={() => setSideOpen(!sideOpen)}
          className="shrink-0 cursor-pointer active:scale-95 transition-transform"
          aria-label="Toggle Sidebar"
        >
          <Logo size="sm" variant="light" showText={false} />
        </button>
        {sideOpen && (
          <span className="font-bold text-[length:var(--text-body)] text-white whitespace-nowrap font-[family-name:var(--font-heading)]">
            Trợ giảng
          </span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {ASSISTANT_MENU.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-[11px] rounded-xl border-none transition-colors duration-140 font-[family-name:var(--font-heading)] text-[length:var(--text-body-sm)] cursor-pointer
              ${isActive
                ? 'bg-white/15 !text-white font-bold'
                : 'bg-transparent !text-[var(--brand-soft-500)] opacity-90 font-medium hover:bg-white/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-[18px] mr-3">{item.icon}</span>
                {sideOpen && <span className="whitespace-nowrap">{item.label}</span>}
                {isActive && sideOpen && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--brand-soft-500)] shrink-0" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer (Logout) */}
      <div className="py-3 px-2 border-t border-white/10">
        <div
          onClick={onLogout}
          className="flex items-center w-full px-3 py-[11px] rounded-xl border-none transition-colors duration-140 font-[family-name:var(--font-heading)] text-[length:var(--text-body-sm)] cursor-pointer bg-transparent !text-[var(--error-200)] font-medium hover:bg-[rgba(201,75,75,0.15)]"
        >
          <span className="text-[18px] mr-3">🚪</span>
          {sideOpen && <span className="whitespace-nowrap">Đăng xuất</span>}
        </div>
      </div>
    </aside>
  );
}

