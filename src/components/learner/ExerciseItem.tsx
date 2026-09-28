import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import PendingSolutionPopup from "../common/PendingSolutionPopup";
import { Lock, CheckCircle2, FileText, Check } from "lucide-react";

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
            <Lock className="w-4 h-4 text-[#A0AAA2]" />
          ) : completed ? (
            <CheckCircle2 className="w-5 h-5 text-[var(--brand-base-500)]" />
          ) : (
            <FileText className="w-5 h-5 text-[var(--brand-base-500)]" />
          )}
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className={`font-[family:var(--font-heading)] font-bold text-sm leading-snug truncate ${isLocked ? "text-[#A0AAA2]" : "text-[var(--text-primary-500)]"}`}>
              {exercise.title}
            </div>
            {completed && !isLocked && (
              <span className="bg-[var(--brand-soft-500)] text-[var(--brand-base-500)] rounded-full px-2 py-0.5 font-[family:var(--font-heading)] font-bold text-[10px] whitespace-nowrap inline-flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Đã hoàn thành</span>
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
            <Lock className="w-3 h-3 text-[#A8761C]" />
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
              onClick={() => navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, String(exercise.id)), {
                state: { totalTakes: exercise.attempts ? Number(exercise.attempts) : 0 }
              })}
              className="font-[family:var(--font-heading)] !font-semibold text-[11px] px-4 py-1.5 rounded-full border-none bg-[var(--brand-base-500)] !text-white cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
            >
              Làm lại
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, String(exercise.id)), {
              state: { totalTakes: exercise.attempts ? Number(exercise.attempts) : 0 }
            })}
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
