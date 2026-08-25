import { useState, useEffect } from 'react';
import AssistantFeatureInDevPopup from '../AssistantFeatureInDevPopup';
import { useGetAssessmentDetailQuery } from '../../../hooks/queries/useAssessments';
import { getDisplayFileType } from '../../../utils/fileUtils';
import * as mammoth from 'mammoth';

interface AssistantViewExercisePopupProps {
  courseId: string;
  course: string;
  subject: string;
  exercise: any; // Type as needed
  onClose: () => void;
}

export default function AssistantViewExercisePopup({ courseId, course, subject, exercise, onClose }: AssistantViewExercisePopupProps) {
  const [showDevPopup, setShowDevPopup] = useState(false);
  const { data: detailData, isLoading } = useGetAssessmentDetailQuery(courseId, exercise.id);
  const fileUrl = detailData?.data?.fileUrl;
  const displayFileType = getDisplayFileType(exercise?.fileType, fileUrl);
  const isDocx = displayFileType.toLowerCase() === 'docx';
  const isPdf = displayFileType.toLowerCase() === 'pdf';
  
  const [docxHtml, setDocxHtml] = useState<string | null>(null);
  const [isConvertingDocx, setIsConvertingDocx] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isDocx && fileUrl) {
      setIsConvertingDocx(true);
      fetch(fileUrl)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer }))
        .then(result => {
          setDocxHtml(result.value);
          setIsConvertingDocx(false);
        })
        .catch(err => {
          console.error("Mammoth error:", err);
          setIsConvertingDocx(false);
        });
    }
  }, [isDocx, fileUrl]);

  const labelClass = 'font-[family-name:var(--font-heading)] font-bold text-[12px] text-[var(--text-secondary)] uppercase tracking-[0.4px]';
  const valueClass = 'font-[family-name:var(--font-body)] font-semibold text-[13px] text-[var(--text-primary)] mt-1';

  const handleDownload = async () => {
    if (!fileUrl) {
      setShowDevPopup(true);
      return;
    }
    try {
      setIsDownloading(true);
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exercise?.title ? `${exercise.title}.${displayFileType.toLowerCase()}` : `tai_lieu.${displayFileType.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      window.open(fileUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] p-7 w-full max-w-[660px] max-h-[92vh] flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4.5">
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[17px] text-[var(--text-primary)]">
            Xem bài tập
          </div>
          <div
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] bg-transparent border-none cursor-pointer text-xl transition-colors"
          >
            ×
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 mb-4.5">
          <div>
            <div className={labelClass}>Tên tài liệu</div>
            <div className={valueClass}>{exercise?.title ?? "—"}</div>
          </div>
          <div>
            <div className={labelClass}>Loại file</div>
            <div className={valueClass}>{displayFileType}</div>
          </div>
          <div>
            <div className={labelClass}>Khóa học</div>
            <div className={valueClass}>{course}</div>
          </div>
          <div>
            <div className={labelClass}>Môn học</div>
            <div className={valueClass}>{subject}</div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-[#F4F7F4] rounded-xl flex flex-col items-center justify-center min-h-[60vh] border-[1.5px] border-[#E4EBE5] overflow-hidden">
          {isLoading || isConvertingDocx ? (
            <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">Đang tải tài liệu...</div>
          ) : fileUrl ? (
            isPdf ? (
              <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`} className="w-full h-full min-h-[60vh] border-none" title="Preview" />
            ) : isDocx && docxHtml ? (
              <div className="w-full h-full min-h-[60vh] overflow-auto p-4 bg-[#f3f4f6] flex justify-center items-start">
                 <div
                   className="bg-white shadow-sm border border-gray-200"
                   style={{ width: '800px', minHeight: '1131px', padding: '40px', zoom: '70%' }}
                 >
                   <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
                 </div>
              </div>
            ) : (
               <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)] flex flex-col items-center gap-2">
                 <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                   <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#A0AAA2" strokeWidth="1.5" />
                   <polyline points="14 2 14 8 20 8" stroke="#A0AAA2" strokeWidth="1.5" />
                 </svg>
                 Không có bản xem trước. Hãy tải về để xem chi tiết.
               </div>
            )
          ) : (
            <>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#A0AAA2" strokeWidth="1.5" />
                <polyline points="14 2 14 8 20 8" stroke="#A0AAA2" strokeWidth="1.5" />
                <line x1="16" y1="13" x2="8" y2="13" stroke="#A0AAA2" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="16" y1="17" x2="8" y2="17" stroke="#A0AAA2" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="font-[family-name:var(--font-body)] text-[13px] text-[var(--text-secondary)]">
                Không thể xem trước tài liệu này
              </div>
              <div className="font-[family-name:var(--font-heading)] font-semibold text-[13px] text-[var(--text-primary)]">
                {exercise?.title ?? "Bài tập"}.{displayFileType.toLowerCase()}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-5">
          <div onClick={onClose} className="flex-1 flex justify-center items-center p-3 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors">
            Đóng
          </div>
          <div
            onClick={!isDownloading ? handleDownload : undefined}
            className={`flex-[2] flex justify-center items-center p-3 rounded-[var(--radius-md)] border-none font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] select-none transition-colors ${
              isDownloading 
                ? 'bg-[var(--surface-muted)] text-[var(--text-tertiary)] cursor-not-allowed' 
                : 'bg-[var(--brand-500)] text-[var(--text-inverse)] hover:bg-[var(--brand-600)] cursor-pointer'
            }`}
          >
            {isDownloading ? 'Đang tải...' : 'Tải về'}
          </div>
        </div>
      </div>

      {showDevPopup && (
        <AssistantFeatureInDevPopup onClose={() => setShowDevPopup(false)} />
      )}
    </div>
  );
}
