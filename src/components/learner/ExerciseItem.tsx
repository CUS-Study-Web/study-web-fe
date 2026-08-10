import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

type Exercise = {
  id: number;
  title: string;
  size: string;
  date: string;
  completed?: boolean;
};

type ExerciseItemProps = {
  exercise: Exercise;
  isLast: boolean;
};

export default function ExerciseItem({ exercise, isLast }: ExerciseItemProps) {
  const navigate = useNavigate();
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const completed = exercise.completed;

  return (
    <div
      className={`hover:bg-[#FAFCFA] flex items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${
        !isLast ? "border-b border-[var(--surface-500)]" : "border-none"
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Icon Left */}
        <div className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 ${completed ? "bg-[var(--brand-soft-500)]" : "bg-[var(--surface-500)]"}`}>
          {completed ? (
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
            <div className="font-[family:var(--font-heading)] font-bold text-sm text-[var(--text-primary-500)] leading-snug truncate">
              {exercise.title}
            </div>
            {completed && (
              <span className="bg-[var(--brand-soft-500)] text-[var(--brand-base-500)] rounded-full px-2 py-0.5 font-[family:var(--font-heading)] font-bold text-[10px] whitespace-nowrap">
                ✓ Đã hoàn thành
              </span>
            )}
          </div>
          <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1">
            PDF · {exercise.size} · Đăng ngày {exercise.date}
          </div>
        </div>
      </div>
      {/* Action Right */}
      <div className="flex gap-2 shrink-0">
        {completed ? (
          <>
            <button 
              className="font-[family:var(--font-heading)] !font-bold text-xs px-3.5 py-1.5 rounded-full border-[1.5px] border-[var(--brand-base-500)] bg-white !text-[var(--brand-base-500)] cursor-pointer whitespace-nowrap transition-all hover:bg-[var(--brand-soft-500)]"
            >
              Xem lời giải
            </button>
            <button 
              onClick={() => navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, String(exercise.id)))}
              className="font-[family:var(--font-heading)] !font-bold text-xs px-3.5 py-1.5 rounded-full border-none bg-[var(--brand-base-500)] !text-white cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
            >
              Làm lại
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, String(exercise.id)))}
            className="font-[family:var(--font-heading)] !font-bold text-xs px-4.5 py-1.5 rounded-full border-none bg-[var(--brand-base-500)] !text-white cursor-pointer whitespace-nowrap transition-all hover:opacity-90"
          >
            Bắt đầu làm bài
          </button>
        )}
      </div>
    </div>
  );
}
