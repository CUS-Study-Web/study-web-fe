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
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="py-12 md:py-16 lg:py-20 bg-[#f6f9f6] relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-block bg-[#edf4ee] text-[#28522d] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-4">
            CHƯƠNG TRÌNH HỌC
          </div>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-[#1f1f1c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            5 chương trình luyện thi tại CUS
          </h2>
          <p
            className="mt-4 text-sm md:text-base text-[#666967] max-w-2xl mx-auto leading-relaxed font-medium"
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
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white hover:bg-[#f0f4f1] text-[#1f1f1c] shadow-xl border border-[#d2dcd4] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95"
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
            {programsData.map((p) => (
              <div
                key={p.title}
                className="w-[280px] sm:w-[310px] md:w-[330px] flex-shrink-0 relative aspect-[3/4] rounded-[20px] overflow-hidden shadow-lg border border-[#e2e8e3] snap-start group/card hover:shadow-xl transition-all duration-300"
              >
                {/* Full Card Image */}
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Top Left Badge - Capsule */}
                <div className="absolute top-4 left-4 bg-[#1e4022] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {p.tag}
                </div>

                {/* Bottom Title and Action */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col gap-1">
                  <h3 className="text-3xl font-extrabold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                    {p.title}
                  </h3>
                  <a
                    href="#trial"
                    className="text-xs font-medium text-white/90 hover:text-white flex items-center gap-1 transition"
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
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white hover:bg-[#f0f4f1] text-[#1f1f1c] shadow-xl border border-[#d2dcd4] flex items-center justify-center transition-all opacity-90 hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* View All Button - Rounded 16px Matching Image 2 */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-9 py-3.5 bg-[#f8faf8] border border-[#28522d] !text-[#28522d] font-extrabold rounded-[16px] hover:bg-[#edf4ee] active:scale-95 transition-all duration-150 text-base cursor-pointer">
            Xem tất cả khóa học <span className="text-lg font-extrabold">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
