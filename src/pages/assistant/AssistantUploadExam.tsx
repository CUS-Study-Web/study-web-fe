import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssistantCoursePageHeader from '../../components/assistant/course/AssistantCoursePageHeader';
import AssistantExamFormPanel, { type AssistantExamFormPanelHandle } from '../../components/assistant/course/AssistantExamFormPanel';
import { DEMO_COURSES } from '../../types/assistant/mockData';
import { ROUTES } from '../../utils/routes';

export default function AssistantUploadExam() {
  const { courseKey } = useParams<{ courseKey: string }>();
  const navigate = useNavigate();
  const formRef = useRef<AssistantExamFormPanelHandle>(null);
  const [dragging, setDragging] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const course = DEMO_COURSES.find((c) => c.key === courseKey);
  const key = courseKey ?? '';

  // Tạo / thu hồi object URL khi file thay đổi
  useEffect(() => {
    if (!pdfFile) {
      setPdfUrl(null);
      return;
    }
    const url = URL.createObjectURL(pdfFile);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pdfFile]);

  const handleBack = () => navigate(ROUTES.ASSISTANT.COURSE_DETAIL(key));

  const handleSubmit = () => {
    const data = formRef.current?.getData();
    console.log('Submit exam:', { ...data, fileName: pdfFile?.name });
    handleBack();
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') setPdfFile(file);
  };

  const handleRemoveFile = () => setPdfFile(null);

  return (
    <div className="flex flex-col h-full w-full">
      <AssistantCoursePageHeader
        breadcrumbs={[
          { label: 'Quản lý khóa học', onClick: () => navigate(ROUTES.ASSISTANT.COURSES) },
          { label: course?.name ?? key, onClick: handleBack },
          { label: 'Upload đề thi' },
        ]}
        title="Upload đề thi"
        subtitle={`Khóa ${course?.name ?? key}`}
      />

      {/* Two-column layout */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: PDF drop zone / preview */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          {pdfUrl ? (
            /* ── PDF Preview ── */
            <div className="flex flex-col flex-1 min-h-0 rounded-[16px] overflow-hidden border border-[var(--border-default)] bg-[var(--surface-card)]">
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-default)] bg-white shrink-0">
                {/* PDF icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] font-medium truncate flex-1">
                  {pdfFile?.name}
                </span>
                {/* Đổi file */}
                <label className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Đổi file
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                    }}
                  />
                </label>
                {/* Xóa */}
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
              </div>

              {/* iframe PDF viewer */}
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="flex-1 w-full border-none"
                title="PDF Preview"
              />
            </div>
          ) : (
            /* ── Drop Zone ── */
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
              className={`flex flex-col items-center justify-center gap-4 flex-1 min-h-[420px] rounded-[16px] border-2 border-dashed transition-all duration-200 ${
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
                    if (file) handleFile(file);
                  }}
                />
              </label>

              <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)] italic text-center max-w-[320px]">
                Hỗ trợ file .pdf · Sau khi chọn, bạn có thể xem trước nội dung đề thi ngay tại đây
              </div>
            </div>
          )}
        </div>

        {/* Right: form panel */}
        <div className="flex flex-col w-[380px] shrink-0 border-l border-[var(--border-default)] pl-6 min-h-0">
          <AssistantExamFormPanel ref={formRef} courseKey={key} mode="create">
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
                Tạo đề thi
              </div>
            </div>
          </AssistantExamFormPanel>
        </div>
      </div>
    </div>
  );
}
