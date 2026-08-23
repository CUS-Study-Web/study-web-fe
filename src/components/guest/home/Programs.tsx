import { useRef } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

import { useGetCoursesQuery } from "../../../hooks/queries/useCourses";

export default function Programs() {
  const { data: coursesData, isLoading } = useGetCoursesQuery({ size: 10 });
  const courses = coursesData?.data || [];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="py-12 md:py-16 lg:py-20 bg-[var(--surface-400)] relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block bg-[var(--brand-soft-200)] border border-[var(--brand-base-200)] !text-[var(--brand-base-800)] rounded-full px-4 py-1.5 text-xs md:text-sm font-extrabold mb-4">
            CHƯƠNG TRÌNH HỌC
          </div>
          <h2
            className="text-3xl md:text-5xl font-black !text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            5 chương trình luyện thi tại CUS
          </h2>
          <p
            className="mt-4 text-base md:text-lg !text-[var(--text-secondary-700)] max-w-2xl mx-auto leading-relaxed font-bold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Lộ trình bài bản, lớp học tinh gọn và đội ngũ giảng viên tận tâm — dành riêng cho từng kỳ thi Đánh giá Năng lực.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group px-4 md:px-0">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] !text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Scrollable List */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex gap-5 scroll-smooth pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory"
          >
            {isLoading ? (
              <div className="w-full text-center py-10 !text-[var(--text-secondary-500)] [font-family:var(--font-body)]">Đang tải danh sách chương trình học...</div>
            ) : (
              courses.map((c) => (
                <div
                  key={c.id}
                  className="w-[280px] sm:w-[310px] md:w-[330px] flex-shrink-0 relative aspect-[3/4] rounded-[var(--radius-xl)] overflow-hidden shadow-lg border border-[var(--border-300)] snap-start group/card hover:shadow-xl transition-all duration-300"
                >
                  {/* Full Card Image */}
                  <img
                    src={c.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60&auto=format&fit=crop"}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  {/* Top Left Badge - Capsule */}
                  <div className="absolute top-4 left-4 bg-[var(--brand-base-600)] !text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md border border-[var(--brand-base-700)] max-w-[200px] truncate">
                    {c.badgeTitle || "Luyện thi"}
                  </div>

                  {/* Bottom Title and Action */}
                  <div className="absolute bottom-5 left-5 right-5 !text-white flex flex-col gap-1.5">
                    <h3 className="text-3xl font-black tracking-wide !text-white drop-shadow-md truncate" style={{ fontFamily: "var(--font-heading)" }} title={c.title}>
                      {c.title}
                    </h3>
                  <Link
                    to={ROUTES.COURSE_DETAIL(c.id)}
                    className="text-xs font-extrabold !text-white hover:underline flex items-center gap-1 transition drop-shadow-sm"
                  >
                    Xem chi tiết khóa học <span className="transform group-hover/card:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            )))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] !text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to={ROUTES.COURSES}
            className="inline-flex items-center gap-2 px-9 py-3.5 bg-[var(--surface-300)] border-2 border-[var(--brand-base-600)] !text-[var(--brand-base-600)] font-black rounded-[var(--radius-lg)] hover:bg-[var(--brand-soft-300)] active:scale-95 transition-all duration-150 text-base cursor-pointer shadow-xs"
          >
            Xem tất cả khóa học <span className="text-lg font-black">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
