import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { COURSES_DATA } from "../../utils/coursesData";
import ProgressBar from "../../components/learner/ProgressBar";
import LessonItem from "../../components/learner/LessonItem";
import ExerciseItem from "../../components/learner/ExerciseItem";

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
  { id: 1, title: "Bài tập Tư duy logic – Tuần 1", size: "1.4 MB", date: "15/07/2024", completed: true },
  { id: 2, title: "Bài tập Toán ứng dụng – Tuần 2", size: "2.1 MB", date: "22/07/2024" },
  { id: 3, title: "Bài tập Toán tư duy logic – Tuần 3", size: "2.4 MB", date: "29/07/2024" },
  { id: 4, title: "Bài tập Ngữ văn nghị luận xã hội", size: "1.2 MB", date: "05/08/2024" },
];

export default function LearnerSubjectDetailPage() {
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const [activeTab, setActiveTab] = useState<"lessons" | "exercises">("lessons");

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
                  <span className="font-[family:var(--font-heading)] font-bold text-[11px] text-[var(--brand-soft-500)] tracking-[0.3px]">Chi tiết môn học</span>
                </div>
                <h1 className="font-[family:var(--font-heading)] font-extrabold text-4xl !text-white m-0 tracking-tight">
                  {subject.title}
                </h1>
              </div>

              {/* CỘT PHẢI */}
              <div className="shrink-0 min-w-[200px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-[family:var(--font-heading)] font-semibold text-xs text-[var(--brand-soft-500)]/85">Tiến độ học</span>
                  <span className="font-[family:var(--font-heading)] font-bold text-xs text-[#A8D5A2]">38%</span>
                </div>
                <ProgressBar
                  progress={38}
                  heightClass="h-2"
                  bgClass="bg-white/20"
                  fillStyle={{ background: "linear-gradient(90deg, #5EA85A, #A8D5A2)" }}
                />
                <div className="font-[family:var(--font-body)] text-[11px] text-[var(--brand-soft-500)]/70 mt-1.5">
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
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "lessons" ? "bg-[var(--brand-base-500)] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📖 Bài giảng ({MOCK_LESSONS.length})
          </button>
          <button
            onClick={() => setActiveTab("exercises")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "exercises" ? "bg-[var(--brand-base-500)] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📎 Bài tập ({MOCK_EXERCISES.length})
          </button>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <section className="mx-auto w-full max-w-[1160px] pt-9 px-6 pb-20">
        
        {/* TAB 1: BÀI GIẢNG */}
        {activeTab === "lessons" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {MOCK_LESSONS.map((lesson, i) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                isLast={i === MOCK_LESSONS.length - 1}
              />
            ))}
          </div>
        )}

        {/* TAB 2: BÀI TẬP */}
        {activeTab === "exercises" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {MOCK_EXERCISES.map((ex, i) => (
              <ExerciseItem
                key={ex.id}
                exercise={ex}
                isLast={i === MOCK_EXERCISES.length - 1}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}