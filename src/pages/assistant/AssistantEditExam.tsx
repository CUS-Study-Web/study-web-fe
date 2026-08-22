import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssistantCoursePageHeader from '../../components/assistant/course/AssistantCoursePageHeader';
import AssistantExamFormPanel, { type AssistantExamFormPanelHandle } from '../../components/assistant/course/AssistantExamFormPanel';
import { ROUTES } from '../../utils/routes';
import { useNotification } from '../../components/common/NotificationProvider';
import { useGetAssessmentDetailQuery, useUpdateAssessmentMutation } from '../../hooks/queries/useAssessments';
import { useGetCoursesQuery } from '../../hooks/queries/useCourses';



export default function AssistantEditExam() {
  const { courseKey, examId } = useParams<{ courseKey: string; examId: string }>();
  const navigate = useNavigate();
  const formRef = useRef<AssistantExamFormPanelHandle>(null);

  const { showSuccess, showError } = useNotification();
  const updateMutation = useUpdateAssessmentMutation();

  const { data: coursesData } = useGetCoursesQuery({ size: 100 });
  const course = coursesData?.data.find((c) => c.id === courseKey);
  const key = courseKey ?? '';

  const { data: detailData, isLoading } = useGetAssessmentDetailQuery(key, examId ?? '');
  const exam = detailData?.data;

  const handleBackWithState = () => navigate(ROUTES.ASSISTANT.COURSE_DETAIL(key), { state: { tab: 'de-thi' } });

  const handleConfirm = () => {
    const data = formRef.current?.getData();
    if (!data) return;

    const formData = new FormData();
    formData.append('assessmentType', 'EXAM');
    formData.append('title', data.title);
    formData.append('numQuestions', data.questions);
    formData.append('durationMin', data.duration);
    formData.append('accessTier', data.accessTier);
    if (data.solutionLink) {
      formData.append('explanationUrl', data.solutionLink);
    }
    formData.append('status', data.status === 'draft' ? 'DRAFT' : 'PUBLISHED');
    const cleanAnswers = data.answers.map(a => ({
      questionNumber: a.questionNumber,
      correctAnswer: a.correctAnswer
    }));
    formData.append('answerKeys', JSON.stringify(cleanAnswers));

    // Note: PDF update not supported directly via this edit page since there's no file input in EditExam currently.

    updateMutation.mutate(
      { courseId: key, assessmentId: examId ?? '', data: formData },
      {
        onSuccess: () => {
          setTimeout(() => {
            showSuccess('Cập nhật đề thi thành công');
            handleBackWithState();
          }, 500);
        },
        onError: (error: any) => {
          console.error("API Error:", error?.response?.data);
          setTimeout(() => {
            const msg = error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật đề thi';
            showError(`Lỗi: ${msg}`);
          }, 500);
        }
      }
    );
  };

  // Build initialData for the form
  const initialData = exam
    ? {
      title: exam.title,
      courseKey: key,
      questions: String(exam.numQuestions),
      duration: String(exam.durationMin ?? 90),
      date: exam.createdAt ? new Date(exam.createdAt).toLocaleDateString('en-GB') : '',
      status: exam.status === 'DRAFT' ? 'draft' : 'published' as any,
      accessTier: exam.accessTier || 'PUBLIC',
      solutionLink: exam.explanationUrl || '',
      answers: exam.answerKeys,
    } as any
    : undefined;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top bar */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <AssistantCoursePageHeader
            breadcrumbs={[
              { label: 'Quản lý khóa học', onClick: () => navigate(ROUTES.ASSISTANT.COURSES) },
              { label: course?.title ?? key, onClick: handleBackWithState },
              { label: exam?.title ?? 'Đề thi' },
            ]}
            title="Chỉnh sửa đề thi"
            subtitle={`Khóa ${course?.title ?? key} · ${exam?.title ?? ''}`}
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          <div
            onClick={() => console.log('Download exam')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải đề thi
          </div>
          <div
            onClick={() => navigate(ROUTES.ASSISTANT.COURSE_UPLOAD_EXAM(key))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-white cursor-pointer transition-colors select-none shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload đề thi mới
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: PDF viewer */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* File tab bar */}
          <div className="flex items-center border-b border-[var(--border-default)] bg-[var(--surface-card)] rounded-t-[12px] px-2 py-1.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[7px] bg-white border border-[var(--border-default)] shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-primary)] font-medium">
                {exam?.title ?? 'Đề thi'}.pdf
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {['←', '→'].map((arrow) => (
                <div
                  key={arrow}
                  className="w-7 h-7 rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] font-bold transition-colors select-none"
                >
                  {arrow}
                </div>
              ))}
            </div>
          </div>

          {/* PDF content area */}
          {exam?.fileUrl ? (
            <iframe
              src={`${exam.fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="flex-1 w-full border-none rounded-b-[12px] bg-[var(--surface-muted)]"
              title="PDF Preview"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[var(--surface-muted)] rounded-b-[12px] text-[var(--text-secondary)] font-[family-name:var(--font-body)] font-medium text-[13px]">
              Không có file đính kèm
            </div>
          )}
        </div>

        {/* Right: form panel */}
        <div className="w-[380px] shrink-0 flex flex-col min-h-0">
          {isLoading ? (
            <div className="p-10 text-center text-[var(--text-secondary)] font-[family-name:var(--font-body)] text-[14px]">
              Đang tải thông tin đề thi...
            </div>
          ) : exam ? (
          <AssistantExamFormPanel ref={formRef} courseKey={key} courseName={course?.title} mode="edit" initialData={initialData}>
            <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-subtle)] mt-1 shrink-0">
              <div
                onClick={handleBackWithState}
                className="mr-auto px-5 py-2 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none bg-white"
              >
                Hủy
              </div>
              <div
                onClick={handleConfirm}
                className={`px-5 py-2 rounded-[8px] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-white transition-colors select-none shadow-sm ${
                  updateMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[var(--brand-500)] hover:bg-[var(--brand-600)] cursor-pointer'
                }`}
              >
                {updateMutation.isPending ? 'Đang lưu...' : 'Xác nhận chỉnh sửa'}
              </div>
            </div>
          </AssistantExamFormPanel>
          ) : null}
        </div>
      </div>
    </div>
  );
}
