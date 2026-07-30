import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AsstSidebar } from './AsstSidebar';
import { ASST_MENU } from './constants';

interface AssistantLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export default function AssistantLayout({ children, onLogout }: AssistantLayoutProps) {
  const [sideOpen, setSideOpen] = useState(true);
  const location = useLocation();

  const currentMenu = ASST_MENU.find((m) => location.pathname.startsWith(m.path));
  const pageTitle = currentMenu?.label || 'Trợ giảng';

  return (
    <div className="flex min-h-screen bg-[#F0F4F1]">
      <AsstSidebar sideOpen={sideOpen} setSideOpen={setSideOpen} onLogout={onLogout} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-[64px] bg-[#f4f7f4f2] backdrop-blur-[12px] border-b border-[#D4DCD5] px-[28px] flex items-center justify-between">
          <div>
            <div className="font-['Be_Vietnam_Pro'] font-[700] text-[17px] text-[#1B1F1C] m-0">
              {pageTitle}
            </div>
            <div className="font-['Noto_Sans'] font-[400] text-[12px] text-[#6B746D] m-0 mt-0.5">
              Hệ thống quản lý nội dung CUS
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="text-right">
              <div className="font-['Be_Vietnam_Pro'] font-[600] text-[14px] text-[#1B1F1C]">
                Trợ giảng CUS
              </div>
              <div className="font-['Noto_Sans'] font-[400] text-[13px] text-[#6B746D]">
                assistant@gmail.com
              </div>
            </div>
            <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2C5A31] to-[#5A9E62] border-2 border-[#DCE9DE] flex items-center justify-center shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 p-[28px] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
