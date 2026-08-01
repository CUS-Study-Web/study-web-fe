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
    <div className="relative bg-[var(--neutral-0)] rounded-[20px] shadow-sm border border-[var(--border-300)] flex flex-col hover:shadow-md transition-shadow overflow-hidden group">
      
      {/* VIP Overlay */}
      {isVip && (
        <div className="absolute inset-0 bg-[var(--surface-500)]/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 bg-[var(--text-primary-800)] rounded-full flex items-center justify-center mb-3 shadow-lg">
            <svg className="w-5 h-5 text-[var(--warning-400)] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <p className="text-[var(--text-primary-800)] font-bold text-sm mb-4">Chỉ dành cho VIP</p>
        </div>
      )}

      {/* Card Top / Header */}
      <div className="p-5 flex gap-4 border-b border-[var(--border-200)] relative">
        {/* Background colored tint */}
        <div className={`absolute inset-0 opacity-10 ${iconBg}`}></div>
        
        {/* Icon block */}
        <div className={`w-12 h-12 rounded-[12px] flex-shrink-0 flex items-center justify-center text-[var(--neutral-0)] font-bold text-lg ${iconBg} relative z-10 shadow-sm`}>
          {icon}
        </div>
        
        <div className="relative z-10">
          <h3 className="text-[15px] font-bold text-[var(--text-primary-500)] leading-snug mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h3>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-[var(--surface-500)] border border-[var(--border-300)] text-[var(--text-secondary-500)] text-[9px] font-bold uppercase rounded-md tracking-wide">
              {type}
            </span>
            <span className="px-2 py-0.5 bg-[var(--surface-500)] border border-[var(--border-300)] text-[var(--text-secondary-500)] text-[9px] font-bold uppercase rounded-md tracking-wide">
              {tag}
            </span>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-5">
        <p className="text-sm text-[var(--text-secondary-500)] leading-relaxed line-clamp-3 mb-6">
          {desc}
        </p>
        <button className="w-full text-center py-2.5 rounded-lg border border-[var(--brand-base-500)] text-[var(--brand-base-600)] font-bold text-sm hover:bg-[var(--brand-base-50)] transition">
          Tải tài liệu
        </button>
      </div>
    </div>
  );
}
