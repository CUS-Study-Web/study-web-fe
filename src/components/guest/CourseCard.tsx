import { Link } from "react-router-dom";

interface CourseCardProps {
  id?: string;
  title: string;
  tag: string;
  subtitle: string;
  desc: string;
  img: string;
  btnColor: string;
}

export default function CourseCard({ id, title, tag, subtitle, desc, img, btnColor }: CourseCardProps) {
  const courseSlug = id || title.toLowerCase();

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-lg border border-[var(--border-300)] flex flex-col group hover:shadow-xl transition-all duration-300">
      {/* Top Image Section */}
      <div className="relative h-56 w-full">
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20"></div>
        
        {/* Badge Tag matching theme color */}
        <div className={`absolute top-4 left-4 ${btnColor} !text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-full shadow-xs tracking-wide uppercase`}>
          {tag}
        </div>

        {/* Title & Subtitle - Bright Pure White & Light Tint Text */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-3xl font-black tracking-wide mb-1 !text-white drop-shadow-sm" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h3>
          <p className="text-sm font-semibold !text-[#e2e8e3] line-clamp-1 drop-shadow-sm">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-6">
        <p className="text-[14px] !text-[var(--text-secondary-600)] leading-relaxed line-clamp-4 min-h-[80px] font-medium">
          {desc}
        </p>
        <Link
          to={`/courses/${courseSlug}`}
          className={`w-full py-3.5 ${btnColor} !text-white font-extrabold rounded-[14px] shadow-md hover:shadow-lg active:scale-95 transition-all text-base flex items-center justify-center gap-2 cursor-pointer`}
        >
          Vào khóa học <span className="text-lg font-bold">→</span>
        </Link>
      </div>
    </div>
  );
}
