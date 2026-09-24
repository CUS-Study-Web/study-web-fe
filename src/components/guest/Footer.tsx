import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useGetPublicFooterQuery } from "../../hooks/queries/useHomepage";
import { Spinner } from "../Loading";
import { courseService } from "../../services/courseService";
import { ROUTES } from "../../utils/routes";
import { Phone, Mail, Globe, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useGetPublicFooterQuery();
  const footer = data?.data;

  const isExternalUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");

  const handleLinkClick = async (e: React.MouseEvent, rawUrl: string) => {
    if (!rawUrl) return;

    if (isExternalUrl(rawUrl)) {
      return;
    }

    e.preventDefault();

    const url = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;

    // Extract course ID if it's a course link (e.g. /courses/:courseId)
    const courseMatch = url.match(/^\/courses\/([^/?#]+)/);
    if (courseMatch) {
      const courseIdOrSlug = courseMatch[1];
      try {
        const res = await courseService.getCourseDetail(courseIdOrSlug);
        if (res && res.data) {
          navigate(url);
          return;
        }
      } catch {
        try {
          const allCourses = await courseService.getCourses({ size: 100 });
          const found = allCourses?.data?.find(
            (c) =>
              c.id === courseIdOrSlug ||
              c.title.toLowerCase() === courseIdOrSlug.toLowerCase()
          );
          if (found) {
            navigate(ROUTES.COURSE_DETAIL(found.id));
            return;
          }
        } catch {
          navigate(ROUTES.NOT_FOUND);
          return;
        }
      }

      // If BE returns nothing, immediately show in FE a 404 page
      navigate(ROUTES.NOT_FOUND);
      return;
    }

    // Other internal routes
    navigate(url);
  };

  if (isLoading) {
    return (
      <footer id="about" className="bg-[var(--text-primary-800)] !text-white pt-16 pb-12 px-4 md:px-8 lg:px-12 xl:px-20 border-t border-[var(--border-900)]">
        <div className="max-w-7xl mx-auto flex items-center justify-center py-12 gap-3 text-white">
          <Spinner size="md" color="white" />
          <span className="text-sm font-medium">Đang tải thông tin chân trang...</span>
        </div>
      </footer>
    );
  }

  if (isError) {
    const errorMsg = (error as any)?.response?.data?.message || (error as any)?.message || "Không thể tải thông tin chân trang.";
    return (
      <footer id="about" className="bg-[var(--text-primary-800)] !text-white pt-12 pb-10 px-4 border-t border-[var(--border-900)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-3">
          <p className="text-red-400 font-bold text-sm">{errorMsg}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded text-xs font-semibold transition cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      </footer>
    );
  }

  if (!footer) {
    return (
      <footer id="about" className="bg-[var(--text-primary-800)] !text-white pt-12 pb-10 px-4 border-t border-[var(--border-900)]">
        <div className="max-w-7xl mx-auto text-center text-red-400 text-sm font-medium">
          Không tìm thấy thông tin chân trang.
        </div>
      </footer>
    );
  }

  const programLinks = (footer.links || [])
    .filter((l) => l.category === "PROGRAM")
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const aboutLinks = (footer.links || [])
    .filter((l) => l.category === "ABOUT")
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <footer id="about" className="bg-[var(--text-primary-800)] !text-white pt-16 pb-12 px-4 md:px-8 lg:px-12 xl:px-20 border-t border-[var(--border-900)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Company Info */}
          <div className="flex flex-col items-start gap-4">
            <Logo size="md" variant="light" />

            {footer.companyName && (
              <p className="text-sm font-bold !text-white leading-snug mt-2">
                {footer.companyName}
              </p>
            )}

            {footer.address && (
              <p className="text-sm !text-white opacity-80 leading-relaxed max-w-xs font-medium">
                {footer.address}
              </p>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {footer.facebookUrl && (
                <a href={footer.facebookUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="Facebook">
                  <FaFacebookF className="w-4 h-4 text-white" />
                </a>
              )}
              {footer.instagramUrl && (
                <a href={footer.instagramUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4 text-white" />
                </a>
              )}
              {footer.youtubeUrl && (
                <a href={footer.youtubeUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="YouTube">
                  <FaYoutube className="w-4 h-4 text-white" />
                </a>
              )}
              {footer.tiktokUrl && (
                <a href={footer.tiktokUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[var(--text-secondary-700)] hover:bg-[var(--text-secondary-600)] flex items-center justify-center !text-white opacity-80 hover:opacity-100 transition" aria-label="TikTok">
                  <FaTiktok className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 - Programs */}
          <div className="flex flex-col gap-5 md:ml-4">
            <h4 className="text-xs font-extrabold !text-white uppercase tracking-widest">
              CHƯƠNG TRÌNH HỌC
            </h4>
            {programLinks.length > 0 ? (
              <ul className="space-y-4 text-sm font-medium">
                {programLinks.map((link, idx) => {
                  const isExt = isExternalUrl(link.url);
                  return (
                    <li key={link.url || idx}>
                      {isExt ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="!text-white opacity-80 hover:!text-white transition"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a
                          href={link.url}
                          onClick={(e) => handleLinkClick(e, link.url)}
                          className="!text-white opacity-80 hover:!text-white transition cursor-pointer"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs !text-white opacity-60">Chưa có liên kết chương trình</p>
            )}
          </div>

          {/* Column 3 - About CUS */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-extrabold !text-white uppercase tracking-widest">
              VỀ CUS
            </h4>
            {aboutLinks.length > 0 ? (
              <ul className="space-y-4 text-sm font-medium">
                {aboutLinks.map((link, idx) => {
                  const isExt = isExternalUrl(link.url);
                  return (
                    <li key={link.url || idx}>
                      {isExt ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="!text-white opacity-80 hover:!text-white transition"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a
                          href={link.url}
                          onClick={(e) => handleLinkClick(e, link.url)}
                          className="!text-white opacity-80 hover:!text-white transition cursor-pointer"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs !text-white opacity-60">Chưa có liên kết giới thiệu</p>
            )}
          </div>

          {/* Column 4 - Contact Info */}
          <div className="flex flex-col gap-5">
            <h4 className="text-xs font-extrabold !text-white uppercase tracking-widest">
              LIÊN HỆ
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {footer.phone && (
                <li className="flex items-center gap-3 !text-white opacity-80">
                  <Phone className="w-[18px] h-[18px] text-[var(--error-400)] shrink-0" />
                  <span>{footer.phone}</span>
                </li>
              )}
              {footer.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-[18px] h-[18px] !text-white opacity-80 shrink-0" />
                  <a href={`mailto:${footer.email}`} className="!text-white opacity-80 hover:!text-white transition">
                    {footer.email}
                  </a>
                </li>
              )}
              {footer.website && (
                <li className="flex items-center gap-3">
                  <Globe className="w-[18px] h-[18px] text-[var(--info-400)] shrink-0" />
                  <a href={footer.website.startsWith("http") ? footer.website : `https://${footer.website}`} target="_blank" rel="noreferrer" className="!text-white opacity-80 hover:!text-white transition">
                    {footer.website}
                  </a>
                </li>
              )}
              {footer.workingHours && (
                <li className="flex items-center gap-3 !text-white opacity-80">
                  <Clock className="w-[18px] h-[18px] text-[var(--error-400)] shrink-0" />
                  <span>{footer.workingHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-[var(--border-800)] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs !text-white opacity-70 gap-4">
          <p>{footer.copyrightText || `© ${new Date().getFullYear()} ${footer.companyName || "CUS"}. Bảo lưu mọi quyền.`}</p>
          <div className="flex gap-6">
            {footer.termsUrl && (
              <a href={footer.termsUrl} className="!text-white opacity-70 hover:!text-white transition">
                Điều khoản dịch vụ
              </a>
            )}
            {footer.privacyUrl && (
              <a href={footer.privacyUrl} className="!text-white opacity-70 hover:!text-white transition">
                Chính sách bảo mật
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
