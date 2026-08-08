

type Question = {
  id: number;
  text: string;
};

type ExamQuestionViewerItemProps = {
  question: Question;
};

export default function ExamQuestionViewerItem({ question }: ExamQuestionViewerItemProps) {
  return (
    <div className="mb-7">
      <div className="font-[family:var(--font-heading)] font-bold text-sm text-[#1B1F1C] mb-2.5">
        Câu {question.id}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore?
      </div>
      {["A", "B", "C", "D"].map((opt, oi) => (
        <div
          key={opt}
          className="font-[family:var(--font-body)] text-sm text-[#3D4540] py-1.5 flex gap-2.5"
        >
          <span className="font-semibold">{opt}.</span>
          <span>
            {"Phương án " +
              opt +
              " — " +
              [
                "mô tả lựa chọn này",
                "đây là đáp án có thể đúng",
                "một phương án khác cho câu hỏi",
                "lựa chọn cuối cùng",
              ][oi]}
          </span>
        </div>
      ))}
    </div>
  );
}
