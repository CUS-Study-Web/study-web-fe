import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CourseExam } from '../../types/assistant/models';
import AssistantCoursePageHeader from '../../components/assistant/course/AssistantCoursePageHeader';
import AssistantTabBar from '../../components/assistant/course/AssistantTabBar';
import AssistantSubjectCard from '../../components/assistant/course/AssistantSubjectCard';
import AssistantExamCard from '../../components/assistant/course/AssistantExamCard';
import AssistantCreateLecturePopup from '../../components/assistant/course/AssistantCreateLecturePopup';
import {
  DEMO_COURSES,
  DEMO_COURSE_SUBJECTS,
  DEMO_COURSE_EXAMS,
} from '../../types/assistant/mockData';
import { ROUTES } from '../../utils/routes';

const TABS = [
  { key: 'mon-hoc', label: 'Môn học' },
  { key: 'de-thi', label: 'Đề thi' },
];

type ModalType = 'lecture' | 'exercise' | null;

export default function AssistantCourseDetail() {
  const { courseKey } = useParams<{ courseKey: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mon-hoc');
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const course = DEMO_COURSES.find((c) => c.key === courseKey);
  const subjects = DEMO_COURSE_SUBJECTS[courseKey ?? ''] ?? [];
  const exams = DEMO_COURSE_EXAMS[courseKey ?? ''] ?? [];
  const key = courseKey ?? '';

  if (!course) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
          Không tìm thấy khóa học.
        </div>
      </div>
    );
  }

  const handleEditExam = (exam: CourseExam) => {
    navigate(ROUTES.ASSISTANT.COURSE_EDIT_EXAM(key, String(exam.id)));
  };

  const ACTION_BUTTONS: { label: string; action: () => void }[] = [
    { label: 'Tạo bài giảng', action: () => setOpenModal('lecture') },
    { label: 'Tạo bài tập', action: () => navigate(ROUTES.ASSISTANT.COURSE_CREATE_EXERCISE(key)) },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Modals */}
      {openModal === 'lecture' && (
        <AssistantCreateLecturePopup courseKey={key} onClose={() => setOpenModal(null)} />
      )}

      <AssistantCoursePageHeader
        breadcrumbs={[
          { label: 'Quản lý khóa học', onClick: () => navigate(ROUTES.ASSISTANT.COURSES) },
          { label: course.name },
        ]}
        title="Chi tiết khóa học"
        subtitle={`Khóa ${course.name} · ${subjects.length} môn học`}
        rightSlot={
          <div className="px-4 py-2 rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] shadow-sm">
            {course.tag}
          </div>
        }
      />

      <AssistantTabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Môn học tab */}
      {activeTab === 'mon-hoc' && (
        <div className="mt-5 flex flex-col gap-5">
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {ACTION_BUTTONS.map(({ label, action }) => (
              <div
                key={label}
                onClick={action}
                className="px-4 py-2 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-white cursor-pointer active:scale-95 transition-all duration-150 select-none shadow-sm"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Subject grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {subjects.map((subjectName) => {
              return (
                <AssistantSubjectCard
                  key={subjectName}
                  name={subjectName}
                  lectures={0}
                  exercises={0}
                  onViewDetail={(name) =>
                   navigate(ROUTES.ASSISTANT.COURSE_SUBJECT_DETAIL(key, encodeURIComponent(name)))
                  }
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Đề thi tab */}
      {activeTab === 'de-thi' && (
        <div className="mt-5 flex flex-col gap-4">
          {/* Upload button */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate(ROUTES.ASSISTANT.COURSE_UPLOAD_EXAM(key))}
              className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-white cursor-pointer active:scale-95 transition-all duration-150 select-none shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload đề thi
            </div>
          </div>

          {/* Exam list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {exams.length === 0 ? (
              <div className="py-12 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
                Chưa có đề thi nào.
              </div>
            ) : (
              exams.map((exam) => (
                <AssistantExamCard key={exam.id} exam={exam} onEdit={handleEditExam} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
