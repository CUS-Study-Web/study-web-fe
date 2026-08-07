import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoursePageHeader from '../../components/assistant/course/CoursePageHeader';
import ExamFormPanel, { type ExamFormPanelHandle } from '../../components/assistant/course/ExamFormPanel';
import { DEMO_COURSES, DEMO_COURSE_EXAMS } from '../../types/assistant/mockData';

// Simulated exam question lines for the PDF preview
const PREVIEW_QUESTIONS = [
  'Câu 1: Trong các mệnh đề sau, mệnh đề nào đúng?',
  'Câu 2: Tính giới hạn của dãy số sau đây:',
  'Câu 3: Tìm tập nghiệm của bất phương trình:',
  'Câu 4: Cho hàm số f(x) = 2x² – 3x + 1. Đạo hàm f\'(x) là:',
  'Câu 5: Số phần/x = 2 + 1⁄6 có mẫu thức bằng:',
  'Câu 6: Tính tổng S = 1 + 2 + 3 + ... + 100:',
  'Câu 7: Cho cấp số nhân có công bội q = 2, số hạng đầu u = 3:',
  'Câu 8: Tính tích phân không định đúng theo công thức:',
];

const MOCK_OPTIONS = [
  { label: 'A. Đáp án mẫu 1', col: 'left' },
  { label: 'B. Phương án B', col: 'right' },
  { label: 'C. Lựa chọn 3', col: 'left' },
  { label: 'D. Tùy chọn 4', col: 'right' },
];

export default function AssistantEditExam() {
  const { courseKey, examId } = useParams<{ courseKey: string; examId: string }>();
  const navigate = useNavigate();
  const formRef = useRef<ExamFormPanelHandle>(null);

  const course = DEMO_COURSES.find((c) => c.key === courseKey);
  const exams = DEMO_COURSE_EXAMS[courseKey ?? ''] ?? [];
  const exam = exams.find((e) => String(e.id) === examId);

  const key = courseKey ?? '';

  const handleBackWithState = () => navigate(`/assistant/courses/${key}`);

  const handleConfirm = () => {
    const data = formRef.current?.getData();
    console.log('Update exam:', data);
    handleBackWithState();
  };

  // Build initialData for the form
  const initialData = exam
    ? {
        title: exam.title,
        courseKey: exam.courseKey,
        questions: String(exam.questions),
        duration: exam.duration.replace(' phút', ''),
        date: exam.date,
        status: exam.status,
      }
    : undefined;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top bar */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <CoursePageHeader
            breadcrumbs={[
              { label: 'Quản lý khóa học', onClick: () => navigate('/assistant/courses') },
              { label: course?.name ?? key, onClick: handleBackWithState },
              { label: exam?.title ?? 'Đề thi' },
            ]}
            title="Chỉnh sửa đề thi"
            subtitle={`Khóa ${course?.name ?? key} · ${exam?.title ?? ''}`}
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
            onClick={() => navigate(`/assistant/courses/${key}/upload-exam`)}
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
          <div className="flex-1 overflow-y-auto bg-[var(--surface-muted)] rounded-b-[12px] p-6">
            <div className="bg-white rounded-[8px] shadow-md p-8 max-w-[600px] mx-auto">
              {/* Exam header */}
              <div className="text-center mb-6 border-b border-gray-200 pb-4">
                <div className="font-bold text-[13px] text-gray-800 uppercase tracking-wide mb-1">
                  TRUNG TÂM CUS – ĐỀ THI THỬ
                </div>
                <div className="font-semibold text-[14px] text-gray-800 mb-1">
                  {exam?.title ?? 'Đề thi thử'}
                </div>
                <div className="text-[12px] text-gray-500">
                  Thời gian: {exam?.duration ?? '75 phút'} · {exam?.questions ?? 45} câu · Ngày: {exam?.date ?? ''}
                </div>
              </div>

              {/* Questions */}
              <div className="flex flex-col gap-5">
                {PREVIEW_QUESTIONS.map((q, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-[13px] text-gray-800 mb-2">{q}</div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {MOCK_OPTIONS.map((opt) => (
                        <div key={opt.label} className="text-[12px] text-gray-600">{opt.label}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: form panel */}
        <div className="w-[380px] shrink-0 overflow-y-auto pr-2 pb-4">
          <ExamFormPanel ref={formRef} courseKey={key} mode="edit" initialData={initialData}>
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)] mt-2">
              <div
                onClick={handleBackWithState}
                className="mr-auto px-6 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none bg-white"
              >
                Hủy
              </div>
              <div
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-white cursor-pointer transition-colors select-none shadow-sm"
              >
                Xác nhận chỉnh sửa
              </div>
            </div>
          </ExamFormPanel>
        </div>
      </div>
    </div>
  );
}
