import { Link, useNavigate } from "react-router-dom";
import { Lock, Crown, Clock, HelpCircle, Users } from "lucide-react";
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
            <Lock className="w-6 h-6 text-[#ffc107]" />
          </div>
          <div className="!text-[var(--text-primary-500)] font-black text-base mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Chỉ dành cho VIP
          </div>
          <Link
            to={ROUTES.VIP}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[var(--text-primary-800)] !text-[#ffc107] text-sm font-extrabold rounded-full shadow-md hover:bg-[var(--text-primary-900)] active:scale-95 transition-all cursor-pointer"
          >
            <Crown className="w-4 h-4 text-[#ffc107]" />
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
              <Clock className="w-4 h-4 text-[var(--text-secondary-300)]" />
              <span className="text-caption font-semibold text-[var(--text-secondary-500)]">{time}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <HelpCircle className="w-4 h-4 text-[var(--error-400)]" />
              <span className="text-caption font-semibold text-[var(--text-secondary-500)]">{questions}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users className="w-4 h-4 text-[var(--info-500)]" />
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
