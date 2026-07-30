import { NavLink } from 'react-router-dom';
import { ASST_MENU } from './constants';

interface AsstSidebarProps {
  sideOpen: boolean;
  setSideOpen: (open: boolean) => void;
  onLogout?: () => void;
}

export function AsstSidebar({ sideOpen, setSideOpen, onLogout }: AsstSidebarProps) {
  return (
    <aside
      className="flex flex-col shrink-0 overflow-hidden sticky top-0 h-screen transition-[width] duration-220 ease-out"
      style={{
        width: sideOpen ? 240 : 68,
        background: 'linear-gradient(180deg, #1B2E1E 0%, #2C5A31 100%)',
      }}
    >
      {/* Brand Area */}
      <div className="flex items-center gap-[10px] min-h-[72px] px-4 pt-[22px] pb-4 border-b border-white/10">
        <button
          onClick={() => setSideOpen(!sideOpen)}
          className="w-9 h-9 rounded-[10px] bg-[#DCE9DE] flex items-center justify-center shrink-0 cursor-pointer"
        >
          <span className="font-[800] text-[12px] text-[#2C5A31] font-['Be_Vietnam_Pro']">
            CUS
          </span>
        </button>
        {sideOpen && (
          <span className="font-[700] text-[15px] text-white whitespace-nowrap font-['Be_Vietnam_Pro']">
            Trợ giảng
          </span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-[12px_8px] flex flex-col gap-[2px]">
        {ASST_MENU.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-[12px] py-[11px] rounded-[12px] border-none transition-colors duration-140 font-['Be_Vietnam_Pro'] text-[14px] cursor-pointer
              ${isActive
                ? 'bg-white/15 !text-white font-[700]'
                : 'bg-transparent !text-[rgba(220,233,222,0.75)] font-[500] hover:bg-white/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-[18px] mr-[12px]">{item.icon}</span>
                {sideOpen && <span className="whitespace-nowrap">{item.label}</span>}
                {isActive && sideOpen && (
                  <div className="ml-auto w-[6px] h-[6px] rounded-full bg-[#DCE9DE] shrink-0" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer (Logout) */}
      <div className="p-[12px_8px] border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-[12px] py-[11px] rounded-[12px] border-none transition-colors duration-140 font-['Be_Vietnam_Pro'] text-[14px] cursor-pointer bg-transparent !text-[#F4A0A0] font-[500] hover:bg-[#c94b4b26]"
        >
          <span className="text-[18px] mr-[12px]">🚪</span>
          {sideOpen && <span className="whitespace-nowrap">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
