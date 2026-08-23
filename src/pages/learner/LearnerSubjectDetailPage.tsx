import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { COURSES_DATA } from "../../utils/coursesData";
import ProgressBar from "../../components/learner/ProgressBar";
import LessonItem from "../../components/learner/LessonItem";
import ExerciseItem from "../../components/learner/ExerciseItem";
import { useGetCoursesQuery, useGetCourseDetailQuery } from "../../hooks/queries/useCourses";
import { useGetLessonsQuery } from "../../hooks/queries/useLessons";
import { useGetHomeworkQuery } from "../../hooks/queries/useAssessments";
import { useAuth } from "../../contexts/AuthContext";

export default function LearnerSubjectDetailPage() {
  const { courseId, subjectId } = useParams<{ courseId: string; subjectId: string }>();
  const [activeTab, setActiveTab] = useState<"lessons" | "exercises">("lessons");
  const { user } = useAuth();
  const isVip = !!user?.isVip;

  const courseKey = courseId ?? "";
  const subId = subjectId ?? "";

  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery({ size: 100 });
  const course = coursesData?.data.find((c) => c.id === courseKey);
  
  const { data: detailData, isLoading: isLoadingDetail } = useGetCourseDetailQuery(courseKey);
  const subject = detailData?.data.subjects.find((s) => s.id === subId);

  const { data: lessonsData, isLoading: isLoadingLessons } = useGetLessonsQuery(courseKey, subId);
  const lessons = lessonsData?.data?.lessons || [];

  const { data: homeworksData, isLoading: isLoadingHomeworks } = useGetHomeworkQuery(courseKey, { subjectId: subId, size: 100 });
  const exercises = homeworksData?.data || [];

  // Fallback styles from COURSES_DATA using course title matching or index
  const styleSource = Object.values(COURSES_DATA).find(c => c.title.toLowerCase() === course?.title?.toLowerCase()) 
    || Object.values(COURSES_DATA)[0];

  const isLoading = isLoadingCourses || isLoadingDetail || isLoadingLessons || isLoadingHomeworks;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
          Đang tải thông tin môn học...
        </div>
      </div>
    );
  }

  if (!course || !subject) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
          Không tìm thấy thông tin môn học.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20 select-none">
    {/* ── Hero Banner ── */}
      <section className="relative w-full h-[280px] bg-[#0d160f] overflow-hidden">
        {/* Ảnh nền */}
        <img
          src={styleSource.img || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070"}
          alt={course.title}
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
                {course.title} — Môn học
              </span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* CỘT TRÁI */}
              <div>
                <div className="inline-flex rounded-full bg-white/20 border border-white/30 px-3 py-1 mb-2.5">
                  <span className="font-[family:var(--font-heading)] font-bold text-[11px] text-[var(--brand-soft-500)] tracking-[0.3px]">Chi tiết môn học</span>
                </div>
                <div className="font-[family:var(--font-heading)] font-extrabold text-4xl !text-white m-0 tracking-tight">
                  {subject.name}
                </div>
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
            📖 Bài giảng ({lessons.length})
          </button>
          <button
            onClick={() => setActiveTab("exercises")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "exercises" ? "bg-[var(--brand-base-500)] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📎 Bài tập ({exercises.length})
          </button>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <section className="mx-auto w-full max-w-[1160px] pt-9 px-6 pb-20">
        
        {/* TAB 1: BÀI GIẢNG */}
        {activeTab === "lessons" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {lessons.length === 0 ? (
              <div className="py-12 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                Chưa có bài giảng nào.
              </div>
            ) : (
              lessons.map((lesson, i) => (
                <LessonItem
                  key={lesson.id}
                  lesson={{
                    id: i, // LessonItem expects number
                    title: lesson.title,
                    duration: `${lesson.durationMin} phút`,
                    isLocked: !isVip && i >= 2,
                    url: lesson.youtubeUrl
                  }}
                  isLast={i === lessons.length - 1}
                />
              ))
            )}
          </div>
        )}

        {/* TAB 2: BÀI TẬP */}
        {activeTab === "exercises" && (
          <div className="flex flex-col bg-white rounded-[18px] border border-[#E4EBE5] shadow-sm overflow-hidden">
            {exercises.length === 0 ? (
              <div className="py-12 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                Chưa có bài tập nào.
              </div>
            ) : (
              exercises.map((ex, i) => (
                <ExerciseItem
                  key={ex.id}
                  exercise={{
                    id: ex.id,
                    title: ex.title,
                    fileType: ex.fileType,
                    date: ex.createdAt ? new Date(ex.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "",
                    completed: false, // Default to false for now
                  }}
                  isLast={i === exercises.length - 1}
                  isLocked={!isVip}
                />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}