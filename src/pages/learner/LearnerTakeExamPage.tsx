import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import Header from "../../components/guest/Header";
import ExamQuestionViewerItem from "../../components/learner/ExamQuestionViewerItem";
import ExamAnswerSelector from "../../components/learner/ExamAnswerSelector";

type Question = {
  id: number;
  text: string;
};

type ExamData = {
  title: string;
  duration: string;
  questions: number;
};

const EXAM_QUESTIONS: Question[] = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, text: `Câu ${i + 1}` }));

export default function LearnerTakeExamPage() {
  const { courseId, subjectId, examId, exerciseId } = useParams<{ courseId: string; subjectId: string; examId: string; exerciseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isExercise = location.pathname.includes('/exercises/');
  
  const exam: ExamData = {
    title: isExercise ? "Bài tập thực hành" : "Đề thi thử THPT Quốc gia 2026",
    duration: isExercise ? "--:--" : "90 phút",
    questions: 40,
  };

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90 * 60);

  useEffect(() => {
    if (submitted || isExercise) return;
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted, isExercise]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const answered = Object.keys(answers).length;
  const total = EXAM_QUESTIONS.length;

  const correctAnswers: Record<number, string> = {};
  EXAM_QUESTIONS.forEach((q) => { correctAnswers[q.id] = ["A","B","C","D"][q.id % 4]; });
  const score = Math.round((answered / total) * 10 * 10) / 10;

  return (
    <div className="bg-[#F9FAFB] min-h-screen select-none flex flex-col">
      <Header />
      <div className="max-w-[1200px] mx-auto pt-7 px-6 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-start flex-grow w-full">
        {/* Left: PDF viewer */}
        <div className="bg-white rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#E4EBE5] overflow-hidden">
          {/* Toolbar */}
          <div className="bg-[var(--surface-500)] border-b border-[#E4EBE5] py-2.5 px-4 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="font-[family:var(--font-body)] text-[13px] text-[#6B746D] font-medium">📄 {exam.title}</div>
            <div className="flex gap-2">
              <button className="font-[family:var(--font-body)] text-[12px] px-2.5 py-1 rounded-lg border border-[#D4DCD5] bg-white text-[#3D4540] cursor-pointer">−</button>
              <span className="font-[family:var(--font-body)] text-[12px] text-[#3D4540] self-center">100%</span>
              <button className="font-[family:var(--font-body)] text-[12px] px-2.5 py-1 rounded-lg border border-[#D4DCD5] bg-white text-[#3D4540] cursor-pointer">+</button>
            </div>
          </div>
          {/* Paper */}
          <div className="bg-[#6B746D] p-6 min-h-[700px] overflow-y-auto">
            <div className="bg-white max-w-[680px] mx-auto rounded-md pt-12 px-14 pb-12 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <div className="text-center mb-8 pb-6 border-b-2 border-[#1B1F1C]">
                <div className="font-[family:var(--font-heading)] font-bold text-[13px] uppercase tracking-[1px] text-[#1B1F1C] mb-2">BỘ GIÁO DỤC VÀ ĐÀO TẠO</div>
                <div className="font-[family:var(--font-heading)] font-bold text-lg text-[#1B1F1C]">
                  {isExercise ? "BÀI TẬP THỰC HÀNH" : "ĐỀ THI THỬ THPT QUỐC GIA"}
                </div>
                <div className="font-[family:var(--font-heading)] font-semibold text-sm text-[#3D4540] mt-1.5">{exam.title}</div>
                <div className="font-[family:var(--font-body)] text-xs text-[#6B746D] mt-1.5">
                  Thời gian: {exam.duration} — {exam.questions} câu hỏi
                </div>
              </div>
              {EXAM_QUESTIONS.slice(0, 10).map((q) => (
                <ExamQuestionViewerItem key={q.id} question={q} />
              ))}
              <div className="text-center text-[#D4DCD5] font-[family:var(--font-body)] text-[13px] pt-6 pb-2">— Hết trang 1 / 4 —</div>
            </div>
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="sticky top-[84px] h-[calc(100vh-100px)]">
          {submitted ? (
            <div className="bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E4EBE5] overflow-hidden flex flex-col h-full">
              {/* Result summary */}
              <div className="p-5 border-b border-[#F0F4F1] shrink-0">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-soft-500)] flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--brand-base-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="font-[family:var(--font-heading)] font-bold text-lg text-[var(--text-primary-500)] leading-tight">Đã nộp bài!</div>
                    <div className="font-[family:var(--font-body)] text-[13px] text-[var(--text-secondary-400)] mt-0.5">Bạn đã trả lời {answered}/{total} câu hỏi.</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[var(--brand-soft-500)] to-[#EEF5EF] rounded-[14px] px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-[family:var(--font-heading)] font-extrabold text-4xl text-[var(--brand-base-500)] leading-none">{score}<span className="text-base text-[#6B746D] font-semibold">/10</span></div>
                    <div className="font-[family:var(--font-body)] text-xs text-[#6B746D] mt-1">Điểm ước tính</div>
                  </div>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="var(--brand-base-500)" strokeWidth="2" opacity="0.3"/>
                    <circle cx="20" cy="20" r="18" stroke="var(--brand-base-500)" strokeWidth="2" strokeDasharray={`${score / 10 * 113} 113`} strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}/>
                    <text x="20" y="25" textAnchor="middle" className="font-[family:var(--font-heading)] font-bold text-[11px] fill-[var(--brand-base-500)]">{Math.round(score * 10)}%</text>
                  </svg>
                </div>
              </div>

              {/* Scrollable answer review */}
              <div className="custom-scrollbar overflow-y-auto flex-1 py-3">
                <div className="px-5.5 py-2 font-[family:var(--font-heading)] font-bold text-[11px] text-[#6B746D] uppercase tracking-[0.4px]">Đáp án chi tiết</div>
                {EXAM_QUESTIONS.map((q) => {
                  const userAns = answers[q.id];
                  const correct = correctAnswers[q.id];
                  return (
                    <div key={q.id} className="flex items-center gap-2 px-4 py-2 border-b border-[var(--surface-500)]">
                      <div className="font-[family:var(--font-heading)] font-semibold text-xs text-[#6B746D] min-w-[44px]">Câu {q.id}</div>
                      <div className="flex gap-1.5 flex-1 justify-end">
                        {["A","B","C","D"].map((opt) => {
                          const isUser = userAns === opt;
                          const isCorrect = correct === opt;
                          const bg = isUser && isCorrect ? "bg-[var(--brand-base-500)]" : isUser && !isCorrect ? "bg-[var(--error-500)]" : "bg-white";
                          const color = isUser ? "text-white" : "text-[#6B746D]";
                          const border = isCorrect && !isUser ? "border-2 border-[var(--brand-base-500)]" : isUser ? "border-none" : "border-[1.5px] border-[#D4DCD5]";
                          return (
                            <div key={opt} className={`w-7 h-7 rounded-full ${border} ${bg} ${color} font-[family:var(--font-heading)] font-bold text-xs flex items-center justify-center shrink-0`}>
                              {opt}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-4 shrink-0 flex items-center justify-center">
                        {userAns && (userAns === correct
                          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="var(--brand-base-500)"/><path d="M4 7l2.5 2.5L10 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="var(--error-500)"/><path d="M5 5l4 4M9 5l-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sticky footer actions */}
              <div className="px-4 py-3.5 border-t border-[#F0F4F1] flex gap-2 shrink-0">
                <button 
                  onClick={() => navigate(ROUTES.LEARNER.SUBJECT_DETAIL(courseId, subjectId))}
                  className="flex-1 font-[family:var(--font-heading)] !font-bold text-[13px] py-2.5 rounded-xl border-[1.5px] border-[#D4DCD5] bg-white !text-[#3D4540] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Thoát
                </button>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                    setSecondsLeft(90 * 60);
                  }}
                  className="flex-1 font-[family:var(--font-heading)] !font-bold text-[13px] py-2.5 rounded-xl border-none bg-[var(--brand-base-500)] !text-white cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Làm lại
                </button>
                <button 
                  className="flex-1 font-[family:var(--font-heading)] !font-bold text-[13px] py-2.5 rounded-xl border-[1.5px] border-[var(--brand-base-500)] bg-white !text-[var(--brand-base-500)] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Xem lời giải
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E4EBE5] overflow-hidden flex flex-col h-full">
            {/* Timer */}
            <div className={`shrink-0 p-5 pb-4 ${!isExercise && secondsLeft < 300 ? "bg-gradient-to-br from-[var(--error-500)] to-[#a83434]" : "bg-gradient-to-br from-[var(--brand-base-500)] to-[#1e4023]"}`}>
              <div className="font-[family:var(--font-body)] text-xs text-white/75 mb-1.5 text-center">Thời gian còn lại</div>
              <div className="font-[family:var(--font-heading)] font-extrabold text-[40px] text-white text-center tracking-[2px] leading-none">
                {isExercise ? "--:--" : `${mm}:${ss}`}
              </div>
              <div className="flex justify-center gap-4 mt-3">
                <div className="text-center">
                  <div className="font-[family:var(--font-heading)] font-bold text-base text-white">{answered}</div>
                  <div className="font-[family:var(--font-body)] text-[11px] text-white/70">Đã trả lời</div>
                </div>
                <div className="w-[1px] bg-white/20" />
                <div className="text-center">
                  <div className="font-[family:var(--font-heading)] font-bold text-base text-white">{total - answered}</div>
                  <div className="font-[family:var(--font-body)] text-[11px] text-white/70">Chưa trả lời</div>
                </div>
              </div>
            </div>

            {/* Question list */}
            <div className="custom-scrollbar overflow-y-auto flex-1 py-3">
              {EXAM_QUESTIONS.map((q) => (
                <ExamAnswerSelector
                  key={q.id}
                  question={q}
                  selectedAnswer={answers[q.id]}
                  onSelect={(opt) => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                />
              ))}
            </div>

            {/* Submit */}
            <div className="shrink-0 py-3.5 px-4 border-t border-[#E4EBE5]">
              <button onClick={() => setSubmitted(true)}
                className="w-full font-[family:var(--font-heading)] !font-bold text-[15px] py-3.5 rounded-[14px] border-none bg-[var(--brand-base-500)] !text-white cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-150 ease-out hover:bg-[#234A28]"
              >
                Nộp bài
              </button>
              <button 
                onClick={() => {
                  if (isExercise) {
                    navigate(ROUTES.LEARNER.EXERCISE_START(courseId, subjectId, exerciseId));
                  } else {
                    navigate(ROUTES.LEARNER.EXAM_START(courseId, subjectId, examId));
                  }
                }} 
                className="w-full font-[family:var(--font-body)] text-[13px] py-2 mt-2 rounded-[12px] border-none bg-transparent !text-[#6B746D] cursor-pointer transition-all duration-150 ease-out hover:bg-[var(--surface-500)]"
              >
                Thoát
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
