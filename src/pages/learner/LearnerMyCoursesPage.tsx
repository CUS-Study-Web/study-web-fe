import { useQueries } from "@tanstack/react-query";
import LearnerCourseCard from "../../components/learner/LearnerCourseCard";
import GuestPageLayout from "../../components/guest/GuestPageLayout";
import { useGetCoursesQuery, courseKeys } from "../../hooks/queries/useCourses";
import { courseService } from "../../services/courseService";

export default function LearnerMyCoursesPage() {
  const { data, isLoading } = useGetCoursesQuery({ size: 100 });
  const courses = data?.data || [];

  // Fetch course details in parallel to get learningProgress for each course
  const detailQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: courseKeys.detail(course.id),
      queryFn: () => courseService.getCourseDetail(course.id),
      enabled: !!course.id,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    })),
  });

  const isLoadingDetails = detailQueries.some((q) => q.isLoading);

  return (
    <GuestPageLayout
      className="bg-[var(--surface-500)] min-h-screen"
      eyebrow="HỌC VIÊN"
      title="Khóa học của tôi"
      description="Các khoá luyện thi bạn đang theo học tại CUS."
    >
      {/* ── Main Content Grid ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-12 md:mt-16">
        <div className="mb-10 md:mb-12">
          <div className="text-[32px] font-black text-[var(--brand-base-700)] leading-tight mb-2 font-[family:var(--font-heading)]">
            {courses.length} khóa học
          </div>
        </div>

        {/* Grid of Course Cards */}
        {isLoading ? (
          <div className="text-center py-10 font-[family:var(--font-body)] text-gray-500">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const detail = detailQueries[index]?.data?.data;
              // Use learningProgress from detail (GET /api/courses/{id}) since the list API doesn't return it
              const progress = isLoadingDetails ? 0 : (detail?.learningProgress ?? 0);
              return (
                <LearnerCourseCard key={course.id} {...course} progress={progress} />
              );
            })}
          </div>
        )}
      </section>
    </GuestPageLayout>
  );
}