import { useState, useRef } from 'react';

interface AssistantUploadMaterialPopupProps {
  onClose: () => void;
}

export default function AssistantUploadMaterialPopup({ onClose }: AssistantUploadMaterialPopupProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [docType, setDocType] = useState('Lý thuyết');
  const [fileType, setFileType] = useState('PDF');
  const [access, setAccess] = useState('public');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const labelClass =
    'block font-[family-name:var(--font-heading)] font-bold text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1.5';

  const inputClass =
    'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] outline-none box-border bg-transparent focus:border-[var(--brand-400)] transition-colors';

  const selectClass =
    'w-full px-4 py-2.5 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-default)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-primary)] outline-none box-border bg-[var(--surface-card)] focus:border-[var(--brand-400)] transition-colors cursor-pointer';

  return (
    <div className="fixed inset-0 bg-black/45 z-[1000] flex items-center justify-center p-6">
      <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] py-7 px-7 w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-[0_8px_40px_rgba(0,0,0,0.18)]">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-100)] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[var(--brand-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="font-[family-name:var(--font-heading)] font-extrabold text-[length:var(--text-body-lg)] text-[var(--text-primary)] leading-tight">
                Tải lên tài liệu
              </div>
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] mt-0.5">
                Thêm tài liệu vào thư viện học tập
              </div>
            </div>
          </div>
          <div
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] bg-transparent border-none cursor-pointer text-xl transition-colors flex-shrink-0"
          >
            ×
          </div>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            'border-2 border-dashed rounded-[var(--radius-md)] p-7 text-center mb-6 transition-all duration-200 cursor-pointer select-none',
            isDragOver
              ? 'border-[var(--brand-400)] bg-[var(--brand-50)]'
              : 'border-[var(--border-strong)] bg-[var(--surface-muted)] hover:border-[var(--brand-400)] hover:bg-[var(--brand-50)]',
          ].join(' ')}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.pptx,.ppt"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-12 h-12 rounded-xl bg-[var(--brand-100)] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-[var(--brand-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          {selectedFile ? (
            <div>
              <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] text-[var(--brand-600)] mb-1">
                {selectedFile.name}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          ) : (
            <>
              <div className="font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] text-[var(--text-primary)] mb-1">
                Kéo thả tệp vào đây
              </div>
              <div className="font-[family-name:var(--font-body)] text-[length:var(--text-body-sm)] text-[var(--text-secondary)] mb-3">
                hoặc chọn từ thiết bị của bạn
              </div>
              <button
                type="button"
                className="px-5 py-2 rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border-strong)] bg-[var(--surface-card)] font-[family-name:var(--font-heading)] font-semibold text-[length:var(--text-body-sm)] text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Chọn tệp
              </button>
              <div className="text-xs text-[var(--text-tertiary,var(--text-secondary))] mt-3">
                PDF, DOCX, PPTX · tối đa 50MB
              </div>
            </>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Tiêu đề */}
          <div>
            <label className={labelClass}>Tiêu đề tài liệu</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề tài liệu..."
              className={inputClass}
            />
          </div>

          {/* Loại tài liệu + Loại file — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Loại tài liệu</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className={selectClass}
              >
                <option value="Lý thuyết">Lý thuyết</option>
                <option value="Đề thi">Đề thi</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Loại file</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className={selectClass}
              >
                <option value="PDF">PDF</option>
                <option value="Word">Word</option>
              </select>
            </div>
          </div>

          {/* Môn học */}
          <div>
            <label className={labelClass}>Môn học</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ví dụ: Toán, Vật lý..."
              className={inputClass}
            />
          </div>

          {/* Quyền truy cập */}
          <div>
            <label className={labelClass}>Quyền truy cập</label>
            <select
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              className={selectClass}
            >
              <option value="public">🌐 Public — Tất cả học viên</option>
              <option value="vip">⭐ VIP — Chỉ học viên VIP</option>
            </select>
          </div>

          {/* Link youtube */}
          <div className="mb-2">
            <label className={labelClass}>Link YouTube (không bắt buộc)</label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-6">
          <div
            onClick={onClose}
            className="flex-1 p-3 flex items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--text-primary)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--surface-muted)] transition-colors"
          >
            Hủy
          </div>
          <div
            onClick={onClose}
            className="flex-[2] p-3 flex items-center justify-center rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] text-[var(--text-inverse)] font-[family-name:var(--font-heading)] font-bold text-[length:var(--text-body-sm)] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
          >
            Upload tài liệu
          </div>
        </div>
      </div>
    </div>
  );
}
