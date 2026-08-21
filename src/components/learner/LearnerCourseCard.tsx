import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import ProgressBar from "./ProgressBar";

import type { CourseSummaryResponse } from "../../types/api/course.api";

type LearnerCourseCardProps = CourseSummaryResponse & {
  progress?: number;
};

export default function LearnerCourseCard({
  id,
  title,
  badgeTitle,
  description,
  imageUrl,
  progress = 0,
}: LearnerCourseCardProps) {
  return (
    <div className="bg-[var(--brand-base-700)] rounded-[24px] overflow-hidden shadow-lg flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-1 border-none">
      {/* Image Section */}
      <div className="relative h-[220px] w-full overflow-hidden bg-[var(--brand-base-800)]">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60"}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
        />
        {/* Lớp gradient màu xanh nền mờ dần lên trên (Kéo dài xuống dưới 10px để bù trừ sai số pixel khi scale) */}
        <div className="absolute -bottom-[10px] left-0 right-0 h-[calc(50%+10px)] bg-gradient-to-t from-[var(--brand-base-700)] via-[var(--brand-base-700)] via-15% to-transparent" />

        {/* Tag Badge Top Left */}
        <div className="absolute top-4 left-5 bg-white/15 backdrop-blur-md border border-white/40 !text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {badgeTitle}
        </div>

        {/* Course Title Overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="!text-white text-[22px] leading-tight font-black font-[family:var(--font-heading)]">
            {title}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-5">
        {/* Description */}
        <div className="text-sm leading-relaxed font-medium line-clamp-3 !text-[var(--brand-base-100)]">
          {desc}
        </div>

        {/* Progress Bar Section */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between font-bold text-[15px] font-[family:var(--font-heading)]">
            <span className="!text-[var(--brand-base-50)]">Tiến độ</span>
            <span className="!text-[var(--success-300)]">{progress}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>

        {/* Action Button */}
        <Link
          to={ROUTES.LEARNER.SUBJECT_DETAIL(id)}
          className="w-full inline-flex items-center justify-center py-3.5 bg-white/5 hover:bg-white/10 border border-[var(--brand-base-300)] !text-white text-sm font-black rounded-[16px] transition-all cursor-pointer font-[family:var(--font-heading)]"
        >
          Tiếp tục học →
        </Link>
      </div>
    </div>
  );
}
