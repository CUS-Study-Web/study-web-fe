interface CourseCardProps {
  title: string;
  tag: string;
  subtitle: string;
  desc: string;
  img: string;
  btnColor: string;
}

export default function CourseCard({ title, tag, subtitle, desc, img, btnColor }: CourseCardProps) {
  return (
    <div className="bg-[var(--neutral-0)] rounded-[24px] overflow-hidden shadow-lg border border-[var(--border-300)] flex flex-col group hover:shadow-xl transition-all duration-300">
      {/* Top Image Section */}
      <div className="relative h-56 w-full">
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-[var(--brand-base-600)] text-[var(--neutral-0)] text-[10px] font-bold px-3 py-1 rounded-full shadow-xs tracking-wide">
          {tag}
        </div>

        {/* Title & Subtitle */}
        <div className="absolute bottom-4 left-4 right-4 text-[var(--neutral-0)]">
          <h3 className="text-3xl font-extrabold tracking-wide mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
          <p className="text-sm font-medium text-[var(--surface-500)] line-clamp-1">{subtitle}</p>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-6">
        <p className="text-[14px] text-[var(--text-secondary-500)] leading-relaxed line-clamp-4">
          {desc}
        </p>
        <button className={`w-full py-3.5 ${btnColor} text-[var(--neutral-0)] font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2`}>
          Vào khóa học <span>→</span>
        </button>
      </div>
    </div>
  );
}
