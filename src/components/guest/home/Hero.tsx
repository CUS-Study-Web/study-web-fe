import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export default function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Subtitle Tag */}
          <div
            className="inline-flex items-center gap-2 bg-[var(--brand-soft-200)] rounded-full px-4 py-1.5 text-xs md:text-sm font-bold mb-6 !text-[var(--brand-base-600)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-base-600)]"></span>
            LUYỆN THI ĐGNL - CUS
          </div>
          
          {/* H1 Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-black leading-[1.08] tracking-tight !text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cơ hội do bạn quyết
            <span className="block my-2 text-4xl sm:text-5xl font-black !text-[var(--text-primary-500)]">—</span>
            <span className="relative inline-block !text-[var(--brand-base-600)]">
              Tương lai do<br />bạn chọn!
              {/* Authentic Green Underline Stroke */}
              <svg
                className="absolute -bottom-3 left-0 w-[105%] h-5 overflow-visible pointer-events-none"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 2 6 C 70 10, 200 4, 298 7"
                  stroke="#9cb6a0"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          
          {/* Subtitle Paragraph */}
          <p
            className="mt-6 text-body-lg max-w-xl leading-relaxed font-medium !text-[var(--text-secondary-600)]"
          >
            Đội ngũ giảng viên chuyên gia, lộ trình cá nhân hóa và hơn 3.400 học viên đã đỗ vào các trường đại học hàng đầu Việt Nam.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="px-8 py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md shadow-[#28522d]/20 hover:shadow-lg active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
            >
              Bắt đầu ngay
            </Link>
            <button
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-[var(--surface-300)] border border-[var(--brand-base-600)] hover:bg-[var(--brand-soft-300)] !text-[var(--brand-base-600)] font-extrabold rounded-[var(--radius-md)] active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
            >
              Xem khóa học
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop"
                alt="Student 1"
              />
              <img
                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop"
                alt="Student 2"
              />
              <img
                className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop"
                alt="Student 3"
              />
            </div>
            <div className="text-xs leading-snug">
              <div className="font-bold text-[#1f1f1c]">3.400+ học viên đã đỗ</div>
              <div className="font-normal text-[#7d827f]">vào các trường đại học top đầu</div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 relative flex justify-center w-full mt-8 lg:mt-0">
          <div className="relative w-full max-w-[560px] aspect-[4/5] lg:h-[540px] rounded-[var(--radius-xl)] overflow-hidden shadow-2xl bg-white border border-[var(--border-300)]">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop"
              alt="CUS Students"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge 1 - Top Right */}
          <div className="absolute top-6 right-2 md:-right-2 bg-[#1e4022] border border-[var(--brand-base-600)] rounded-[var(--radius-md)] px-5 py-3 shadow-xl text-left">
            <div className="text-xl font-bold leading-none !text-white">29 / 30</div>
            <div className="text-xs font-bold mt-1.5 uppercase tracking-wider text-[#beccbf]">Điểm thi cao nhất 2024</div>
          </div>

          {/* Floating Badge 2 - Bottom Left */}
          <div className="absolute bottom-6 left-2 md:-left-2 bg-white border border-[var(--border-300)] rounded-[var(--radius-lg)] px-5 py-3 shadow-xl text-left">
            <div className="text-xl font-bold leading-none text-[#28522d]">96%</div>
            <div className="text-xs font-bold mt-1.5 uppercase tracking-wider text-[#7d827f]">đạt điểm mục tiêu</div>
          </div>
        </div>
      </div>
    </section>
  );
}
