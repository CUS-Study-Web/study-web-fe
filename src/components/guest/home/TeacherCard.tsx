import { useState } from "react";

interface TeacherCardProps {
  img: string;
  name: string;
  desc: string;
}

export default function TeacherCard({ img, name, desc }: TeacherCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full h-full bg-[var(--neutral-0)] rounded-[var(--radius-xl)] overflow-hidden shadow-sm border border-[var(--border-200)] flex flex-col group/card hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="w-full aspect-[3/4] relative bg-[var(--surface-500)] overflow-hidden shrink-0">
        {img && !imgError ? (
          <img
            src={img}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--surface-500)] to-[var(--border-200)] text-[var(--text-secondary-400)]">
            <svg className="w-16 h-16 opacity-35 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-semibold opacity-60">Giảng viên CUS</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6 bg-[var(--surface-500)]/30 flex-1 flex flex-col justify-start">
        <div className="text-base md:text-xl font-bold text-[var(--text-primary-500)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          {name}
        </div>

        <div className="text-sm md:text-base text-[var(--text-secondary-400)] leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  );
}
