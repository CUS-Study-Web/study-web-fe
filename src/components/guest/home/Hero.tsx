import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

export default function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="w-fit mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20 items-center justify-center px-4 md:px-6 lg:px-8">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left shrink-0 max-w-[700px]">
          {/* Subtitle Tag */}
          <div
            className="inline-flex items-center gap-2 bg-[#DCE9DE] rounded-full px-3.5 py-1.5 text-xs md:text-sm font-bold mb-5 !text-[var(--brand-base-600)] uppercase tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-base-600)]"></span>
            LUYỆN THI ĐGNL - CUS
          </div>

          {/* H1 Headline */}
          <div
            className="w-full text-center text-5xl sm:text-6xl lg:text-[56px] xl:text-[64px] font-black leading-[1.1] tracking-tight !text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="block">Cơ hội do bạn quyết -</span>
            {/* <span className="block my-1 text-3xl sm:text-4xl font-black !text-[var(--text-primary-500)]">—</span> */}
            <span className="relative inline-block !text-[var(--brand-base-600)] mt-1">
              Tương lai do bạn chọn!
              {/* Authentic Green Underline Stroke */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 overflow-visible pointer-events-none opacity-40"
                viewBox="0 0 320 8"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C80 2 240 2 318 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>

          {/* Subtitle Paragraph (Commented out) */}
          {/* <div
            className="mt-4 md:mt-6 text-base leading-[1.7] max-w-[440px] font-medium !text-[var(--text-secondary-600)]"
          >
            Đội ngũ giảng viên chuyên gia, lộ trình cá nhân hóa và hơn 3.400 học viên đã đỗ vào các trường đại học hàng đầu Việt Nam.
          </div> */}

          {/* New Subtitles List */}
          <ul className="mt-6 lg:mt-8 flex flex-col gap-3 text-left w-full">
            {[
              "Lộ trình & phương pháp học tập bài bản",
              "Hệ thống tài liệu độc quyền",
              "Sĩ số giới hạn. Cá nhân hóa lộ trình theo năng lực.",
              "Tiềm lực công nghệ hỗ trợ ôn luyện",
              "Tối ưu chi phí bằng các chính sách ưu đãi"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[15px] sm:text-base font-medium !text-[var(--text-secondary-600)]">
                <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#DCE9DE] shrink-0">
                  <svg className="w-3.5 h-3.5 text-[var(--brand-base-600)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="px-7 py-3 md:px-8 md:py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md hover:shadow-lg active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
            >
              Bắt đầu ngay
            </Link>
            <div
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 md:px-8 md:py-3.5 bg-transparent border border-[var(--brand-base-600)] hover:bg-[var(--brand-soft-100)] !text-[var(--brand-base-600)] font-extrabold rounded-[var(--radius-md)] active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
            >
              Xem khóa học
            </div>
          </div>

          {/* Sub Slogan */}
          <div className="mt-4 text-sm font-medium italic !text-[var(--text-secondary-500)] max-w-md">
            Hành trình chinh phục ước mơ bắt đầu từ đây, Khám phá tiềm năng cùng CUS
          </div>

          {/* Social Proof (Commented out) */}
          {/* <div className="mt-8 md:mt-10 flex items-center gap-3">
            <div className="flex">
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop"
                alt="Student 1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm -ml-2.5"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop"
                alt="Student 2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm -ml-2.5"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop"
                alt="Student 3"
              />
            </div>
            <div className="text-[13px] leading-tight">
              <div className="font-bold text-[#1f1f1c]">3.400+ học viên đã đỗ</div>
              <div className="font-medium text-[#6B746D] text-xs">vào các trường đại học top đầu</div>
            </div>
          </div> */}
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center w-full lg:w-[480px] xl:w-[560px] shrink-0 mt-12 lg:mt-0 px-4 sm:px-8 md:px-12 lg:px-0">
          {/* Subtle Background Glow */}
          <div className="absolute -inset-2 md:-inset-5 rounded-[32px] bg-[radial-gradient(ellipse_at_60%_40%,rgba(44,90,49,0.12)_0%,transparent_70%)] z-0 hidden lg:block"></div>

          <div className="relative z-10 w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl bg-[#DCE9DE]">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop"
              alt="CUS Students"
              className="w-full h-full object-cover"
            />

            {/* Floating Badge 2 - Bottom Left */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/95 backdrop-blur-[8px] rounded-[14px] px-4 py-3 shadow-md text-left z-20">
              <div className="text-[20px] font-bold leading-none text-[var(--brand-base-600)]">96%</div>
              <div className="text-[12px] font-medium mt-1 text-[var(--text-secondary-600)]">đạt điểm mục tiêu</div>
            </div>
          </div>

          {/* Floating Badge 1 - Top Right */}
          <div className="absolute z-20 top-6 -right-2 md:top-8 md:-right-5 bg-[var(--brand-base-600)] rounded-[14px] px-4 py-3 shadow-lg text-left">
            <div className="text-[17px] font-bold leading-none !text-white">29 / 30</div>
            <div className="text-[11px] font-medium mt-1.5 uppercase tracking-wide text-[rgba(220,233,222,0.9)]">Điểm thi cao nhất 2024</div>
          </div>
        </div>
      </div>
    </section>
  );
}
