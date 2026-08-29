import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

interface DocumentCardProps {
  id: string;
  type: string;
  tag: string;
  title: string;
  desc: string;
  iconBg?: string; // Kept for backward compatibility but overridden by theme
  isVip: boolean;
  index?: number;
  pages?: number;
  downloads?: number;
  createdAt?: string;
}

const COLOR_THEMES = [
  { // 0: xanh lá đậm
    headerBg: "bg-[#eaf1eb]",
    primaryBg: "bg-[#244f2b]",
    primaryText: "text-[#244f2b]",
    hoverPrimaryBg: "hover:bg-[#1a3a1f]",
  },
  { // 1: xanh dương
    headerBg: "bg-[#eff4fb]",
    primaryBg: "bg-[#2e62a6]",
    primaryText: "text-[#2e62a6]",
    hoverPrimaryBg: "hover:bg-[#204a82]",
  },
  { // 2: cam
    headerBg: "bg-[#fdf4eb]",
    primaryBg: "bg-[#bc7b2b]",
    primaryText: "text-[#bc7b2b]",
    hoverPrimaryBg: "hover:bg-[#915c1e]",
  },
  { // 3: đỏ
    headerBg: "bg-[#fef2f2]",
    primaryBg: "bg-[#dc2626]",
    primaryText: "text-[#dc2626]",
    hoverPrimaryBg: "hover:bg-[#b91c1c]",
  },
  { // 4: hồng
    headerBg: "bg-[#fdf2f8]",
    primaryBg: "bg-[#db2777]",
    primaryText: "text-[#db2777]",
    hoverPrimaryBg: "hover:bg-[#be185d]",
  },
  { // 5: xanh lá sáng
    headerBg: "bg-[#f0fdf4]",
    primaryBg: "bg-[#16a34a]",
    primaryText: "text-[#16a34a]",
    hoverPrimaryBg: "hover:bg-[#15803d]",
  },
  { // 6: tím
    headerBg: "bg-[#faf5ff]",
    primaryBg: "bg-[#9333ea]",
    primaryText: "text-[#9333ea]",
    hoverPrimaryBg: "hover:bg-[#7e22ce]",
  },
];

export default function DocumentCard({
  id, type, tag, title, desc, isVip,
  index = 0, pages = 48, downloads = 12400, createdAt
}: DocumentCardProps) {

  const theme = COLOR_THEMES[index % COLOR_THEMES.length];

  return (
    <div className="relative bg-[var(--neutral-0)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--border-300)] flex flex-col justify-between h-full hover:shadow-md transition-shadow overflow-hidden group">

      {/* VIP Overlay - Centered on top of blurred card */}
      {isVip && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[var(--neutral-0)]/40 backdrop-blur-[2px]">
          <div className="w-14 h-14 bg-[var(--text-primary-800)] rounded-full flex items-center justify-center mb-2.5 shadow-lg">
            <svg className="w-6 h-6 text-[#ffc107] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <p className="text-body-lg !text-[var(--text-primary-500)] font-black mb-3">
            Chỉ dành cho VIP
          </p>
          <Link
            to={ROUTES.VIP}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[var(--text-primary-800)] !text-[#ffc107] text-sm font-extrabold rounded-full shadow-md hover:bg-[var(--text-primary-900)] active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-[#ffc107]" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Đăng ký VIP
          </Link>
        </div>
      )}

      {/* Main Card Content - Fully Blurred when isVip */}
      <div className={isVip ? "filter blur-[6px] opacity-35 select-none pointer-events-none flex flex-col justify-between h-full" : "flex flex-col justify-between h-full"}>
        {/* Card Top / Header with color accent */}
        <div className={`p-5 flex gap-3.5 relative items-start ${theme.headerBg}`}>
          {/* Icon block */}
          <div className={`w-11 h-11 rounded-[var(--radius-md)] flex-shrink-0 flex items-center justify-center !text-white font-black text-lg ${theme.primaryBg} relative z-10 shadow-xs`}>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2857 1.33334H3.71429C2.21523 1.33334 1 2.52827 1 4.00001V20C1 21.4717 2.21523 22.6667 3.71429 22.6667H16.2857C17.7848 22.6667 19 21.4717 19 20V7.88236L12.2857 1.33334Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            <div className="text-base md:text-body-lg font-bold !text-[var(--text-primary-800)] leading-[1.4] mb-2.5 line-clamp-2 min-h-[46px]">
              {title}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className={`px-2.5 py-0.5 bg-white ${theme.primaryText} text-[11px] font-extrabold rounded-full tracking-wide shadow-sm`}>
                {type}
              </span>
              <span className={`px-2.5 py-0.5 bg-white ${theme.primaryText} text-[11px] font-extrabold rounded-full tracking-wide shadow-sm`}>
                {tag}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <p className="text-sm !text-[#666666] leading-relaxed line-clamp-3 min-h-[60px] mb-4 font-medium">
            {desc}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#8a8a8a] mb-5 px-1">
            <div className="flex items-center gap-1.5">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.71429 1H2.57143C1.70357 1 1 1.70357 1 2.57143V11.4286C1 12.2964 1.70357 13 2.57143 13H9.42857C10.2964 13 11 12.2964 11 11.4286V4.28571L7.71429 1Z" fill="#C4C4C4" />
              </svg>
              <span>{pages} trang</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 11L1 7H3.5V1H6.5V7H9L5 11Z" fill="#C4C4C4" />
              </svg>
              <span>{downloads.toLocaleString("vi-VN")}</span>
            </div>
            {createdAt && (
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4C4C4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{new Date(createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
            )}
          </div>

          <Link to={ROUTES.DOC_VIEW(id)} state={{ colorIndex: index }} className={`w-full block text-center py-2.5 rounded-[var(--radius-md)] !text-white font-extrabold text-sm ${theme.primaryBg} ${theme.hoverPrimaryBg} active:scale-95 transition-all cursor-pointer shadow-sm`}>
            Xem tài liệu
          </Link>
        </div>
      </div>
    </div>
  );
}
