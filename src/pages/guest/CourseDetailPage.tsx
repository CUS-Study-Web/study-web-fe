import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { COURSES_DATA } from "../../utils/coursesData";
import type { Subject } from "../../types/course";
import SubjectCard from "../../components/guest/SubjectCard";
import ExamCard from "../../components/guest/ExamCard";
import VipGateModal from "../../components/guest/VipGateModal";
import { ROUTES } from "../../utils/routes";
import { useGetCoursesQuery, useGetCourseDetailQuery } from "../../hooks/queries/useCourses";
import { useGetExamsQuery } from "../../hooks/queries/useAssessments";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState<'subjects' | 'exams'>('subjects');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const courseKey = courseId ?? "";

  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery({ size: 100 });
  const course = coursesData?.data.find((c) => c.id === courseKey);

  const { data: detailData, isLoading: isLoadingDetail } = useGetCourseDetailQuery(courseKey);
  const subjects = detailData?.data.subjects || [];

  const { data: examsData, isLoading: isLoadingExams } = useGetExamsQuery(courseKey, { size: 100 });
  const exams = examsData?.data || [];

  // Fallback styles from COURSES_DATA using course title matching or index
  const styleSource = Object.values(COURSES_DATA).find(c => c.title.toLowerCase() === course?.title?.toLowerCase())
    || Object.values(COURSES_DATA)[0];

  const isLoading = isLoadingCourses || isLoadingDetail;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--surface-500)]">
        <div className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
          Đang tải thông tin khóa học...
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--surface-500)]">
        <div className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
          Không tìm thấy khóa học.
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-[var(--surface-500)] select-none min-h-screen">
      {/* Hero Header Section */}
      <section className={`${styleSource.headerBg} pt-12 pb-16 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-[#28522d]/40 relative overflow-hidden`}>
        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Breadcrumb / Back Link */}
          <Link
            to={isLoggedIn ? ROUTES.LEARNER.MY_COURSES : ROUTES.COURSES}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold !text-[#beccbf] hover:!text-white mb-6 transition"
          >
            <span>‹</span> {isLoggedIn ? "Khóa học của tôi" : "Tất cả khóa học"}
          </Link>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black !text-white mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {course.title}
          </h1>

          <p
            className="!text-[#beccbf] max-w-2xl text-base md:text-lg leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {course.description || "Chọn môn học để bắt đầu lộ trình ôn tập — mỗi môn gồm bài giảng, bài tập và đề thi thử riêng biệt."}
          </p>
        </div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#E4EBE5] px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto flex gap-1 overflow-x-auto hide-scrollbar w-full max-w-[1440px] py-2">
          <div
            onClick={() => setActiveTab("subjects")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "subjects" ? "bg-[var(--brand-base-500)] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📚 Môn học ({subjects.length})
          </div>
          <div
            onClick={() => setActiveTab("exams")}
            className={`flex items-center gap-2 rounded-full transition-all whitespace-nowrap cursor-pointer font-[family:var(--font-heading)] font-bold text-sm px-6 py-2.5 ${activeTab === "exams" ? "bg-[var(--brand-base-500)] !text-white" : "bg-transparent text-[#6B746D]"}`}
          >
            📝 Đề thi ({exams.length})
          </div>
        </div>
      </div>

      {/* Main Subjects Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-8">

        {/* Tab Content */}
        {activeTab === "subjects" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((sub, index) => {
              // Mock tiến độ học 
              const mockProgressArray = [70, 15, 15, 80, 53, 51, 69, 21];
              const progress = isLoggedIn ? (mockProgressArray[index % mockProgressArray.length] || 0) : undefined;

              return (
                <SubjectCard
                  key={sub.id}
                  title={sub.name}
                  duration={`${sub.durationHours} giờ`}
                  lessons={sub.lessonCount}
                  cardHeaderBg={styleSource.cardHeaderBg}
                  cardBtnColor={styleSource.cardBtnColor}
                  progress={progress}
                  onSelect={() => {
                    if (isLoggedIn) {
                      navigate(ROUTES.LEARNER.SUBJECT_DETAIL(courseKey, sub.id));
                    } else {
                      setSelectedSubject({ id: sub.id, title: sub.name, duration: `${sub.durationHours} giờ`, lessons: sub.lessonCount });
                    }
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingExams ? (
              <div className="col-span-full text-center py-10 font-[family:var(--font-body)] text-[var(--text-secondary)]">
                Đang tải đề thi...
              </div>
            ) : exams.length === 0 ? (
              <div className="col-span-full text-center py-12 text-[#5c635e]">
                <p className="text-lg font-bold">Chưa có đề thi nào.</p>
              </div>
            ) : (
              exams.map(exam => (
                <ExamCard
                  key={exam.id}
                  id={exam.id}
                  courseId={courseKey}
                  course={course?.title || "Tổng hợp"}
                  title={exam.title}
                  time={exam.durationMin ? `${exam.durationMin} phút` : "Không giới hạn"}
                  questions={exam.numQuestions ? `${exam.numQuestions} câu` : "0 câu"}
                  attempts={String(exam.totalTakes ?? 0)}
                  isVip={exam.accessTier === 'VIP'}
                />
              ))
            )}
          </div>
        )}
      </section>

      {/* VIP Gate Modal */}
      <VipGateModal
        isOpen={!!selectedSubject}
        subjectTitle={selectedSubject?.title || ""}
        courseTitle={course.title}
        onClose={() => setSelectedSubject(null)}
      />
    </div>
  );
}
