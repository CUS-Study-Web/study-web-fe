import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import type { LearnerFlashcardTopicResponse } from "../../types/api/flashcardTopic.api";

type FlashcardTopicItemProps = {
  topic: LearnerFlashcardTopicResponse;
};

export default function FlashcardTopicItem({ topic }: FlashcardTopicItemProps) {
  const navigate = useNavigate();
  const pct = topic.progressPercent;
  const done = topic.isCompleted;

  return (
    <div 
      onClick={() => navigate(ROUTES.LEARNER.FLASHCARD_TOPIC_DETAIL(topic.id))}
      className="bg-white rounded-[18px] border border-[var(--border-300)] shadow-sm p-5 flex flex-col justify-between min-h-[200px] transition-all duration-150 hover:shadow-md hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex-1">
        <div className="font-[family:var(--font-heading)] font-extrabold text-[13px] text-[var(--text-primary-900)] leading-[1.45] mb-1 min-h-[38px]">{topic.title}</div>
        <div className="font-[family:var(--font-body)] text-[11px] text-[var(--text-secondary-200)]">{topic.numWords} từ vựng</div>
      </div>
      <div className="mt-4">
        <div className="h-[5px] rounded-[3px] bg-[var(--surface-500)] overflow-hidden mb-2">
          <div className="h-full rounded-[3px] bg-[var(--brand-base-500)] transition-all duration-600 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mb-3.5">
          <span className="font-[family:var(--font-body)] text-[11px] text-[var(--text-secondary-400)]">Đã nhớ {topic.learnedWords}/{topic.numWords}</span>
          <span className="font-[family:var(--font-heading)] font-bold text-[11px] text-[var(--brand-base-500)]">{pct}%</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(ROUTES.LEARNER.FLASHCARD_TOPIC_DETAIL(topic.id));
          }}
          className={`font-[family:var(--font-heading)] !font-bold text-xs py-[9px] rounded-[10px] border-none cursor-pointer w-full transition-opacity duration-150 hover:opacity-85 ${done ? 'bg-[var(--brand-soft-500)] !text-[var(--brand-base-500)]' : 'bg-[var(--brand-base-500)] !text-white'}`}
        >
          {done ? "Ôn lại" : "Học ngay"}
        </button>
      </div>
    </div>
  );
}
