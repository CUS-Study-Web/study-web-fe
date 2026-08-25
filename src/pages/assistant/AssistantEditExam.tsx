import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssistantCoursePageHeader from '../../components/assistant/course/AssistantCoursePageHeader';
import AssistantExamFormPanel, { type AssistantExamFormPanelHandle } from '../../components/assistant/course/AssistantExamFormPanel';
import { ROUTES } from '../../utils/routes';
import { useNotification } from '../../components/common/NotificationProvider';
import { useGetAssessmentDetailQuery, useUpdateAssessmentMutation } from '../../hooks/queries/useAssessments';
import { useGetCoursesQuery } from '../../hooks/queries/useCourses';
import { validateDocumentFile, downloadFileFromUrl } from '../../utils/fileUtils';
import * as mammoth from 'mammoth';

export default function AssistantEditExam() {
  const { courseKey, examId } = useParams<{ courseKey: string; examId: string }>();
  const navigate = useNavigate();
  const formRef = useRef<AssistantExamFormPanelHandle>(null);
  
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [docxHtml, setDocxHtml] = useState<string | null>(null);
  const [docxZoom, setDocxZoom] = useState<number>(100);

  const { showSuccess, showError } = useNotification();
  const updateMutation = useUpdateAssessmentMutation();

  const { data: coursesData } = useGetCoursesQuery({ size: 100 });
  const course = coursesData?.data.find((c) => c.id === courseKey);
  const key = courseKey ?? '';

  const { data: detailData, isLoading } = useGetAssessmentDetailQuery(key, examId ?? '');
  const exam = detailData?.data;

  useEffect(() => {
    if (!file) {
      setFileUrl(null);
      if (exam?.fileUrl && exam?.fileType?.toUpperCase() === 'DOCX') {
        fetch(exam.fileUrl)
          .then(res => res.arrayBuffer())
          .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer }))
          .then(result => setDocxHtml(result.value))
          .catch(err => console.error("Mammoth error:", err));
      } else {
        setDocxHtml(null);
      }
      return;
    }

    if (file.name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          mammoth.convertToHtml({ arrayBuffer })
            .then((result) => setDocxHtml(result.value))
            .catch((err) => console.error("Mammoth error:", err));
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setDocxHtml(null);
    }

    const url = URL.createObjectURL(file);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, exam?.fileUrl, exam?.fileType]);

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

    if (file) {
      formData.append('file', file);
      
      const ext = file.name.split('.').pop()?.toUpperCase() || '';
      let fileType = 'PDF';
      if (['DOCX', 'DOC'].includes(ext)) fileType = 'DOCX';
      else if (['XLSX', 'XLS', 'CSV'].includes(ext)) fileType = 'XLSX';
      formData.append('fileType', fileType);
    }

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
            showError(msg);
          }, 500);
        }
      }
    );
  };

  const handleFile = (selectedFile: File) => {
    try {
      const ext = selectedFile.name.split('.').pop()?.toUpperCase() || '';
      if (!['PDF', 'DOCX'].includes(ext)) {
        showError('Chỉ hỗ trợ file định dạng PDF và DOCX');
        return;
      }
      validateDocumentFile(selectedFile);
      setFile(selectedFile);
    } catch (err: any) {
      showError(err.message);
    }
  };

  const handleRemoveFile = () => setFile(null);

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

  const previewUrl = fileUrl || exam?.fileUrl;
  const isPdf = file ? file.type === 'application/pdf' || file.name.endsWith('.pdf') : exam?.fileType?.toUpperCase() === 'PDF';
  const isDocx = file ? file.name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : exam?.fileType?.toUpperCase() === 'DOCX';
  const displayFileName = file?.name || (exam?.fileUrl ? exam.fileUrl.split('/').pop()?.split('?')[0] : 'File đã tải lên trước đó.pdf');

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
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: file drop zone / preview */}
        <div className="flex-1 min-w-0 relative">
          <div className="absolute inset-0 flex flex-col">
            {file || exam?.fileUrl ? (
              <div className="flex flex-col flex-1 min-h-0 rounded-[16px] overflow-hidden border border-[var(--border-default)] bg-[var(--surface-card)]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-default)] bg-white shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-primary)] font-medium truncate flex-1">
                    {displayFileName}
                  </span>
                  <div
                    onClick={() => {
                      if (previewUrl) {
                        showSuccess('Đang tải về...');
                        downloadFileFromUrl(previewUrl, displayFileName || 'tai_lieu');
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--brand-600)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Tải về
                  </div>
                  <label className="flex items-center gap-1 px-3 py-1 rounded-[6px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[11px] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Đổi file
                    <input
                      type="file"
                      accept=".pdf,.docx"
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

                {isPdf && previewUrl ? (
                  <iframe
                    src={`${previewUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                    className="flex-1 w-full border-none"
                    title="PDF Preview"
                  />
                ) : isDocx && (docxHtml || !file) ? (
                  <div className="flex-1 w-full flex flex-col min-h-0 bg-[#f3f4f6]">
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border-default)] bg-white shrink-0">
                      <div className="text-[12px] font-semibold text-[var(--text-secondary)] mr-auto">
                        Xem trước DOCX
                      </div>
                      <button
                        onClick={() => setDocxZoom(z => Math.max(50, z - 10))}
                        className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                        title="Thu nhỏ"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <span className="text-[12px] font-medium text-gray-600 w-10 text-center">
                        {docxZoom}%
                      </span>
                      <button
                        onClick={() => setDocxZoom(z => Math.min(200, z + 10))}
                        className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
                        title="Phóng to"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                    </div>
                    {/* Scrollable Document Area */}
                    <div className="flex-1 min-h-0 overflow-auto p-4 md:p-8 flex justify-center items-start bg-[#f3f4f6]">
                      <div
                        className="bg-white shadow-sm border border-gray-200 document-preview"
                        style={{
                          width: '800px',
                          minHeight: '1131px',
                          padding: '40px',
                          zoom: `${docxZoom}%`
                        } as React.CSSProperties}
                      >
                        {docxHtml ? (
                          <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
                        ) : (
                          <div className="text-center text-gray-500 mt-20">Đang tải bản xem trước... (với file cũ, vui lòng tải file mới để xem trước HTML)</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-[var(--surface-muted)]">
                    <div className="w-16 h-16 rounded-[12px] bg-white border border-[var(--border-default)] flex items-center justify-center shadow-sm">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--text-primary)]">
                      File đã được chọn
                    </div>
                    <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)]">
                      Không có bản xem trước cho định dạng này
                    </div>
                  </div>
                )}
              </div>
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
                className={`flex flex-col items-center justify-center gap-4 flex-1 min-h-[420px] rounded-[16px] border-2 border-dashed transition-all duration-200 ${dragging
                  ? 'border-[var(--brand-500)] bg-[var(--brand-soft-300)]'
                  : 'border-[var(--border-default)] bg-[var(--surface-card)]'
                  }`}
              >
                <div className="w-14 h-14 rounded-full bg-[var(--surface-muted)] border border-[var(--border-default)] flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>

                <div className="font-[family-name:var(--font-heading)] font-semibold text-[14px] text-[var(--brand-600)]">
                  Kéo thả file đề thi vào đây hoặc tải lên
                </div>

                <label className="px-5 py-2 rounded-[8px] border border-[var(--border-default)] bg-white font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors select-none shadow-sm">
                  Chọn File
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) handleFile(selected);
                    }}
                  />
                </label>

                <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-tertiary)] italic text-center max-w-[320px]">
                  Hỗ trợ file PDF, DOCX (Tối đa 50MB)
                </div>
              </div>
            )}
          </div>
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
