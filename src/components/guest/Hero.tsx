export default function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 md:px-8 lg:px-12 xl:px-20">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtitle Tag */}
          <div
            className="inline-flex items-center gap-2 bg-[var(--brand-soft-300)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-6 text-[var(--brand-base-600)]"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--brand-base-600)]"></span>
            LUYỆN THI ĐGNL - CUS
          </div>
          
          {/* H1 Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cơ hội do bạn quyết
            <span className="block my-2 text-4xl md:text-5xl font-extrabold text-[var(--text-primary-500)]">—</span>
            <span className="relative inline-block text-[var(--brand-base-600)]">
              Tương lai do bạn chọn!
              {/* Authentic Green Underline Stroke */}
              <svg
                className="absolute -bottom-3 left-0 w-[102%] h-4 overflow-visible pointer-events-none"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 2 6 C 70 10, 200 4, 298 7"
                  stroke="var(--brand-base-200)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          
          {/* Subtitle Paragraph */}
          <p
            className="mt-8 text-base md:text-lg max-w-xl leading-relaxed font-normal text-[var(--text-secondary-500)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Đội ngũ giảng viên chuyên gia, lộ trình cá nhân hóa và hơn 3.400 học viên đã đỗ vào các trường đại học hàng đầu Việt Nam.
          </p>
          
          {/* Action Buttons - Rounded Pill */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              className="px-8 py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] text-[var(--neutral-0)] font-bold rounded-full shadow-sm hover:shadow-md transition-all text-center text-sm"
            >
              Bắt đầu ngay
            </button>
            <button
              className="px-8 py-3.5 bg-transparent border border-[var(--brand-base-600)] hover:bg-[var(--brand-soft-300)] text-[var(--brand-base-600)] font-bold rounded-full transition-all text-center text-sm"
            >
              Xem khóa học
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-[var(--neutral-0)] object-cover shadow-xs"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop"
                alt="Student 1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-[var(--neutral-0)] object-cover shadow-xs"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop"
                alt="Student 2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-[var(--neutral-0)] object-cover shadow-xs"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop"
                alt="Student 3"
              />
            </div>
            <div className="text-xs leading-snug">
              <div className="font-bold text-[var(--text-primary-500)]">3.400+ học viên đã đỗ</div>
              <div className="font-normal text-[var(--text-secondary-400)]">vào các trường đại học top đầu</div>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image & Floating Badges */}
        <div className="lg:col-span-5 relative flex justify-center w-full mt-8 lg:mt-0">
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl bg-[var(--neutral-0)] border border-[var(--border-300)]">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop"
              alt="CUS Students"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge 1 - Top Right */}
          <div className="absolute top-6 right-4 md:-right-4 bg-[var(--brand-base-600)] border border-[var(--brand-base-700)] rounded-2xl px-5 py-3 shadow-xl text-left">
            <div className="text-xl font-bold leading-none text-[var(--neutral-0)]">29 / 30</div>
            <div className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-[var(--success-100)]">Điểm thi cao nhất 2024</div>
          </div>

          {/* Floating Badge 2 - Bottom Left */}
          <div className="absolute bottom-6 left-4 md:-left-4 bg-[var(--neutral-0)] border border-[var(--border-300)] rounded-2xl px-5 py-3 shadow-xl text-left">
            <div className="text-xl font-bold leading-none text-[var(--brand-base-600)]">96%</div>
            <div className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-[var(--text-secondary-400)]">đạt điểm mục tiêu</div>
          </div>
        </div>
      </div>
    </section>
  );
}
