import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { COURSES_DATA } from "../../utils/coursesData";

// Mock data matching screenshots
const MOCK_LESSONS = [
  { id: 1, title: "Giới thiệu kỳ thi V-ACT & cấu trúc đề", duration: "42:10", isLocked: false },
  { id: 2, title: "Tư duy ngôn ngữ – Đọc hiểu nhanh", duration: "55:20", isLocked: false },
  { id: 3, title: "Tư duy logic – Suy luận và phân tích", duration: "68:00", isLocked: true },
  { id: 4, title: "Toán học ứng dụng – Đại số và xác suất", duration: "72:15", isLocked: true },
  { id: 5, title: "Khoa học tự nhiên – Vật lý & Hóa học", duration: "65:30", isLocked: true },
  { id: 6, title: "Khoa học xã hội – Lịch sử & Địa lý", duration: "58:45", isLocked: true },
  { id: 7, title: "Kỹ năng làm bài thi trên giấy hiệu quả", duration: "38:00", isLocked: true },
  { id: 8, title: "Ôn tập tổng hợp & đề thi thử toàn diện", duration: "90:00", isLocked: true },
];

const MOCK_EXERCISES = [
  { id: 1, title: "Bài tập Tư duy logic – Tuần 1", size: "1.4 MB", date: "15/07/2024" },
  { id: 2, title: "Bài tập Toán ứng dụng – Tuần 2", size: "2.1 MB", date: "22/07/2024" },
  { id: 3, title: "Bài tập Toán tư duy logic – Tuần 3", size: "2.4 MB", date: "29/07/2024" },
  { id: 4, title: "Bài tập Ngữ văn nghị luận xã hội", size: "1.2 MB", date: "05/08/2024" },
];

const MOCK_EXAMS = [
  { id: 1, title: "Đề thi thử V-ACT – Mã đề 001", time: "150 phút", questions: "120 câu", diff: "Trung bình" },
  { id: 2, title: "Đề thi thử V-ACT – Mã đề 002", time: "150 phút", questions: "120 câu", diff: "Nâng cao" },
  { id: 3, title: "Đề ôn tập tổng hợp V-ACT 2024", time: "150 phút", questions: "120 câu", diff: "Nâng cao" },
];

export default function LearnerSubjectDetailPage() {
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const [activeTab, setActiveTab] = useState<"lessons" | "exercises" | "exams">("lessons");

  // Fallback to defaults if not found
  const courseKey = courseId && COURSES_DATA[courseId.toLowerCase()] ? courseId.toLowerCase() : "v-act";
  const course = COURSES_DATA[courseKey];
  const subject = course?.subjects?.find((s) => s.id === subjectId) || { title: "Tiếng Anh" };

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20 select-none">
    {/* ── Hero Banner ── */}
      <section className="relative w-full h-[280px] bg-[#0d160f] overflow-hidden">
        {/* Ảnh nền */}
        <img
          src={course?.img || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070"}
          alt={course?.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Lớp gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-[#142d18]/90" />

        {/* Khối nội dung */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="mx-auto w-full max-w-[1160px]">
            <Link
              to={ROUTES.COURSE_DETAIL(courseKey)}
              className="inline-flex items-center gap-1.5 rounded-full transition-all bg-white/15 border border-white/25 px-3.5 py-1 mb-4 !text-white"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-[family:var(--font-heading)] font-semibold text-xs text-white">
                {course?.title || "V-ACT"} — Môn học
              </span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* CỘT TRÁI */}
              <div>
                <div className="inline-flex rounded-full bg-white/20 border border-white/30 px-3 py-1 mb-2.5">
                  <span className="font-[family:var(--font-heading)] font-bold text-[11px] text-[#DCE9DE] tracking-[0.3px]">Chi tiết môn học</span>
                </div>
                <h1 className="font-[family:var(--font-heading)] font-extrabold text-4xl !text-white m-0 tracking-tight">
                  {subject.title}
                </h1>
              </div>

              {/* CỘT PHẢI */}
              <div className="shrink-0 min-w-[200px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-[family:var(--font-heading)] font-semibold text-xs text-[#DCE9DE]/85">Tiến độ học</span>
                  <span className="font-[family:var(--font-heading)] font-bold text-xs text-[#A8D5A2]">38%</span>
                </div>
                <div className="w-full rounded-full overflow-hidden bg-white/20 h-2">
                  <div className="h-full rounded-full w-[38%] bg-gradient-to-r from-[#5EA85A] to-[#A8D5A2]" />
                </div>
                <div className="font-[family:var(--font-body)] text-[11px] text-[#DCE9DE]/70 mt-1.5">
                  2/8 bài học hoàn thành
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#E4EBE5] px-6">
        <div className="mx-auto flex gap-1 overflow-x-auto hide-scrollbar w-full max-w-[1160px] py-2">
          <button
            onClick={() => setActiveTab("lessons")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "lessons" ? "bg-[#2C5A31] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📖 Bài giảng ({MOCK_LESSONS.length})
          </button>
          <button
            onClick={() => setActiveTab("exercises")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "exercises" ? "bg-[#2C5A31] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📎 Bài tập ({MOCK_EXERCISES.length})
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "exams" ? "bg-[#2C5A31] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📝 Đề thi ({MOCK_EXAMS.length})
          </button>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <section className="mx-auto w-full max-w-[1160px] pt-9 px-6 pb-20">
        
        {/* TAB 1: BÀI GIẢNG */}
        {activeTab === "lessons" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {MOCK_LESSONS.map((lesson, i) => (
              <div key={lesson.id} className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${i < MOCK_LESSONS.length - 1 ? "border-b border-[#F4F7F4]" : "border-none"}`}>
                <div className="flex items-center gap-4 flex-1">
                  {/* Number badge */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${lesson.isLocked ? "bg-[#F4F7F4]" : "bg-[#DCE9DE]"}`}>
                    {lesson.isLocked ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="11" width="18" height="11" rx="3" fill="#A0AAA2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#A0AAA2" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <span className="font-[family:var(--font-heading)] font-bold text-xs text-[#2C5A31]">{String(lesson.id).padStart(2, "0")}</span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className={`font-[family:var(--font-heading)] text-sm leading-snug ${lesson.isLocked ? "font-medium text-[#A0AAA2]" : "font-bold text-[#1B1F1C]"}`}>
                      {lesson.title}
                    </div>
                    <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1">
                      ⏱ {lesson.duration}
                    </div>
                  </div>
                </div>
                {/* Action Right */}
                <div className="mt-2 md:mt-0 self-start md:self-auto shrink-0">
                  {lesson.isLocked ? (
                    <span className="font-[family:var(--font-heading)] font-semibold text-xs text-[#A0AAA2] whitespace-nowrap">
                      🔒 VIP
                    </span>
                  ) : (
                    <button className="transition-colors cursor-pointer whitespace-nowrap hover:bg-[#1B1F1C] font-[family:var(--font-heading)] font-bold text-xs px-4.5 py-2 rounded-full border-none bg-[#2C5A31] !text-white">
                      Xem bài
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: BÀI TẬP */}
        {activeTab === "exercises" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {MOCK_EXERCISES.map((ex, i) => (
              <div key={ex.id} className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${i < MOCK_EXERCISES.length - 1 ? "border-b border-[#F4F7F4]" : "border-none"}`}>
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon Left */}
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#DCE9DE] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(44,90,49,0.8)" />
                      <polyline points="14,2 14,8 20,8" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-[family:var(--font-heading)] font-bold text-sm text-[#1B1F1C] leading-snug">
                      {ex.title}
                    </div>
                    <div className="font-[family:var(--font-body)] text-xs text-[#A0AAA2] mt-1">
                      PDF · {ex.size} · Đăng ngày {ex.date}
                    </div>
                  </div>
                </div>
                {/* Action Right */}
                <div className="mt-3 md:mt-0 self-start md:self-auto shrink-0">
                  <button className="transition-all cursor-pointer whitespace-nowrap hover:bg-[#2C5A31] hover:!text-white font-[family:var(--font-heading)] font-bold text-xs px-4.5 py-2 rounded-full border-[1.5px] border-[#2C5A31] bg-white text-[#2C5A31]">
                    ⬇ Tải về
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ĐỀ THI */}
        {activeTab === "exams" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {MOCK_EXAMS.map((exam, i) => (
              <div key={exam.id} className={`hover:bg-[#FAFCFA] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors px-5.5 py-4.5 ${i < MOCK_EXAMS.length - 1 ? "border-b border-[#F4F7F4]" : "border-none"}`}>
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon Left */}
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#FFF3ED] flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(230,81,0,0.8)" />
                      <polyline points="14,2 14,8 20,8" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-[family:var(--font-heading)] font-bold text-sm text-[#1B1F1C] leading-snug">
                      {exam.title}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="font-[family:var(--font-body)] text-xs text-[#A0AAA2]">
                        ⏱ {exam.time}
                      </span>
                      <span className="font-[family:var(--font-body)] text-xs text-[#E65100]">
                        📝 {exam.questions}
                      </span>
                      <span className={`font-[family:var(--font-heading)] font-semibold text-xs ${exam.diff === "Nâng cao" ? "text-[#E65100]" : "text-[#6B746D]"}`}>
                        {exam.diff}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Action Right */}
                <div className="mt-3 md:mt-0 self-start md:self-auto shrink-0">
                  <Link 
                    to={ROUTES.LEARNER.EXAM_START(courseKey, subjectId, String(exam.id))}
                    className="inline-flex transition-all cursor-pointer whitespace-nowrap hover:bg-[#1e4022] font-[family:var(--font-heading)] font-bold text-xs px-4.5 py-2 rounded-full border-none bg-[#2C5A31] !text-white" 
                  >
                    Bắt đầu thi →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}