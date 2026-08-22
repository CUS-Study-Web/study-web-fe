type AttemptRecord = {
  date: string;
  duration: string;
  status: "Khá" | "Tốt" | "Giỏi" | "Trung bình" | string;
  score: number;
};

type AttemptHistoryItemProps = {
  attempt: AttemptRecord;
  index: number;
  totalAttempts: number;
  isLast: boolean;
};

export default function AttemptHistoryItem({ attempt, index, totalAttempts, isLast }: AttemptHistoryItemProps) {
  const statusColor = (s: string) => 
    s === "Giỏi" ? { bg: "bg-[var(--brand-soft-500)]", text: "text-[var(--brand-base-500)]" } 
    : s === "Tốt" ? { bg: "bg-[#DDEAF8]", text: "text-[#2F6FAE]" } 
    : s === "Khá" ? { bg: "bg-[#FBF0DC]", text: "text-[#B7791F]" } 
    : { bg: "bg-[var(--surface-500)]", text: "text-[#6B746D]" };

  const sc = statusColor(attempt.status);
  
  return (
    <div className={`flex items-center gap-3 px-5.5 py-3.5 ${!isLast ? "border-b border-[var(--surface-500)]" : "border-none"}`}>
      <div className="w-9 h-9 rounded-[10px] bg-[var(--surface-500)] flex items-center justify-center shrink-0">
        <span className="font-[family:var(--font-heading)] font-bold text-xs text-[#6B746D]">
          #{totalAttempts - index}
        </span>
      </div>
      <div className="flex-1">
        <div className="font-[family:var(--font-heading)] font-semibold text-sm text-[#1B1F1C]">
          {attempt.date}
        </div>
        <div className="font-[family:var(--font-body)] text-xs text-[#6B746D] mt-0.5">
          Hoàn thành trong {attempt.duration}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className={`${sc.bg} ${sc.text} font-[family:var(--font-heading)] font-semibold text-[11px] px-2.5 py-[3px] rounded-full`}>
          {attempt.status}
        </span>
        <div className="text-right">
          <div className={`font-[family:var(--font-heading)] font-extrabold text-lg leading-none ${sc.text}`}>
            {Number.isInteger(attempt.score) ? attempt.score : Number(attempt.score).toFixed(2).replace('.', ',')}
          </div>
          <div className="font-[family:var(--font-body)] text-[10px] text-[#D4DCD5]">/10</div>
        </div>
      </div>
    </div>
  );
}
