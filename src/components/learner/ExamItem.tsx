import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { FileText, Clock, HelpCircle, ArrowRight } from "lucide-react";

type Exam = {
  id: number;
  title: string;
  time: string;
  questions: string;
  diff: string;
};

type ExamItemProps = {
  exam: Exam;
  isLast: boolean;
  courseKey: string;
  subjectId: string;
};

export default function ExamItem({ exam, isLast, courseKey, subjectId }: ExamItemProps) {
  return (
    <div
      className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${
        !isLast ? "border-b border-[var(--surface-500)]" : "border-none"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Icon Left */}
        <div className="w-[42px] h-[42px] rounded-xl bg-[#FFF3ED] flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-[#E65100]" />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-[family:var(--font-heading)] font-bold text-sm text-[#1B1F1C] leading-snug">
            {exam.title}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{exam.time}</span>
            </span>
            <span className="font-[family:var(--font-body)] text-xs text-[#E65100] flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>{exam.questions}</span>
            </span>
            <span
              className={`font-[family:var(--font-heading)] font-semibold text-xs ${
                exam.diff === "Nâng cao" ? "text-[#E65100]" : "text-[#6B746D]"
              }`}
            >
              {exam.diff}
            </span>
          </div>
        </div>
      </div>
      {/* Action Right */}
      <div className="mt-3 md:mt-0 self-start md:self-auto shrink-0">
        <Link
          to={ROUTES.LEARNER.EXAM_START(courseKey, subjectId, String(exam.id))}
          className="inline-flex items-center transition-all cursor-pointer whitespace-nowrap hover:bg-[#1e4022] font-[family:var(--font-heading)] font-bold text-xs px-4.5 py-2 rounded-full border-none bg-[var(--brand-base-500)] !text-white"
        >
          <span>Bắt đầu thi</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
