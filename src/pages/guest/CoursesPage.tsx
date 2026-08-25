import GuestPageLayout from "../../components/guest/GuestPageLayout";
import CourseCard from "../../components/guest/CourseCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useAuth } from "../../contexts/AuthContext";

import { useGetCoursesQuery } from "../../hooks/queries/useCourses";

const COURSE_COLORS = [
  "bg-[#28522d] hover:bg-[#1e4022]", // Dark green
  "bg-[#1d3d54] hover:bg-[#152e3f]", // Dark blue
  "bg-[#6e5005] hover:bg-[#523c04]", // Dark yellow/brown
  "bg-[#7e3b7b] hover:bg-[#612c5f]", // Dark purple
  "bg-[#7a2025] hover:bg-[#5a161b]", // Dark red
];

export default function CoursesPage() {
  const { isLoggedIn } = useAuth();
  const { data: coursesData, isLoading } = useGetCoursesQuery({ size: 100 });
  const courses = coursesData?.data || [];

  const myCoursesBtn = isLoggedIn ? (
    <Link
      to={ROUTES.LEARNER.MY_COURSES}
      className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-white/15 hover:bg-white/25 border border-white/40 rounded-full !text-white text-sm font-bold backdrop-blur-md transition-all shadow-sm active:scale-95"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path 
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Khóa học của tôi
    </Link>
  ) : undefined;

  return (
    <GuestPageLayout
      eyebrow="CHƯƠNG TRÌNH LUYỆN THI"
      title="Khóa học tại CUS"
      description={`${courses.length} chương trình luyện thi được thiết kế chuyên biệt cho từng kỳ thi — lộ trình bài bản, lớp học tinh gọn và đội ngũ giảng viên tận tâm.`}
      heroExtra={myCoursesBtn}
    >
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-12 md:mt-16">
        {isLoading ? (
          <div className="text-center py-12 !text-[var(--text-secondary-500)] [font-family:var(--font-body)]">Đang tải danh sách khóa học...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const color = COURSE_COLORS[index % COURSE_COLORS.length];
              return (
                <CourseCard 
                  key={course.id} 
                  id={course.id}
                  title={course.title}
                  tag={course.badgeTitle || "Luyện thi"}
                  subtitle={course.subTitle}
                  desc={course.description}
                  img={course.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60&auto=format&fit=crop"}
                  btnColor={color}
                />
              );
            })}
          </div>
        )}
      </section>
    </GuestPageLayout>
  );
}
