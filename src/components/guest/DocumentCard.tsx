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
    <div className="relative bg-white rounded-[20px] shadow-sm border border-[#e2e8e3] flex flex-col justify-between h-full hover:shadow-md transition-shadow overflow-hidden group">
      
      {/* VIP Overlay */}
      {isVip && (
        <div className="absolute inset-0 bg-[#f8faf8]/85 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 bg-[#1f1f1c] rounded-full flex items-center justify-center mb-3 shadow-lg">
            <svg className="w-5 h-5 text-[#FFC107] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <p className="text-[#1f1f1c] font-extrabold text-sm mb-4">Chỉ dành cho VIP</p>
        </div>
      )}

      {/* Card Top / Header with color accent */}
      <div className="p-5 flex gap-3.5 border-b border-[#f0f4f1] relative bg-[#f9fbf9] min-h-[128px] items-start">
        {/* Icon block */}
        <div className={`w-11 h-11 rounded-[12px] flex-shrink-0 flex items-center justify-center !text-white font-black text-lg ${iconBg} relative z-10 shadow-xs`}>
          {icon}
        </div>
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <h3 className="text-[15px] font-bold text-[#1f1f1c] leading-snug mb-2 line-clamp-2 min-h-[42px]" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            <span className="px-2 py-0.5 bg-white border border-[#d2dcd4] text-[#333a35] text-[9px] font-extrabold uppercase rounded-md tracking-wider">
              {type}
            </span>
            <span className="px-2 py-0.5 bg-white border border-[#d2dcd4] text-[#333a35] text-[9px] font-extrabold uppercase rounded-md tracking-wider">
              {tag}
            </span>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <p className="text-xs text-[#5c635e] leading-relaxed line-clamp-3 min-h-[54px] mb-5 font-medium">
          {desc}
        </p>
        <button className="w-full text-center py-2.5 rounded-[12px] border border-[#d2dcd4] text-[#333a35] font-extrabold text-sm hover:bg-[#edf4ee] hover:border-[#28522d] hover:text-[#28522d] active:scale-95 transition-all cursor-pointer shadow-xs">
          Tải tài liệu
        </button>
      </div>
    </div>
  );
}
