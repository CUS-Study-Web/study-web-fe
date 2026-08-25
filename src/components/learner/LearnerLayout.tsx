import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../guest/Logo";
import { ROUTES } from "../../utils/routes";

interface LearnerLayoutProps {
  children: React.ReactNode;
}

export default function LearnerLayout({ children }: LearnerLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.AUTH.LOGIN);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-500)] flex flex-col select-none">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#f8faf8]/95 backdrop-blur-md border-b border-[var(--border-300)] px-4 md:px-6 lg:px-8 xl:px-10 py-3.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link to={ROUTES.HOME} className="group active:scale-95 transition-transform">
            <Logo size="md" />
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-extrabold text-sm text-[var(--text-primary-500)]" style={{ fontFamily: "var(--font-heading)" }}>
                Học viên CUS
              </div>
              <div className="text-xs text-[var(--text-secondary-400)] font-medium">
                student@gmail.com
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-extrabold bg-[var(--surface-500)] hover:bg-[#e6efe8] border border-[var(--border-500)] text-[#333a35] rounded-[var(--radius-md)] active:scale-95 transition-all cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-8">
        {children}
      </main>
    </div>
  );
}
