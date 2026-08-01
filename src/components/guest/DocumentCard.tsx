interface DocumentCardProps {
  type: string;
  tag: string;
  title: string;
  desc: string;
  iconBg: string;
  icon: string;
  isVip: boolean;
}

export default function DocumentCard({ type, tag, title, desc, iconBg, icon, isVip }: DocumentCardProps) {
  return (
    <div className="relative bg-[var(--neutral-0)] rounded-[20px] shadow-sm border border-[var(--border-300)] flex flex-col justify-between h-full hover:shadow-md transition-shadow overflow-hidden group">
      
      {/* VIP Overlay - Centered on top of blurred card */}
      {isVip && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[var(--neutral-0)]/40 backdrop-blur-[2px]">
          <div className="w-14 h-14 bg-[var(--text-primary-800)] rounded-full flex items-center justify-center mb-2.5 shadow-lg">
            <svg className="w-6 h-6 text-[#ffc107] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <p className="!text-[var(--text-primary-500)] font-black text-base mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Chỉ dành cho VIP
          </p>
          <button className="flex items-center gap-1.5 px-6 py-2.5 bg-[var(--text-primary-800)] !text-[#ffc107] text-sm font-extrabold rounded-full shadow-md hover:bg-[var(--text-primary-900)] active:scale-95 transition-all cursor-pointer">
            <svg className="w-4 h-4 fill-current text-[#ffc107]" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Đăng ký VIP
          </button>
        </div>
      )}

      {/* Main Card Content - Fully Blurred when isVip */}
      <div className={isVip ? "filter blur-[6px] opacity-35 select-none pointer-events-none flex flex-col justify-between h-full" : "flex flex-col justify-between h-full"}>
        {/* Card Top / Header with color accent */}
        <div className="p-5 flex gap-3.5 border-b border-[var(--border-200)] relative bg-[var(--surface-200)] min-h-[128px] items-start">
          {/* Icon block */}
          <div className={`w-11 h-11 rounded-[12px] flex-shrink-0 flex items-center justify-center !text-white font-black text-lg ${iconBg} relative z-10 shadow-xs`}>
            {icon}
          </div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <h3 className="text-[15px] font-bold !text-[var(--text-primary-500)] leading-snug mb-2 line-clamp-2 min-h-[42px]" style={{ fontFamily: "var(--font-heading)" }}>
              {title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              <span className="px-2 py-0.5 bg-[var(--neutral-0)] border border-[var(--border-300)] !text-[var(--text-secondary-600)] text-[9px] font-extrabold uppercase rounded-md tracking-wider">
                {type}
              </span>
              <span className="px-2 py-0.5 bg-[var(--neutral-0)] border border-[var(--border-300)] !text-[var(--text-secondary-600)] text-[9px] font-extrabold uppercase rounded-md tracking-wider">
                {tag}
              </span>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <p className="text-xs !text-[var(--text-secondary-500)] leading-relaxed line-clamp-3 min-h-[54px] mb-5 font-medium">
            {desc}
          </p>
          <button className="w-full text-center py-2.5 rounded-[12px] border border-[var(--border-500)] !text-[var(--text-secondary-600)] font-extrabold text-sm hover:bg-[var(--brand-soft-300)] hover:border-[var(--brand-base-600)] hover:!text-[var(--brand-base-600)] active:scale-95 transition-all cursor-pointer shadow-xs">
            Tải tài liệu
          </button>
        </div>
      </div>
    </div>
  );
}
