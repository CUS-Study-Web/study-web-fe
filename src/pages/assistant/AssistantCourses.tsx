import { useNavigate } from 'react-router-dom';
import AssistantCourseCard from '../../components/assistant/course/AssistantCourseCard';
import { DEMO_COURSES } from '../../types/mockData';
import { ROUTES } from '../../utils/routes';

export default function AssistantCourses() {
  const navigate = useNavigate();

  const handleViewDetail = (key: string) => {
    navigate(ROUTES.ASSISTANT.COURSE_DETAIL(key));
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Page header */}
      <div className="mb-6">
        <div className="font-[family-name:var(--font-heading)] font-bold text-[22px] text-[var(--text-primary)] mb-1">
          Quản lý khóa học
        </div>
        <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
          Chọn khóa học để xem và quản lý nội dung
        </div>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {DEMO_COURSES.map((course) => (
          <AssistantCourseCard
            key={course.key}
            course={course}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
    </div>
  );
}
