import React from "react";

interface GuestPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  heroExtra?: React.ReactNode;
  children: React.ReactNode;
  padded?: boolean;
  className?: string;
}

export default function GuestPageLayout({
  eyebrow,
  title,
  description,
  heroExtra,
  children,
  padded = true,
  className = "",
}: GuestPageLayoutProps) {
  return (
    <div className={`${padded ? "pb-20" : ""} ${className}`}>
      {/* Header Banner Section */}
      <section className="bg-[#18321b] py-16 md:py-20 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-[var(--brand-base-600)] select-none">
        <div className="max-w-[1440px] mx-auto">
          <div className="inline-block bg-[#28522d] border border-[#3c6d42] !text-white rounded-full px-4.5 py-1.5 text-xs md:text-sm font-extrabold mb-5 tracking-wide uppercase shadow-xs">
            {eyebrow}
          </div>
          <h1
            className="text-h1 font-black !text-white mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="!text-[#beccbf] max-w-3xl text-body-lg leading-relaxed font-medium">
            {description}
          </p>
          {heroExtra && <div className="mt-6">{heroExtra}</div>}
        </div>
      </section>

      {/* Main Content Body */}
      <main>{children}</main>
    </div>
  );
}
