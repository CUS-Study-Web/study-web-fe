import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { ROUTES } from "../../../utils/routes";

interface AuthLayoutProps {
  leftBadge: string;
  leftTitle: string;
  leftDescription: string;
  leftFeatures: string[];
  formTitle: string;
  formSubtitle?: string;
  footerLinkText: string;
  footerLinkTo: string;
  footerLinkLabel: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  leftBadge,
  leftTitle,
  leftDescription,
  leftFeatures,
  formTitle,
  formSubtitle,
  footerLinkText,
  footerLinkTo,
  footerLinkLabel,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--surface-app)] flex flex-col md:flex-row select-none">
      {/* Left Column - Cover & Hero Info */}
      <div className="w-full md:w-1/2 bg-[#18321b] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#122615]/95 via-[#18321b]/92 to-[#28522d]/88 pointer-events-none" />

        {/* Top Header Row in Cover */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <Link to={ROUTES.HOME} className="group">
            <Logo size="md" variant="light" />
          </Link>

          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 !text-white font-bold text-xs rounded-full backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <span>‹</span> Quay lại
          </Link>
        </div>

        {/* Main Left Hero Content */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          <div className="inline-block px-3 py-1 bg-[#254228] text-[#ffc107] border border-[#3e6041] text-xs font-black rounded-full uppercase tracking-wider mb-6">
            {leftBadge}
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight mb-6 !text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {leftTitle}
          </h1>
          <p className="text-base text-[#beccbf] leading-relaxed font-medium mb-8">
            {leftDescription}
          </p>

          {/* Quick Features List */}
          <div className="space-y-3.5 text-sm font-semibold text-[#e8f0e9]">
            {leftFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--brand-base-600)] flex items-center justify-center text-[#ffc107] text-xs font-bold shadow-xs flex-shrink-0">
                  ✓
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info at bottom */}
        <div className="relative z-10 text-xs text-white/50 font-medium mt-8">
          © {new Date().getFullYear()} CUS Education JSC
        </div>
      </div>

      {/* Right Column - Form Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[var(--surface-300)]">
        <div className="w-full max-w-[400px] flex flex-col items-start text-left">
          {/* Logo Badge - Aligned Left */}
          <Logo size="lg" showText={false} className="mb-6 self-start" />

          <h2
            className="text-3xl font-black !text-[var(--text-primary-500)] mb-2 text-left w-full"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {formTitle}
          </h2>

          {formSubtitle && (
            <p className="text-sm font-medium text-[var(--text-secondary-300)] mb-8 text-left w-full">
              {formSubtitle}
            </p>
          )}

          {children}

          {/* Footer Toggle Link */}
          <p className="text-sm font-medium text-[var(--text-secondary-300)] text-left w-full mt-6">
            {footerLinkText}{" "}
            <Link
              to={footerLinkTo}
              className="font-bold !text-[var(--brand-base-600)] underline hover:text-[var(--brand-base-700)]"
            >
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
