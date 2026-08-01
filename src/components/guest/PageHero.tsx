import React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-[#18321b] py-16 md:py-20 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-[#28522d]">
      <div className="max-w-[1440px] mx-auto">
        <div className="inline-block bg-[#28522d] border border-[#3c6d42] !text-white rounded-full px-4.5 py-1.5 text-xs md:text-sm font-extrabold mb-5 tracking-wide uppercase shadow-xs">
          {eyebrow}
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-black !text-white mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        <p className={`!text-[#beccbf] max-w-3xl text-base md:text-lg leading-relaxed font-medium ${children ? "mb-10" : ""}`}>
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
