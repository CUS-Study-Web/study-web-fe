import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoursePageHeader from '../../components/assistant/course/CoursePageHeader';
import ExamFormPanel, { type ExamFormPanelHandle } from '../../components/assistant/course/ExamFormPanel';
import { DEMO_COURSES } from '../../types/assistant/mockData';

export default function AssistantUploadExam() {
  const { courseKey } = useParams<{ courseKey: string }>();
  const navigate = useNavigate();
  const formRef = useRef<ExamFormPanelHandle>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const course = DEMO_COURSES.find((c) => c.key === courseKey);
  const key = courseKey ?? '';

  const handleBack = () => navigate(`/assistant/courses/${key}`);

  const handleSubmit = (status: 'draft' | 'published') => {
    const data = formRef.current?.getData();
    console.log('Submit exam:', { ...data, status, fileName });
    handleBack();
  };

  return (
    <div className="flex flex-col h-full w-full">
      <CoursePageHeader
        breadcrumbs={[
          { label: 'Quản lý khóa học', onClick: () => navigate('/assistant/courses') },
          { label: course?.name ?? key, onClick: handleBack },
          { label: 'Upload đề thi' },
        ]}
        title="Upload đề thi"
        subtitle={`Khóa ${course?.name ?? key}`}
      />

      {/* Two-column layout */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: PDF drop zone */}
        <div className="flex-1 min-w-0">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) setFileName(file.name);
            }}
            className={`flex flex-col items-center justify-center gap-4 h-full min-h-[420px] rounded-[16px] border-2 border-dashed transition-all duration-200 ${
              dragging
                ? 'border-[var(--brand-500)] bg-[var(--brand-soft-300)]'
                : 'border-[var(--border-default)] bg-[var(--surface-card)]'
            }`}
          >
            {/* Upload icon */}
            <div className="w-14 h-14 rounded-full bg-[var(--surface-muted)] border border-[var(--border-default)] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            {fileName ? (
              <div className="flex flex-col items-center gap-1">
                <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--brand-600)]">
                  📄 {fileName}
                </div>
                <div
                  onClick={() => setFileName('')}
                  className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] underline"
                >
                  Xóa file
                </div>
              </div>
            ) : (
              <>
                <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--brand-600)]">
                  Kéo thả file PDF đề thi vào đây hoặc tải lên
                </div>
                <label className="px-5 py-2 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none shadow-sm">
                  Chọn File PDF
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                </label>
                <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)] italic text-center max-w-[320px]">
                  (Sau khi upload, khu vực này sẽ hiển thị bản xem trước của đề thi PDF)
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: form panel */}
        <div className="w-[380px] shrink-0 overflow-y-auto">
          <ExamFormPanel ref={formRef} courseKey={key} mode="create" />
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-[var(--border-subtle)]">
        <div
          onClick={handleBack}
          className="px-6 py-2.5 rounded-[8px] border border-[var(--border-default)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
        >
          Hủy
        </div>
        <div
          onClick={() => handleSubmit('draft')}
          className="px-6 py-2.5 rounded-[8px] border border-[var(--brand-500)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--brand-600)] cursor-pointer hover:bg-[var(--brand-soft-300)] transition-colors select-none"
        >
          Tạo nháp
        </div>
        <div
          onClick={() => handleSubmit('published')}
          className="px-6 py-2.5 rounded-[8px] bg-[var(--brand-500)] hover:bg-[var(--brand-600)] font-[family-name:var(--font-heading)] font-semibold text-[14px] text-white cursor-pointer transition-colors select-none shadow-sm"
        >
          Xuất bản
        </div>
      </div>
    </div>
  );
}
