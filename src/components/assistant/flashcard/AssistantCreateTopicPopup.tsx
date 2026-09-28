import { useState, useRef } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';
import { useNotification } from '../../common/NotificationProvider';
import { parseFlashcardsFromExcel, type ParsedFlashcard } from '../../../utils/excelUtils';

interface AssistantCreateTopicPopupProps {
  onClose: () => void;
  onCreate: (name: string, fileName: string, status: 'PUBLISH' | 'DRAFT', parsedWords: ParsedFlashcard[]) => void;
  isUploading?: boolean;
}

export function AssistantCreateTopicPopup({ onClose, onCreate, isUploading }: AssistantCreateTopicPopupProps) {
  const [topicName, setTopicName] = useState('');
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState<'PUBLISH' | 'DRAFT'>('DRAFT');
  const [isDragOver, setIsDragOver] = useState(false);
  const [parsedWords, setParsedWords] = useState<ParsedFlashcard[]>([]);
  
  const { showError } = useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Drag & Drop handlers ───────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => setIsDragOver(false);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
    // reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  const processFile = async (file: File) => {
    setFileName(file.name);
    try {
      const words = await parseFlashcardsFromExcel(file);
      if (words.length === 0) {
        showError("File không có dữ liệu hoặc không đúng định dạng!");
      } else {
        setParsedWords(words);
      }
    } catch (error: any) {
      showError(error.message || "Không thể đọc file Excel. Vui lòng kiểm tra định dạng.");
    }
  };

  const handleCreate = () => {
    if (!topicName.trim()) {
      showError("Vui lòng nhập tên chủ đề.");
      return;
    }
    if (parsedWords.length === 0) {
      showError("Vui lòng tải lên file Excel có dữ liệu từ vựng hợp lệ.");
      return;
    }
    onCreate(topicName.trim(), fileName, status, parsedWords);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      {/* Dialog */}
      <div
        className="bg-white rounded-[22px] w-full max-w-[480px] flex flex-col overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-7 py-[22px]"
          style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' }}
        >
          <div className="font-[family-name:var(--font-heading)] font-extrabold text-[18px] text-white">
            Tạo chủ đề mới
          </div>
          <div
            className="font-[family-name:var(--font-body)] text-[13px] mt-1"
            style={{ color: 'rgba(220,233,222,0.7)' }}
          >
            Đặt tên và tải lên file từ vựng
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-[22px] flex flex-col gap-[18px]">
          {/* Topic name */}
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-secondary)] mb-1.5">
              Tên chủ đề
            </div>
            <input
              type="text"
              value={topicName}
              onChange={e => setTopicName(e.target.value)}
              placeholder="VD: Từ vựng học thuật cốt lõi"
              disabled={isUploading}
              className="w-full px-3.5 py-[11px] rounded-[11px] border border-[var(--border-strong)] outline-none font-[family-name:var(--font-body)] text-[14px] text-[var(--text-primary)] focus:border-[var(--brand-500)] focus:bg-[var(--brand-soft-100)] transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              style={{ boxSizing: 'border-box' }}
            />
          </div>

          {/* Status field */}
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-secondary)] mb-1.5">
              Trạng thái
            </div>
            <div className="flex w-[200px] rounded-[8px] overflow-hidden border border-[var(--border-default)]">
              <div
                onClick={() => !isUploading && setStatus('PUBLISH')}
                className={`flex-1 py-1.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] transition-colors select-none ${status === 'PUBLISH'
                  ? 'bg-[var(--brand-500)] text-white'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                  } ${isUploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              >
                Xuất bản
              </div>
              <div
                onClick={() => !isUploading && setStatus('DRAFT')}
                className={`flex-1 py-1.5 text-center font-[family-name:var(--font-heading)] font-semibold text-[13px] transition-colors select-none border-l border-[var(--border-default)] ${status === 'DRAFT'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                  } ${isUploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              >
                Nháp
              </div>
            </div>
          </div>

          {/* File upload */}
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-[12px] text-[var(--text-secondary)] mb-1.5">
              Tải lên file Excel
            </div>

            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />

            {/* Dropzone */}
            <div
              className={`rounded-[14px] px-5 py-7 text-center transition-all duration-[180ms] ${isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              style={{
                border: isDragOver ? '2px dashed var(--brand-500)' : '2px dashed var(--border-strong)',
                background: isDragOver ? 'var(--brand-soft-200)' : '#FAFCFA',
              }}
              onDragOver={isUploading ? undefined : handleDragOver}
              onDragLeave={isUploading ? undefined : handleDragLeave}
              onDrop={isUploading ? undefined : handleDrop}
              onClick={isUploading ? undefined : handleDropzoneClick}
            >
              {/* Upload icon */}
              <Upload
                className={`w-9 h-9 block mx-auto mb-2.5 transition-colors ${
                  isDragOver ? 'text-[var(--brand-500)]' : 'text-[var(--neutral-400)]'
                }`}
              />

              {fileName ? (
                <div>
                  <div className="font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--brand-500)] mb-1">
                    {fileName}
                  </div>
                  <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--text-secondary)]">
                    Đã đọc được {parsedWords.length} từ vựng
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-[family-name:var(--font-heading)] font-bold text-[14px] text-[var(--text-secondary)] mb-1">
                    Kéo thả file hoặc nhấn để chọn
                  </div>
                  <div className="font-[family-name:var(--font-body)] text-[12px] text-[var(--neutral-400)]">
                    Hỗ trợ .xlsx, .xls, .csv
                  </div>
                </>
              )}
            </div>

            {/* Warning note */}
            <div
              className="mt-3 rounded-[10px] px-3.5 py-2.5 flex items-start gap-2"
              style={{
                background: 'var(--warning-50)',
                border: '1px solid var(--warning-100)',
              }}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div
                className="font-[family-name:var(--font-body)] text-[12px] leading-[1.55]"
                style={{ color: 'var(--warning-800)' }}
              >
                <span className="font-bold">Lưu ý:</span> File Excel upload phải bao gồm các cột theo đúng thứ tự sau:{' '}
                <span className="font-bold">Tiếng Anh · Phiên âm · Từ loại · Tiếng Việt</span> (bỏ qua dòng tiêu đề).
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-7 pb-[22px] pt-3.5 border-t border-[var(--surface-500)]">
          <div
            onClick={!isUploading ? onClose : undefined}
            className={`px-[22px] py-2.5 rounded-[11px] border border-[var(--border-strong)] bg-white text-[var(--text-secondary)] font-[family-name:var(--font-heading)] font-semibold text-[13px] transition-colors ${isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-[var(--surface-500)]'}`}
          >
            Hủy
          </div>
          <div
            onClick={!isUploading ? handleCreate : undefined}
            className={`px-7 py-2.5 rounded-[11px] font-[family-name:var(--font-heading)] font-bold text-[13px] transition-colors ${!topicName.trim() || parsedWords.length === 0 || isUploading
              ? 'bg-[var(--border-strong)] text-[var(--text-secondary)] cursor-not-allowed opacity-60'
              : 'bg-[var(--brand-500)] text-white cursor-pointer hover:bg-[var(--brand-600)]'}`}
          >
            {isUploading ? 'Đang tạo...' : 'Tạo'}
          </div>
        </div>
      </div>
    </div>
  );
}
