import React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-[var(--brand-base-700)] py-16 md:py-20 px-4 md:px-8 lg:px-12 xl:px-20 text-[var(--neutral-0)]">
      <div className="max-w-7xl mx-auto">
        <div className="inline-block bg-[var(--brand-base-600)] bg-opacity-60 border border-[var(--brand-base-500)] text-[var(--surface-300)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-5 tracking-wide uppercase">
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h1>
        <p className={`text-[var(--brand-soft-300)] max-w-2xl text-base md:text-lg leading-relaxed font-medium ${children ? "mb-10" : ""}`}>
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
