import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";
import { useGetPublicHomepageQuery } from "../../../hooks/queries/useHomepage";
import { Spinner } from "../../Loading";

const CTA_TARGET_MAP: Record<string, string> = {
  REGISTER: ROUTES.AUTH.REGISTER,
  COURSES: ROUTES.COURSES,
  LOGIN: ROUTES.AUTH.LOGIN,
  ABOUT: ROUTES.ABOUT,
};

export default function Hero() {
  const { data, isLoading, isError, error, refetch } = useGetPublicHomepageQuery();
  const content = data?.data;

  if (isLoading) {
    return (
      <section className="py-20 md:py-32 flex items-center justify-center">
        <div className="flex items-center gap-3 text-[var(--brand-base-600)]">
          <Spinner size="lg" color="brand" />
          <span className="[font-family:var(--font-heading)] font-semibold text-base">Đang tải dữ liệu trang chủ...</span>
        </div>
      </section>
    );
  }

  if (isError) {
    const errorMsg = (error as any)?.response?.data?.message || (error as any)?.message || "Không thể tải dữ liệu trang chủ.";
    return (
      <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="text-[#ef4444] font-bold text-lg mb-4">{errorMsg}</div>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-[var(--brand-base-600)] text-white rounded-[var(--radius-md)] text-sm font-bold hover:bg-[var(--brand-base-700)] transition cursor-pointer"
        >
          Thử lại
        </button>
      </section>
    );
  }

  if (!content) {
    return (
      <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="text-[#ef4444] font-bold text-lg mb-2">Không tìm thấy nội dung trang chủ.</div>
      </section>
    );
  }

  const cta1Route = content.ctaBtn1Target ? CTA_TARGET_MAP[content.ctaBtn1Target] || ROUTES.AUTH.LOGIN : ROUTES.AUTH.LOGIN;
  const cta2Route = content.ctaBtn2Target ? CTA_TARGET_MAP[content.ctaBtn2Target] || ROUTES.COURSES : null;

  const hasStudentAvatars = content.student1Avatar || content.student2Avatar || content.student3Avatar;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="w-fit mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20 items-center justify-center px-4 md:px-6 lg:px-8">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left shrink-0 max-w-[700px]">
          {/* Subtitle Tag */}
          {content.badgeTitle && (
            <div className="inline-flex items-center gap-2 bg-[#DCE9DE] rounded-full px-3.5 py-1.5 text-xs md:text-sm font-bold mb-5 !text-[var(--brand-base-600)] uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-base-600)]"></span>
              {content.badgeTitle}
            </div>
          )}

          {/* H1 Headline */}
          <div
            className="w-full text-center text-5xl sm:text-6xl lg:text-[56px] xl:text-[64px] font-black leading-[1.1] tracking-tight !text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.headline1 && <span className="block">{content.headline1}</span>}
            {content.headline2 && (
              <span className="relative inline-block !text-[var(--brand-base-600)] mt-1">
                {content.headline2}
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
            )}
          </div>

          {/* Description */}
          {content.description && (
            <div className="mt-4 md:mt-6 text-base leading-[1.7] max-w-[560px] font-medium !text-[var(--text-secondary-600)]">
              {content.description}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
            {content.ctaBtn1Name && (
              <Link
                to={cta1Route}
                className="px-7 py-3 md:px-8 md:py-3.5 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-md hover:shadow-lg active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
              >
                {content.ctaBtn1Name}
              </Link>
            )}

            {content.ctaBtn2Name && (
              cta2Route ? (
                <Link
                  to={cta2Route}
                  className="px-7 py-3 md:px-8 md:py-3.5 bg-transparent border border-[var(--brand-base-600)] hover:bg-[var(--brand-soft-100)] !text-[var(--brand-base-600)] font-extrabold rounded-[var(--radius-md)] active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
                >
                  {content.ctaBtn2Name}
                </Link>
              ) : (
                <div
                  onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-7 py-3 md:px-8 md:py-3.5 bg-transparent border border-[var(--brand-base-600)] hover:bg-[var(--brand-soft-100)] !text-[var(--brand-base-600)] font-extrabold rounded-[var(--radius-md)] active:scale-95 transition-all text-center text-base cursor-pointer inline-flex items-center justify-center"
                >
                  {content.ctaBtn2Name}
                </div>
              )
            )}
          </div>

          {/* Social Proof */}
          {(hasStudentAvatars || content.studentStatsDesc) && (
            <div className="mt-8 md:mt-10 flex items-center gap-3">
              {hasStudentAvatars && (
                <div className="flex">
                  {content.student1Avatar && (
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                      src={content.student1Avatar}
                      alt="Student 1"
                    />
                  )}
                  {content.student2Avatar && (
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm -ml-2.5"
                      src={content.student2Avatar}
                      alt="Student 2"
                    />
                  )}
                  {content.student3Avatar && (
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm -ml-2.5"
                      src={content.student3Avatar}
                      alt="Student 3"
                    />
                  )}
                </div>
              )}
              {content.studentStatsDesc && (
                <div className="text-[13px] leading-tight font-bold text-[#1f1f1c]">
                  {content.studentStatsDesc}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center w-full lg:w-[480px] xl:w-[560px] shrink-0 mt-12 lg:mt-0 px-4 sm:px-8 md:px-12 lg:px-0">
          <div className="absolute -inset-2 md:-inset-5 rounded-[32px] bg-[radial-gradient(ellipse_at_60%_40%,rgba(44,90,49,0.12)_0%,transparent_70%)] z-0 hidden lg:block"></div>

          <div className="relative z-10 w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl bg-[#DCE9DE]">
            {content.mainImageUrl ? (
              <img
                src={content.mainImageUrl}
                alt={content.headline1 || "CUS Homepage"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary-400)]">
                Chưa có hình ảnh
              </div>
            )}

            {/* Floating Badge 2 - Bottom Left */}
            {(content.stat2Number || content.stat2Desc) && (
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/95 backdrop-blur-[8px] rounded-[14px] px-4 py-3 shadow-md text-left z-20">
                {content.stat2Number && (
                  <div className="text-[20px] font-bold leading-none text-[var(--brand-base-600)]">{content.stat2Number}</div>
                )}
                {content.stat2Desc && (
                  <div className="text-[12px] font-medium mt-1 text-[var(--text-secondary-600)]">{content.stat2Desc}</div>
                )}
              </div>
            )}
          </div>

          {/* Floating Badge 1 - Top Right */}
          {(content.stat1Number || content.stat1Desc) && (
            <div className="absolute z-20 top-6 -right-2 md:top-8 md:-right-5 bg-[var(--brand-base-600)] rounded-[14px] px-4 py-3 shadow-lg text-left">
              {content.stat1Number && (
                <div className="text-[17px] font-bold leading-none !text-white">{content.stat1Number}</div>
              )}
              {content.stat1Desc && (
                <div className="text-[11px] font-medium mt-1.5 uppercase tracking-wide text-[rgba(220,233,222,0.9)]">{content.stat1Desc}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
