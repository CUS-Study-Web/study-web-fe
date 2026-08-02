import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { COURSES_DATA } from "../../utils/coursesData";
import type { Subject } from "../../types/course";
import SubjectCard from "../../components/guest/SubjectCard";
import VipGateModal from "../../components/guest/VipGateModal";
import { ROUTES } from "../../utils/routes";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Default to V-SAT if courseId not found
  const courseKey = (courseId && COURSES_DATA[courseId.toLowerCase()]) ? courseId.toLowerCase() : "v-sat";
  const course = COURSES_DATA[courseKey];

  return (
    <div className="pb-24 bg-[var(--surface-500)] select-none">
      {/* Hero Header Section */}
      <section className={`${course.headerBg} pt-12 pb-16 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-[#28522d]/40 relative overflow-hidden`}>
        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Breadcrumb / Back Link */}
          <Link
            to={ROUTES.COURSES}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold !text-[#beccbf] hover:!text-white mb-6 transition"
          >
            <span>‹</span> Tất cả khóa học
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
            Chọn môn học để bắt đầu lộ trình ôn tập — mỗi môn gồm bài giảng, bài tập và đề thi thử riêng biệt.
          </p>
        </div>
      </section>

      {/* Main Subjects Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-12">
        {/* Section Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-2xl md:text-3xl font-black !text-[var(--text-primary-500)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Danh sách môn học
          </h2>
          <span className="text-sm font-semibold text-[var(--text-secondary-300)]">
            {course.subjects.length} môn học
          </span>
        </div>

        {/* 4-Column Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {course.subjects.map((sub) => (
            <SubjectCard
              key={sub.id}
              title={sub.title}
              duration={sub.duration}
              lessons={sub.lessons}
              cardHeaderBg={course.cardHeaderBg}
              cardBtnColor={course.cardBtnColor}
              onSelect={() => setSelectedSubject(sub)}
            />
          ))}
        </div>
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
