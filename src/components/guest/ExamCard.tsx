import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../contexts/AuthContext";

interface ExamCardProps {
  id: string;
  courseId?: string;
  course: string;
  title: string;
  time: string;
  questions: string;
  attempts?: string;
  isVip: boolean;
}

export default function ExamCard({ id, courseId, course, title, time, questions, attempts, isVip }: ExamCardProps) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const showVipLock = isVip && (!isLoggedIn || !user?.isVip);

  const handleTakeExam = () => {
    if (!isLoggedIn) {
      navigate(ROUTES.AUTH.LOGIN);
    } else {
      navigate(ROUTES.LEARNER.EXAM_START(courseId || "trial", "exam", id), {
        state: { totalTakes: attempts ? Number(attempts) : 0 }
      });
    }
  };
  return (
    <div className="relative bg-[var(--neutral-0)] rounded-[var(--radius-xl)] p-6 shadow-md border border-[var(--border-300)] flex flex-col justify-between h-full hover:shadow-lg transition-shadow overflow-hidden group">
      
      {/* VIP Blur Overlay */}
      {showVipLock && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[var(--neutral-0)]/40 backdrop-blur-[2px]">
          <div className="w-14 h-14 bg-[var(--text-primary-800)] rounded-full flex items-center justify-center mb-2.5 shadow-lg">
            <svg className="w-6 h-6 text-[#ffc107] fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <div className="!text-[var(--text-primary-500)] font-black text-base mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Chỉ dành cho VIP
          </div>
          <Link
            to={ROUTES.VIP}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[var(--text-primary-800)] !text-[#ffc107] text-sm font-extrabold rounded-full shadow-md hover:bg-[var(--text-primary-900)] active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current text-[#ffc107]" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Đăng ký VIP
          </Link>
        </div>
      )}

      {/* Main Card Content - Fully Blurred when showVipLock */}
      <div className={showVipLock ? "filter blur-[6px] opacity-35 select-none pointer-events-none flex flex-col justify-between h-full" : "flex flex-col justify-between h-full"}>
        <div>
          {/* Tags Row */}
          <div className="flex justify-between items-center mb-5">
            <span className="px-3 py-1 bg-[var(--brand-soft-300)] !text-[var(--brand-base-600)] text-caption font-extrabold uppercase rounded-full tracking-wider">
              {course}
            </span>
          </div>

          {/* Title */}
          <div className="text-h3 font-bold !text-[var(--text-primary-500)] mb-6 line-clamp-2 min-h-[56px] flex items-center">
            {title}
          </div>
        </div>

        {/* Bottom Info & Button Section */}
        <div>
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-200)] mb-5">
            <div className="flex flex-col items-center gap-1">
              <svg className="w-4 h-4 text-[var(--text-secondary-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-caption font-semibold text-[var(--text-secondary-500)]">{time}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg className="w-4 h-4 text-[var(--error-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-caption font-semibold text-[var(--text-secondary-500)]">{questions}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg className="w-4 h-4 text-[var(--info-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-caption font-semibold text-[var(--text-secondary-500)]">{attempts ?? '0'}</span>
            </div>
          </div>
          
          <button 
            onClick={handleTakeExam}
            className="w-full py-3 bg-[var(--brand-base-600)] hover:bg-[var(--brand-base-700)] !text-white font-extrabold rounded-[var(--radius-md)] shadow-sm hover:shadow-md active:scale-95 transition-all text-sm cursor-pointer"
          >
            Xem đề thi
          </button>
        </div>
      </div>
    </div>
  );
}
