import { useRef } from "react";

const programsData = [
  {
    title: "V-ACT",
    tag: "ĐGNL TP.HCM",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60&auto=format&fit=crop",
  },
  {
    title: "V-SAT",
    tag: "Khảo thí quốc gia",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=60&auto=format&fit=crop",
  },
  {
    title: "HSA",
    tag: "ĐGNL ĐHQG Hà Nội",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=60&auto=format&fit=crop",
  },
  {
    title: "HSCA",
    tag: "ĐH Sư phạm TP.HCM",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60&auto=format&fit=crop",
  },
  {
    title: "THPT QG",
    tag: "Bộ GD&ĐT",
    img: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=60&auto=format&fit=crop",
  },
];

export default function Programs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="py-12 md:py-16 lg:py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block bg-[var(--brand-soft-300)] text-[var(--brand-base-600)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-4">
            CHƯƠNG TRÌNH HỌC
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            5 chương trình luyện thi tại CUS
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-[var(--text-secondary-500)] max-w-2xl mx-auto leading-relaxed font-normal"
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
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Scrollable List */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex gap-6 scroll-smooth pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory"
          >
            {programsData.map((p) => (
              <div
                key={p.title}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 relative aspect-[3/4] rounded-[24px] overflow-hidden shadow-lg border border-[var(--border-300)] snap-start group/card hover:shadow-xl transition-all duration-300"
              >
                {/* Full Card Image */}
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Top Left Badge */}
                <div className="absolute top-4 left-4 bg-[var(--brand-base-600)] text-[var(--neutral-0)] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {p.tag}
                </div>

                {/* Bottom Title and Action */}
                <div className="absolute bottom-5 left-5 right-5 text-[var(--neutral-0)] flex flex-col gap-1">
                  <h3 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                    {p.title}
                  </h3>
                  <a
                    href="#trial"
                    className="text-xs font-medium text-[var(--text-secondary-100)] hover:text-[var(--neutral-0)] flex items-center gap-1 transition"
                  >
                    Xem chi tiết khóa học <span className="transform group-hover/card:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--neutral-0)] hover:bg-[var(--surface-500)] text-[var(--text-primary-500)] shadow-xl border border-[var(--border-300)] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-[var(--brand-base-600)] text-[var(--brand-base-600)] font-bold rounded-full hover:bg-[var(--brand-soft-300)] shadow-xs transition-all duration-200 text-sm">
            Xem tất cả khóa học <span className="text-base font-normal">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
