import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { LineChart } from "../../components/Charts";
import AttemptHistoryItem from "../../components/learner/AttemptHistoryItem";

type AttemptRecord = {
  date: string;
  duration: string;
  status: "Khá" | "Tốt" | "Giỏi" | "Trung bình" | string;
  score: number;
};

type ExamData = {
  title: string;
  level: string;
  duration: string;
  questions: number;
  attempts: number;
};

// MOCK DATA
const ATTEMPT_HISTORY: AttemptRecord[] = [
  { date: "12/05/2026", duration: "45:20", status: "Khá", score: 7.5 },
  { date: "15/05/2026", duration: "42:10", status: "Tốt", score: 8.5 },
  { date: "18/05/2026", duration: "39:50", status: "Giỏi", score: 9.5 }
];

export default function LearnerExamStartPage() {
  const { courseId, subjectId, examId } = useParams<{ courseId: string; subjectId: string; examId: string }>();
  const navigate = useNavigate();
  
  // Mock Exam logic
  const exam: ExamData = {
    title: "Đề thi thử THPT Quốc gia 2026",
    level: "Nâng cao",
    duration: "90 phút",
    questions: 40,
    attempts: 1240,
  };

  const chartData = ATTEMPT_HISTORY.map((a) => a.score);
  const chartLabels = ATTEMPT_HISTORY.map((_, i) => `L${i + 1}`);
  

    
  const bestScore = Math.max(...chartData);
  const avgScore = (chartData.reduce((s, a) => s + a, 0) / chartData.length).toFixed(1);

  const handleTakeExam = () => {
    navigate(ROUTES.LEARNER.TAKE_EXAM(courseId, subjectId, examId));
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20 select-none">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B1F1C] to-[#2C3A1E] pt-[52px] pb-[80px] px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="flex justify-center gap-2.5 mb-5">
            <span className="bg-white/15 !text-white font-[family:var(--font-heading)] font-semibold text-[11px] px-2.5 py-[3px] rounded-full">
              {subjectId?.replace("-", " ")?.toUpperCase() || "TOÁN HỌC"}
            </span>
            <span className={`${exam.level === "Nâng cao" ? "bg-[#FAE0E0] text-[#C94B4B]" : "bg-[#FBF0DC] text-[#B7791F]"} font-[family:var(--font-heading)] font-semibold text-[11px] px-2.5 py-[3px] rounded-full`}>
              {exam.level}
            </span>
          </div>
          <h1 className="font-[family:var(--font-heading)] font-bold text-4xl !text-white mb-3.5 tracking-tight leading-tight">
            {exam.title}
          </h1>
          <p className="font-[family:var(--font-body)] text-[15px] !text-[#DCE9DE] opacity-75 mb-7 leading-relaxed">
            Hoàn thành đề thi trong thời gian quy định. Kết quả và lời giải chi tiết sẽ hiển thị ngay sau khi nộp bài.
          </p>
          <div className="flex justify-center gap-6 mb-8 flex-wrap">
            {[
              { icon: "🕐", label: "Thời gian", value: exam.duration }, 
              { icon: "📝", label: "Số câu hỏi", value: `${exam.questions} câu` }, 
              { icon: "👥", label: "Lượt thi", value: `${exam.attempts} lượt` }
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white/10 rounded-[14px] px-5 py-3.5 text-center min-w-[120px]">
                <div className="text-[22px] mb-1.5">{icon}</div>
                <div className="font-[family:var(--font-heading)] font-bold text-base !text-white">{value}</div>
                <div className="font-[family:var(--font-body)] text-xs !text-white opacity-50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleTakeExam} 
            className="font-[family:var(--font-heading)] font-bold text-lg px-12 py-[18px] rounded-[16px] border-none bg-[#2C5A31] !text-white cursor-pointer transition-all duration-150 ease-out inline-block hover:-translate-y-0.5 hover:bg-[#234A28] shadow-[0_8px_32px_rgba(44,90,49,0.5)]"
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
      
      {/* Bottom Grid */}
      <div className="max-w-[1060px] mx-auto -mt-8 px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-7 items-start">
        
        {/* Lịch sử làm bài */}
        <div className="bg-white rounded-[20px] border border-[#D4DCD5] shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="px-5.5 py-5 border-b border-[#EEF3EE] flex justify-between items-center">
            <h3 className="font-[family:var(--font-heading)] font-bold text-base text-[#1B1F1C] m-0">Lịch sử làm bài</h3>
            <span className="font-[family:var(--font-body)] text-[13px] text-[#6B746D]">{ATTEMPT_HISTORY.length} lần thi</span>
          </div>
          <div>
            {ATTEMPT_HISTORY.slice().reverse().map((a, i) => (
              <AttemptHistoryItem 
                key={i} 
                attempt={a} 
                index={i} 
                totalAttempts={ATTEMPT_HISTORY.length}
                isLast={i === ATTEMPT_HISTORY.length - 1}
              />
            ))}
          </div>
        </div>
        
        {/* Thống kê điểm số */}
        <div className="bg-white rounded-[20px] border border-[#D4DCD5] shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="px-5.5 py-5 border-b border-[#EEF3EE]">
            <h3 className="font-[family:var(--font-heading)] font-bold text-base text-[#1B1F1C] m-0 mb-1">Thống kê điểm số</h3>
            <p className="font-[family:var(--font-body)] text-[13px] text-[#6B746D] m-0">Biểu đồ tiến bộ qua các lần thi</p>
          </div>
          <div className="grid grid-cols-3 gap-0 border-b border-[#EEF3EE]">
            {[
              { label: "Điểm cao nhất", value: bestScore, color: "text-[#2C5A31]" }, 
              { label: "Điểm trung bình", value: avgScore, color: "text-[#2F6FAE]" }, 
              { label: "Số lần thi", value: ATTEMPT_HISTORY.length, color: "text-[#B7791F]" }
            ].map(({ label, value, color }, i) => (
              <div key={label} className={`px-[18px] py-4 text-center ${i < 2 ? "border-r border-[#EEF3EE]" : "border-none"}`}>
                <div className={`font-[family:var(--font-heading)] font-extrabold text-2xl leading-none ${color}`}>{value}</div>
                <div className="font-[family:var(--font-body)] text-xs text-[#6B746D] mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="px-4 pt-5 pb-4">
            <div className="h-64">
              <LineChart title="Điểm qua các lần thi" label="Điểm số" labels={chartLabels} data={chartData} color="#2F6FAE" />
            </div>
            <div className="font-[family:var(--font-body)] text-[11px] text-[#6B746D] text-center mt-2">
              Trục Y: Điểm số (0–10) · Trục X: Lần thi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
