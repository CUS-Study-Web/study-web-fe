import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { LineChart } from "../../components/Charts";
import AttemptHistoryItem from "../../components/learner/AttemptHistoryItem";
import { useGetAssessmentDetailQuery, useGetAttemptsQuery } from "../../hooks/queries/useAssessments";

// We will map AssessmentAttempt list to chart data

export default function LearnerExamStartPage() {
  const { courseId, subjectId, examId, exerciseId } = useParams<{ courseId: string; subjectId: string; examId: string; exerciseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isExercise = location.pathname.includes('/exercises/');
  const assessmentId = (isExercise ? exerciseId : examId) ?? '';
  const key = courseId ?? '';

  const { data: detailData } = useGetAssessmentDetailQuery(key, assessmentId);
  const assessment = detailData?.data;

  const { data: attemptsData, isLoading: isLoadingAttempts } = useGetAttemptsQuery(key, assessmentId, { size: 5 });
  const attempts = attemptsData?.data || [];

  const exam = {
    title: assessment?.title ?? (isExercise ? "Bài tập thực hành" : "Đề thi thử"),
    level: "Nâng cao", // MOCK
    duration: isExercise ? "--:--" : `${assessment?.durationMin ?? 90} phút`,
    questions: assessment?.numQuestions ?? 40,
    attempts: 1240, // MOCK
  };

  const chartData = attempts.map((a) => a.totalQuestions > 0 ? (a.numCorrect / a.totalQuestions) * 10 : (a.score / 10));
  // attempt history is usually returned newest first, but chart wants L1, L2 (oldest first)
  // Let's reverse for chart
  const reversedData = [...chartData].reverse();
  const chartLabels = reversedData.map((_, i) => `L${i + 1}`);

  const bestScore = reversedData.length > 0 ? Math.max(...reversedData) : 0;
  const formattedBestScore = Number.isInteger(bestScore) ? bestScore.toString() : bestScore.toFixed(2).replace('.', ',');
  const avgScore = reversedData.length > 0 ? (reversedData.reduce((s, a) => s + a, 0) / reversedData.length) : 0;
  const formattedAvgScore = reversedData.length > 0 ? (Number.isInteger(avgScore) ? avgScore.toString() : avgScore.toFixed(2).replace('.', ',')) : "0";

  const handleTakeExam = () => {
    if (isExercise) {
      navigate(ROUTES.LEARNER.TAKE_EXERCISE(courseId, subjectId, exerciseId));
    } else {
      navigate(ROUTES.LEARNER.TAKE_EXAM(courseId, subjectId, examId));
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20 select-none">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B1F1C] to-[#2C3A1E] pt-[52px] pb-[80px] px-6 relative">
        <div
          onClick={() => {
            if (subjectId === "exam") {
              navigate(ROUTES.TRIAL);
            } else {
              navigate(ROUTES.LEARNER.SUBJECT_DETAIL(courseId, subjectId));
            }
          }}
          className="absolute top-6 left-6 md:top-8 md:left-8 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border-none flex items-center justify-center text-white"
          aria-label="Quay lại"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <div className="max-w-[900px] mx-auto text-center">
          <div className="font-[family:var(--font-heading)] font-bold text-4xl !text-white mb-3.5 tracking-tight leading-tight">
            {exam.title}
          </div>
          <div className="font-[family:var(--font-body)] text-[15px] !text-[var(--brand-soft-500)] opacity-75 mb-7 leading-relaxed">
            Hoàn thành đề thi trong thời gian quy định. Kết quả và lời giải chi tiết sẽ hiển thị ngay sau khi nộp bài.
          </div>
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
            className="font-[family:var(--font-heading)] font-bold text-lg px-12 py-[18px] rounded-[16px] border-none bg-[var(--brand-base-500)] !text-white cursor-pointer transition-all duration-150 ease-out inline-block hover:-translate-y-0.5 hover:bg-[#234A28] shadow-[0_8px_32px_rgba(44,90,49,0.5)]"
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="max-w-[1060px] mx-auto -mt-8 px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-7 items-start relative z-10">

        {/* Lịch sử làm bài */}
        <div className="bg-white rounded-[20px] border border-[#D4DCD5] shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="px-5.5 py-5 border-b border-[#EEF3EE] flex justify-between items-center">
            <div className="font-[family:var(--font-heading)] font-bold text-base text-[#1B1F1C] m-0">Lịch sử làm bài</div>
            <span className="font-[family:var(--font-body)] text-[13px] text-[#6B746D]">{attempts.length} lần thi</span>
          </div>
          <div>
            {isLoadingAttempts ? (
              <div className="p-6 text-center text-sm text-gray-500">Đang tải lịch sử...</div>
            ) : attempts.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">Bạn chưa làm bài tập/đề thi này lần nào.</div>
            ) : attempts.map((a, i) => (
              <AttemptHistoryItem
                key={a.id}
                attempt={{
                  date: new Date(a.completedAt).toLocaleDateString('en-GB'),
                  duration: `${a.durationMin}:00`,
                  status: (a.totalQuestions > 0 ? (a.numCorrect / a.totalQuestions) * 10 : (a.score / 10)) >= 8 ? "Giỏi" : (a.totalQuestions > 0 ? (a.numCorrect / a.totalQuestions) * 10 : (a.score / 10)) >= 6.5 ? "Khá" : "Trung bình",
                  score: a.totalQuestions > 0 ? (a.numCorrect / a.totalQuestions) * 10 : (a.score / 10)
                }}
                index={attempts.length - i - 1}
                totalAttempts={attempts.length}
                isLast={i === attempts.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Thống kê điểm số */}
        <div className="bg-white rounded-[20px] border border-[#D4DCD5] shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="px-5.5 py-5 border-b border-[#EEF3EE]">
            <div className="font-[family:var(--font-heading)] font-bold text-base text-[#1B1F1C] m-0 mb-1">Thống kê điểm số</div>
            <div className="font-[family:var(--font-body)] text-[13px] text-[#6B746D] m-0">Biểu đồ tiến bộ qua các lần thi</div>
          </div>
          <div className="grid grid-cols-3 gap-0 border-b border-[#EEF3EE]">
            {[
              { label: "Điểm cao nhất", value: formattedBestScore, color: "text-[var(--brand-base-500)]" },
              { label: "Điểm trung bình", value: formattedAvgScore, color: "text-[#2F6FAE]" },
              { label: "Số lần thi", value: attempts.length, color: "text-[#B7791F]" }
            ].map(({ label, value, color }, i) => (
              <div key={label} className={`px-[18px] py-4 text-center ${i < 2 ? "border-r border-[#EEF3EE]" : "border-none"}`}>
                <div className={`font-[family:var(--font-heading)] font-extrabold text-2xl leading-none ${color}`}>{value}</div>
                <div className="font-[family:var(--font-body)] text-xs text-[#6B746D] mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="px-4 pt-5 pb-4">
            <div className="h-64">
              {reversedData.length > 0 ? (
                <LineChart title="Điểm qua các lần thi" label="Điểm số" labels={chartLabels} data={reversedData} color="#2F6FAE" />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">Chưa có dữ liệu biểu đồ</div>
              )}
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
