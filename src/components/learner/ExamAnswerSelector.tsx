

type Question = {
  id: number;
  text: string;
};

type ExamAnswerSelectorProps = {
  question: Question;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
};

export default function ExamAnswerSelector({
  question,
  selectedAnswer,
  onSelect,
}: ExamAnswerSelectorProps) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-4 border-b border-[#F4F7F4]">
      <div className="font-[family:var(--font-heading)] font-semibold text-xs text-[#6B746D] min-w-[40px]">
        Câu {question.id}
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        {["A", "B", "C", "D"].map((opt) => {
          const isSelected = selectedAnswer === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`w-7 h-7 rounded-full font-[family:var(--font-heading)] font-bold text-xs cursor-pointer flex items-center justify-center transition-all duration-100 shrink-0 hover:scale-105 ${
                isSelected
                  ? "border-2 border-[#2C5A31] bg-[#2C5A31] text-white"
                  : "border-[1.5px] border-[#D4DCD5] bg-white text-[#6B746D]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
