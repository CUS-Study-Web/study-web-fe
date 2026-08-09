import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AssistantCoursePageHeader from '../../components/assistant/course/AssistantCoursePageHeader';
import AssistantExerciseFormPanel, { type AssistantExerciseFormPanelHandle } from '../../components/assistant/course/AssistantExerciseFormPanel';
import { DEMO_COURSES, DEMO_SUBJECT_TOPICS } from '../../types/assistant/mockData';
import { ROUTES } from '../../utils/routes';

export default function AssistantEditExercise() {
  const { courseKey, exerciseId } = useParams<{ courseKey: string; exerciseId: string }>();
  const [searchParams] = useSearchParams();
  const subjectNameParam = searchParams.get('subject');
  const navigate = useNavigate();
  const formRef = useRef<AssistantExerciseFormPanelHandle>(null);
  
  const course = DEMO_COURSES.find((c) => c.key === courseKey);
  const key = courseKey ?? '';

  // Tìm thông tin bài tập (trong mockData) để set initial values
  const allTopics = Object.values(DEMO_SUBJECT_TOPICS).flat();
  const allExercises = allTopics.flatMap((t) => t.exercises);
  const exercise = allExercises.find((e) => e.id === Number(exerciseId));

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleBack = () => {
    if (subjectNameParam) {
      navigate(ROUTES.ASSISTANT.COURSE_SUBJECT_DETAIL(key, subjectNameParam));
    } else {
      navigate(ROUTES.ASSISTANT.COURSE_DETAIL(key));
    }
  };

  const handleSubmit = () => {
    const data = formRef.current?.getData();
    console.log('Update exercise:', { ...data, fileName: file?.name, id: exerciseId });
    handleBack();
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleRemoveFile = () => setFile(null);

  const isPdf = file?.type === 'application/pdf';
  // Mock file name if not chosen
  const displayFileName = file?.name || 'File đã tải lên trước đó.pdf';

  return (
    <div className="flex flex-col h-full w-full">
      <AssistantCoursePageHeader
        breadcrumbs={[
          { label: 'Quản lý khóa học', onClick: () => navigate(ROUTES.ASSISTANT.COURSES) },
          { label: course?.name ?? key, onClick: () => navigate(ROUTES.ASSISTANT.COURSE_DETAIL(key)) },
          ...(subjectNameParam ? [{ label: subjectNameParam, onClick: () => navigate(ROUTES.ASSISTANT.COURSE_SUBJECT_DETAIL(key, subjectNameParam)) }] : []),
          { label: 'Sửa bài tập' },
        ]}
        title="Sửa bài tập"
        subtitle={`Khóa ${course?.name ?? key}`}
      />

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: file drop zone / preview */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <div className="flex flex-col flex-1 min-h-0 rounded-[16px] overflow-hidden border border-[var(--border-default)] bg-[var(--surface-card)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-default)] bg-white shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] font-medium truncate flex-1">
                {displayFileName}
              </span>
              <label className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Đổi file
                <input
                  type="file"
                  accept=".pdf,.docx,.xlsx"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) handleFile(selected);
                  }}
                />
              </label>
              {file && (
                <button
                  onClick={handleRemoveFile}
                  className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-red-200 bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-red-500 cursor-pointer hover:bg-red-50 transition-colors select-none"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  Xóa
                </button>
              )}
            </div>

            {isPdf && fileUrl ? (
              <iframe
                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                className="flex-1 w-full border-none"
                title="PDF Preview"
              />
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const dropped = e.dataTransfer.files[0];
                  if (dropped) handleFile(dropped);
                }}
                className={`flex-1 flex flex-col items-center justify-center gap-3 transition-colors ${
                  dragging ? 'bg-[var(--brand-soft-300)]' : 'bg-[var(--surface-muted)]'
                }`}
              >
                <div className="w-16 h-16 rounded-[12px] bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)]">
                  {file ? 'File đã được chọn' : 'Chưa có bản xem trước'}
                </div>
                <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)]">
                  {file ? 'Không có bản xem trước cho định dạng này' : 'Kéo thả file vào đây để thay đổi'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: form panel */}
        <div className="flex flex-col w-[380px] shrink-0 border-l border-[var(--border-default)] pl-6 min-h-0">
          <AssistantExerciseFormPanel 
            ref={formRef} 
            courseKey={key} 
            mode="edit"
            initialData={{
              subject: subjectNameParam || '',
              title: exercise?.title || '',
              questionCount: exercise?.questions || 20,
              fileType: exercise?.fileType || 'PDF',
              solutionLink: exercise?.solutionLink || '',
            }}
          >
            <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-subtle)] mt-1 shrink-0">
              <div
                onClick={handleBack}
                className="mr-auto px-5 py-2 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none bg-white"
              >
                Hủy
              </div>
              <div
                onClick={handleSubmit}
                className="px-5 py-2 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[13px] text-white cursor-pointer transition-colors select-none shadow-sm"
              >
                Lưu thay đổi
              </div>
            </div>
          </AssistantExerciseFormPanel>
        </div>
      </div>
    </div>
  );
}
