import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import PendingSolutionPopup from "../common/PendingSolutionPopup";

type Exercise = {
  id: string;
  title: string;
  fileType?: string;
  date: string;
  completed?: boolean;
  attempts?: number | string;
};

type ExerciseItemProps = {
  exercise: Exercise;
  isLast: boolean;
  isLocked?: boolean;
};

export default function ExerciseItem({ exercise, isLast, isLocked }: ExerciseItemProps) {
  const navigate = useNavigate();
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const completed = exercise.completed;
  const [showPendingPopup, setShowPendingPopup] = useState(false);

  return (
    <div
      className={`hover:bg-[#FAFCFA] flex items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${
        !isLast ? "border-b border-[var(--surface-500)]" : "border-none"
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Icon Left */}
        <div className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 ${isLocked ? "bg-[var(--surface-500)]" : completed ? "bg-[var(--brand-soft-500)]" : "bg-[var(--surface-500)]"}`}>
          {isLocked ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="3" fill="#A0AAA2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#A0AAA2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : completed ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="var(--brand-base-500)"/>
              <path d="M7 12l3.5 3.5L17 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(44,90,49,0.8)" />
              <polyline points="14,2 14,8 20,8" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            </svg>
          )}
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className={`font-[family:var(--font-heading)] font-bold text-sm leading-snug truncate ${isLocked ? "text-[#A0AAA2]" : "text-[var(--text-primary-500)]"}`}>
              {exercise.title}
            </div>
            {completed && !isLocked && (
              <span className="bg-[var(--brand-soft-500)] text-[var(--brand-base-500)] rounded-full px-2 py-0.5 font-[family:var(--font-heading)] font-bold text-[10px] whitespace-nowrap">
                ✓ Đã hoàn thành
              </span>
            )}
          </div>
          <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1">
            {exercise.fileType ? `${exercise.fileType} · ` : ''}Đăng ngày {exercise.date}
          </div>
        </div>
      </div>
      {/* Action Right */}
      <div className="flex gap-2 shrink-0">
        {isLocked ? (
          <div className="flex items-center gap-1 font-bold text-[11px] text-[#A8761C] uppercase bg-[#FFFDF5] px-2 py-1 rounded">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="3" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            VIP
          </div>
        ) : completed ? (
          <>
            <button 
              onClick={() => setShowPendingPopup(true)}
              className="font-[family:var(--font-heading)] !font-semibold text-[11px] px-4 py-1.5 rounded-full border-[1.5px] border-[var(--brand-base-500)] bg-white !text-[var(--brand-base-500)] cursor-pointer whitespace-nowrap transition-all hover:bg-[var(--brand-soft-500)]"
            >
              Xem lời giải
            </button>
            <button 
              onClick={() => navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, String(exercise.id)), { state: { totalTake: exercise.attempts } })}
              className="font-[family:var(--font-heading)] !font-semibold text-[11px] px-4 py-1.5 rounded-full border-none bg-[var(--brand-base-500)] !text-white cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
            >
              Làm lại
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, String(exercise.id)), { state: { totalTake: exercise.attempts } })}
            className="font-[family:var(--font-heading)] !font-semibold text-[11px] px-4 py-1.5 rounded-full border-none bg-[var(--brand-base-500)] !text-white cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
          >
            Bắt đầu làm bài
          </button>
        )}
      </div>
      
      <PendingSolutionPopup 
        isOpen={showPendingPopup} 
        onClose={() => setShowPendingPopup(false)} 
      />
    </div>
  );
}
