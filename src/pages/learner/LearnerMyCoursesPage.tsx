import LearnerCourseCard from "../../components/learner/LearnerCourseCard";

import { useGetCoursesQuery } from "../../hooks/queries/useCourses";

export default function LearnerMyCoursesPage() {
  const { data, isLoading } = useGetCoursesQuery({ size: 100 });
  const courses = data?.data || [];

  return (
    <div className="pb-20 bg-[var(--surface-500)] min-h-screen">
      {/* ── Banner Header ── */}
      <section className="bg-[#18341e] py-12 px-4 md:px-8 lg:px-12 border-b border-[#254d2d]">
        <div className="max-w-[1200px] mx-auto">
          {/* Pill Badge */}
          <div className="inline-block bg-[#27502f] border border-[#396942] !text-[#b5cfb9] rounded-full px-4 py-1 text-[11px] font-extrabold mb-4 uppercase tracking-wider shadow-xs">
            HỌC VIÊN
          </div>
          {/* Title */}
          <div className="text-3xl md:text-4xl font-black !text-white mb-3 tracking-tight font-[family:var(--font-heading)]">
            Khóa học của tôi
          </div>
          {/* Subtitle */}
          <div className="!text-[#b5cfb9] max-w-xl text-sm md:text-base font-medium">
            Các khoá luyện thi bạn đang theo học tại CUS.
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10">
        <div className="mb-10 md:mb-12">
          <div className="text-[32px] font-black text-[var(--brand-base-700)] leading-tight mb-2 font-[family:var(--font-heading)]">
            {courses.length} khóa học
          </div>
        </div>

        {/* Grid of 5 Course Cards */}
        {isLoading ? (
          <div className="text-center py-10 font-[family:var(--font-body)] text-gray-500">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <LearnerCourseCard key={course.id} {...course} progress={0} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}