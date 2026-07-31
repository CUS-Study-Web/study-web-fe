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
    <div className="flex min-h-screen bg-[var(--surface-app)]">
      <AsstSidebar sideOpen={sideOpen} setSideOpen={setSideOpen} onLogout={onLogout} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 bg-[var(--surface-500)] backdrop-blur-[12px] border-b border-[var(--border-default)] px-7 flex items-center justify-between">
          <div>
            <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-lg)] leading-[var(--lh-body-lg)] text-[var(--text-primary)] m-0">
              {pageTitle}
            </div>
            <div className="font-[family-name:var(--font-body)] font-normal text-[length:var(--text-caption)] leading-[var(--lh-caption)] text-[var(--text-secondary)] m-0 mt-0.5">
              Hệ thống quản lý nội dung CUS
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[length:var(--text-body-sm)] leading-[var(--lh-body-sm)] text-[var(--text-primary)]">
                Trợ giảng CUS
              </div>
              <div className="font-[family-name:var(--font-body)] font-normal text-[length:var(--text-caption)] leading-[var(--lh-caption)] text-[var(--text-secondary)]">
                assistant@gmail.com
              </div>
            </div>
            <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-[var(--brand-500)] to-[var(--success-400)] border-2 border-[var(--brand-soft-500)] flex items-center justify-center shrink-0">
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
        <main className="flex-1 flex flex-col min-w-0 p-7 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
